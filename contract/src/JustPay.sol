// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title JustPay
 * @author Opoku Claudious Samuel Mensah
 * @notice A decentralized P2P contract that enables users to exchange stable coins
 * @dev Implements ERC20 token transfers with comprehensive user management
 */

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract JustPay is ReentrancyGuard {
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                                 ERRORS
    //////////////////////////////////////////////////////////////*/

    error JustPay__NeedsMoreThanZero();
    error JustPay__TokenNotAllowed(address token);
    error JustPay__TransferFailed();
    error JustPay__NoSuchRequest();
    error JustPay__NotOwner();
    error JustPay__InsufficientBalance();
    error JustPay__InsufficientAllowance();
    error JustPay__ApproveFailed();

    /*//////////////////////////////////////////////////////////////
                                 TYPES
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Represents a payment request between users
     * @param requestor Address of the user creating the request
     * @param amount Amount of tokens requested
     * @param message Description or reason for the request
     * @param name Name of the requestor
     * @param stableCoin Address of the ERC20 token
     * @param time Timestamp when request was created
     */
    struct Request {
        address requestor;
        uint256 amount;
        string message;
        string name;
        address stableCoin;
        uint256 time;
    }

    /**
     * @dev Records transaction history for send/receive events
     * @param action Type of transaction ("Send" or "Receive")
     * @param amount Amount of tokens transferred
     * @param message Description or reason for the transaction
     * @param otherPartyAddress Address of the counter-party
     * @param otherPartyName Name of the counter-party
     * @param time Timestamp when transaction occurred
     */
    struct SendReceive {
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
        uint256 time;
    }

    /**
     * @dev Stores user profile information
     * @param firstName User's first name
     * @param lastName User's last name
     * @param gender User's gender
     * @param dateOfBirth User's date of birth
     * @param imageUrl URL to user's profile image
     * @param xHandle User's X (Twitter) handle
     * @param facebookHandle User's Facebook handle
     * @param igHandle User's Instagram handle
     * @param location User's location
     * @param email User's email address
     * @param phone User's phone number
     * @param userAddress User's blockchain address
     * @param hasName Flag indicating if user has set their information
     */
    struct UserInfo {
        string firstName;
        string lastName;
        string gender;
        string dateOfBirth;
        string imageUrl;
        string xHandle;
        string facebookHandle;
        string igHandle;
        string location;
        string email;
        string phone;
        address userAddress;
        bool hasName;
    }

    /**
     * @dev Defines a scheduled transaction
     * @param sender Address sending the tokens
     * @param recipient Address receiving the tokens
     * @param amount Amount of tokens to send
     * @param message Description or reason for the transfer
     * @param executeAt Timestamp when transaction should execute
     * @param stableCoin Address of the ERC20 token
     * @param executed Flag indicating if transaction has been executed
     */
    struct ScheduledTx {
        address sender;
        address recipient;
        uint256 amount;
        string message;
        uint256 executeAt;
        address stableCoin;
        bool executed;
    }

    /*//////////////////////////////////////////////////////////////
                             STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    /// @notice Contract owner address
    address public s_owner;

    /// @dev Maps user address to their profile information
    mapping(address => UserInfo) private s_names;

    /// @dev Maps user address to their pending payment requests
    mapping(address => Request[]) private s_requests;

    /// @dev Maps user address to their transaction history
    mapping(address => SendReceive[]) private s_history;

    /// @dev Maps user address to their transaction history with specific friends
    mapping(address => mapping(address => SendReceive[]))
        private s_historyWithAFriend;

    /// @dev Maps user address to their friends list
    mapping(address => UserInfo[]) private s_myFriends;

    /// @notice Array of all registered users
    UserInfo[] public s_allUsers;

    /// @dev Array of all scheduled transactions
    ScheduledTx[] private s_ScheduledTransactions;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Emitted when tokens are transferred between users
     * @param from Address sending the tokens
     * @param to Address receiving the tokens
     * @param amount Amount of tokens transferred
     * @param token Address of the ERC20 token
     */
    event TransferSent(
        address indexed from,
        address indexed to,
        uint256 amount,
        address indexed token
    );

    /**
     * @dev Emitted when a transaction is scheduled for future execution
     * @param recipient Address to receive the tokens
     * @param amount Amount of tokens to transfer
     * @param executeAt Timestamp when transaction will execute
     */
    event TransactionScheduled(
        address indexed recipient,
        uint256 amount,
        uint256 executeAt
    );

    /**
     * @dev Emitted when a scheduled transaction is executed
     * @param recipient Address receiving the tokens
     * @param amount Amount of tokens transferred
     */
    event TransactionExecuted(address indexed recipient, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                                MODIFIERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Ensures amount is greater than zero
     * @param amount Value to check
     */
    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert JustPay__NeedsMoreThanZero();
        }
        _;
    }

    /**
     * @dev Ensures the requested payment exists
     * @param _request Index of the request in user's requests array
     */
    modifier noSuchRequest(uint256 _request) {
        if (_request > s_requests[msg.sender].length) {
            revert JustPay__NoSuchRequest();
        }
        _;
    }

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Initializes the contract
     * @dev Sets the contract deployer as owner
     */
    constructor() {
        s_owner = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                           EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Sends ERC20 tokens from one user to another
     * @param to The recipient address
     * @param token The ERC20 token contract address
     * @param amount The amount of tokens to send
     * @param message Optional message for the transaction
     */
    function sendToken(
        address to,
        IERC20 token,
        uint256 amount,
        string memory message
    ) external nonReentrant {
        // Record transaction first (state modification)
        addHistory(msg.sender, to, amount, message);

        // Transfer tokens using SafeERC20
        (token).safeTransferFrom(msg.sender, to, amount);

        // Emit event last
        emit TransferSent(msg.sender, to, amount, address(token));
    }

    /**
     * @notice Schedules a transaction to be executed at a future time
     * @param _sender Address sending the tokens
     * @param _recipient Address receiving the tokens
     * @param _message Description of the transaction
     * @param _amount Amount of tokens to transfer
     * @param _executeAt Timestamp when transaction should execute
     * @param _stableCoin Address of the ERC20 token
     */
    function scheduleTransaction(
        address _sender,
        address _recipient,
        string memory _message,
        uint256 _amount,
        uint256 _executeAt,
        address _stableCoin
    ) external payable {
        require(
            _executeAt > block.timestamp,
            "Execution time must be in the future"
        );
        require(msg.value == _amount, "Incorrect ETH sent");

        // Transfer tokens to contract until execution time
        IERC20(_stableCoin).safeTransferFrom(
            msg.sender,
            address(this),
            _amount
        );

        // Store transaction details
        s_ScheduledTransactions.push(
            ScheduledTx({
                sender: _sender,
                recipient: _recipient,
                amount: _amount,
                message: _message,
                executeAt: _executeAt,
                stableCoin: _stableCoin,
                executed: false
            })
        );

        emit TransactionScheduled(_recipient, _amount, _executeAt);
    }

    /**
     * @notice Executes all scheduled transactions that are due
     * @dev Iterates through pending transactions and executes if current time >= scheduled time
     */
    function executeTransactions() external {
        for (uint256 i = 0; i < s_ScheduledTransactions.length; i++) {
            ScheduledTx storage txn = s_ScheduledTransactions[i];
            if (!txn.executed && txn.executeAt <= block.timestamp) {
                txn.executed = true;

                // Transfer tokens to recipient
                IERC20(txn.stableCoin).safeTransfer(txn.recipient, txn.amount);

                // Remove transaction from array (swap and pop)
                s_ScheduledTransactions[i] = s_ScheduledTransactions[
                    s_ScheduledTransactions.length - 1
                ];
                s_ScheduledTransactions.pop();

                emit TransactionExecuted(txn.recipient, txn.amount);
            }
        }
    }

    /*//////////////////////////////////////////////////////////////
                            PUBLIC FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Registers or updates user profile information
     * @param _firstName User's first name
     * @param _lastName User's last name
     * @param _gender User's gender
     * @param _dateOfBirth User's date of birth
     * @param _imageUrl URL to user's profile image
     * @param _xHandle User's X (Twitter) handle
     * @param _facebookHandle User's Facebook handle
     * @param _igHandle User's Instagram handle
     * @param _location User's location
     * @param _email User's email address
     * @param _phone User's phone number
     */
    function addName(
        string memory _firstName,
        string memory _lastName,
        string memory _gender,
        string memory _dateOfBirth,
        string memory _imageUrl,
        string memory _xHandle,
        string memory _facebookHandle,
        string memory _igHandle,
        string memory _location,
        string memory _email,
        string memory _phone
    ) public {
        // Update existing user info in storage
        UserInfo storage newUserInfo = s_names[msg.sender];
        newUserInfo.firstName = _firstName;
        newUserInfo.lastName = _lastName;
        newUserInfo.gender = _gender;
        newUserInfo.dateOfBirth = _dateOfBirth;
        newUserInfo.imageUrl = _imageUrl;
        newUserInfo.xHandle = _xHandle;
        newUserInfo.facebookHandle = _facebookHandle;
        newUserInfo.igHandle = _igHandle;
        newUserInfo.email = _email;
        newUserInfo.phone = _phone;
        newUserInfo.userAddress = msg.sender;
        newUserInfo.location = _location;
        newUserInfo.hasName = true;

        // Create a memory copy for the all users array
        UserInfo memory newUser = UserInfo({
            firstName: newUserInfo.firstName,
            lastName: newUserInfo.lastName,
            gender: newUserInfo.gender,
            dateOfBirth: newUserInfo.dateOfBirth,
            imageUrl: newUserInfo.imageUrl,
            xHandle: newUserInfo.xHandle,
            facebookHandle: newUserInfo.facebookHandle,
            igHandle: newUserInfo.igHandle,
            location: newUserInfo.location,
            email: newUserInfo.email,
            phone: newUserInfo.phone,
            userAddress: msg.sender,
            hasName: newUserInfo.hasName
        });

        s_allUsers.push(newUser);
    }

    /**
     * @notice Creates a payment request
     * @param user Address of the user being requested to pay
     * @param _amount Amount of tokens requested
     * @param _message Description of the request
     * @param _stableCoin Address of the ERC20 token
     */
    function createRequest(
        address user,
        uint256 _amount,
        string memory _message,
        address _stableCoin
    ) public {
        Request memory newRequest;
        newRequest.requestor = msg.sender;
        newRequest.amount = _amount;
        newRequest.message = _message;
        newRequest.stableCoin = _stableCoin;
        newRequest.time = block.timestamp;

        // Add requestor's name if available
        if (s_names[msg.sender].hasName) {
            newRequest.name = s_names[msg.sender].firstName;
        }

        s_requests[user].push(newRequest);
    }

    /**
     * @notice Adds a friend to user's friends list
     * @param _firstName Friend's first name
     * @param _lastName Friend's last name
     * @param _gender Friend's gender
     * @param _dateOfBirth Friend's date of birth
     * @param _imageUrl URL to friend's profile image
     * @param _xHandle Friend's X (Twitter) handle
     * @param _facebookHandle Friend's Facebook handle
     * @param _igHandle Friend's Instagram handle
     * @param _location Friend's location
     * @param _email Friend's email address
     * @param _phone Friend's phone number
     * @param userAddress Friend's blockchain address
     */
    function addFriends(
        string memory _firstName,
        string memory _lastName,
        string memory _gender,
        string memory _dateOfBirth,
        string memory _imageUrl,
        string memory _xHandle,
        string memory _facebookHandle,
        string memory _igHandle,
        string memory _location,
        string memory _email,
        string memory _phone,
        address userAddress
    ) public {
        UserInfo memory newUserInfo;
        newUserInfo.firstName = _firstName;
        newUserInfo.lastName = _lastName;
        newUserInfo.gender = _gender;
        newUserInfo.dateOfBirth = _dateOfBirth;
        newUserInfo.imageUrl = _imageUrl;
        newUserInfo.xHandle = _xHandle;
        newUserInfo.facebookHandle = _facebookHandle;
        newUserInfo.igHandle = _igHandle;
        newUserInfo.email = _email;
        newUserInfo.phone = _phone;
        newUserInfo.userAddress = userAddress;
        newUserInfo.location = _location;
        newUserInfo.hasName = true;

        s_myFriends[msg.sender].push(newUserInfo);
    }

    /**
     * @notice Removes a friend from user's friends list
     * @param _id Index of the friend in user's friends array
     */
    function removeFriend(uint256 _id) public payable {
        UserInfo[] storage myFriends = s_myFriends[msg.sender];

        // Swap with the last element and pop (gas efficient removal)
        myFriends[_id] = myFriends[myFriends.length - 1];
        myFriends.pop();
    }

    /**
     * @notice Pays a pending payment request
     * @param _request Index of the request in user's requests array
     * @dev Uses nonReentrant for protection against reentrancy attacks
     */
    function payRequest(
        uint256 _request
    )
        public
        payable
        noSuchRequest(_request)
        nonReentrant
        moreThanZero(s_requests[msg.sender][_request].amount)
    {
        Request[] storage myRequests = s_requests[msg.sender];
        Request storage payableRequest = myRequests[_request];

        // Transfer tokens to requestor
        IERC20(payableRequest.stableCoin).safeTransferFrom(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount
        );

        // Record the transaction in history
        addHistory(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount,
            payableRequest.message
        );

        // Remove the request (swap with last element and pop)
        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    /**
     * @notice Rejects a payment request
     * @param _request Index of the request in user's requests array
     * @dev Removes the request without transferring any tokens
     */
    function rejectRequest(
        uint256 _request
    )
        public
        payable
        noSuchRequest(_request)
        nonReentrant
        moreThanZero(s_requests[msg.sender][_request].amount)
    {
        Request[] storage myRequests = s_requests[msg.sender];

        // Remove the request (swap with last element and pop)
        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    /*//////////////////////////////////////////////////////////////
                            VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Returns the transaction history of a user
     * @param _user Address of the user
     * @return Array of SendReceive structs representing transaction history
     */
    function getMyHistory(
        address _user
    ) public view returns (SendReceive[] memory) {
        return s_history[_user];
    }

    /**
     * @notice Returns the transaction history between a user and a specific friend
     * @param _user Address of the user
     * @param _friend Address of the friend
     * @return Array of SendReceive structs representing transaction history with friend
     */
    function getMyHistoryWithAFriend(
        address _user,
        address _friend
    ) public view returns (SendReceive[] memory) {
        return s_historyWithAFriend[_user][_friend];
    }

    /**
     * @notice Returns the pending payment requests of a user
     * @param _user Address of the user
     * @return Array of Request structs representing pending payment requests
     */
    function getMyRequests(
        address _user
    ) public view returns (Request[] memory) {
        return s_requests[_user];
    }

    /**
     * @notice Returns the friends list of a user
     * @param _user Address of the user
     * @return Array of UserInfo structs representing user's friends
     */
    function getAllMyFriends(
        address _user
    ) public view returns (UserInfo[] memory) {
        return s_myFriends[_user];
    }

    /**
     * @notice Returns all registered users
     * @return Array of UserInfo structs representing all users
     */
    function getAllUsers() public view returns (UserInfo[] memory) {
        return s_allUsers;
    }

    /**
     * @notice Returns the profile information of a user
     * @param _user Address of the user
     * @return UserInfo struct containing user's profile information
     */
    function getMyName(address _user) public view returns (UserInfo memory) {
        return s_names[_user];
    }

    /**
     * @notice Returns the balance of an ERC20 token for an account
     * @param token The ERC20 token contract
     * @param account The address to check balance for
     * @return uint256 The token balance
     */
    function getERC20Balance(
        IERC20 token,
        address account
    ) public view returns (uint256) {
        return (token).balanceOf(account);
    }

    /*//////////////////////////////////////////////////////////////
                           PRIVATE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Records a transaction in both parties' history
     * @param sender Address sending the tokens
     * @param receiver Address receiving the tokens
     * @param _amount Amount of tokens transferred
     * @param _message Description of the transaction
     */
    function addHistory(
        address sender,
        address receiver,
        uint256 _amount,
        string memory _message
    ) private {
        // Record "Send" transaction for sender
        SendReceive memory newSend;
        newSend.action = "Send";
        newSend.amount = _amount;
        newSend.message = _message;
        newSend.otherPartyAddress = receiver;

        // Include receiver's name if available
        if (s_names[receiver].hasName) {
            newSend.otherPartyName = string(
                abi.encodePacked(
                    s_names[receiver].firstName,
                    " ",
                    s_names[receiver].lastName
                )
            );
        }

        newSend.time = block.timestamp;

        // Add to sender's history
        s_history[sender].push(newSend);
        s_historyWithAFriend[sender][receiver].push(newSend);

        // Record "Receive" transaction for receiver
        SendReceive memory newReceive;
        newReceive.action = "Receive";
        newReceive.amount = _amount;
        newReceive.message = _message;
        newReceive.otherPartyAddress = sender;

        // Include sender's name if available
        if (s_names[sender].hasName) {
            newReceive.otherPartyName = string(
                abi.encodePacked(
                    s_names[sender].firstName,
                    " ",
                    s_names[sender].lastName
                )
            );
        }

        newReceive.time = block.timestamp;

        // Add to receiver's history
        s_history[receiver].push(newReceive);
        s_historyWithAFriend[receiver][sender].push(newReceive);
    }
}
