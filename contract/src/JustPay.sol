// Layout of Contract:
// version
// imports
// errors
// interfaces, libraries, contracts
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title Just Pay
 * @dev Just Pay is a contract for a decentralized p2p that allows users to exchange stable coins.
 *
 * @notice This contract allows users to add personal information, create and pay requests, manage friends, and send tokens.
 *
 * @dev The contract uses OpenZeppelin's ReentrancyGuard and SafeERC20 libraries to prevent reentrancy attacks and ensure safe token transfers.
 *
 * @dev The contract includes the following functionalities:
 * - Adding user information
 * - Creating payment requests
 * - Adding and removing friends
 * - Paying and rejecting requests
 * - Sending tokens
 * - Viewing transaction history, requests, friends, and user information
 * - Checking ERC20 token balance
 *
 * @dev The contract uses several custom errors for better error handling.
 *
 * @dev The contract emits a TransferSent event when tokens are sent.
 *
 * @dev The contract includes the following modifiers:
 * - moreThanZero: Ensures the amount is greater than zero.
 * - noSuchRequest: Ensures the request exists.
 *
 * @dev The contract uses the following state variables:
 * - s_owner: The owner of the contract.
 * - s_names: Mapping of address to UserInfo struct.
 * - s_requests: Mapping of address to request array.
 * - s_history: Mapping of address to SendReceive array.
 * - s_myFriends: Mapping of address to UserInfo array.
 * - s_allUsers: Array of all public users.
 *
 * @dev The contract includes the following structs:
 * - Request: Struct for payment requests.
 * - SendReceive: Struct for transaction history.
 * - UserInfo: Struct for user information.
 *
 * @dev The contract includes the following functions:
 * - constructor: Initializes the contract owner.
 * - addName: Adds user information.
 * - createRequest: Creates a payment request.
 * - addFriends: Adds a friend.
 * - removeFriend: Removes a friend.
 * - payRequest: Pays a payment request.
 * - rejectRequest: Rejects a payment request.
 * - sendToken: Sends ERC20 tokens.
 * - addHistory: Adds transaction history (internal function).
 * - getMyHistory: Returns the transaction history of a user.
 * - getMyRequests: Returns the payment requests of a user.
 * - getAllMyFriends: Returns the friends of a user.
 * - getMyName: Returns the user information of a user.
 * - getERC20Balance: Returns the ERC20 token balance of an account.
 */

contract JustPay is ReentrancyGuard {
    ///////////////////
    // Errors
    ///////////////////
    error JustPay__NeedsMoreThanZero();
    error JustPay__TokenNotAllowed(address token);
    error JustPay__TransferFailed();
    error JustPay__NoSuchRequest();
    error JustPay__NotOwner();
    error JustPay__InsufficientBalance();
    error JustPay__InsufficientAllowance();
    error JustPay__ApproveFailed();
    ///////////////////
    // Types
    ///////////////////

    using SafeERC20 for IERC20;

    //Create Struct and Mappping for request, transaction & name
    struct Request {
        address requestor;
        uint256 amount;
        string message;
        string name;
        address stableCoin;
        uint256 time;
    }

    struct SendReceive {
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
        uint256 time;
    }

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

    ///////////////////
    // State Variables
    ///////////////////

    address public s_owner;
    /// @dev Mapping of  address to UserInfo Struct
    mapping(address => UserInfo) private s_names;
    /// @dev Mapping of  address to request array
    mapping(address => Request[]) private s_requests;
    /// @dev Mapping of address to history
    mapping(address => SendReceive[]) private s_history;
    /// @dev Mapping of address to Friends
    mapping(address => UserInfo[]) private s_myFriends;
    /// @dev All public users
    UserInfo[] public s_allUsers;

    ///////////////////
    // Events
    ///////////////////
    event TransferSent(
        address indexed from,
        address indexed to,
        uint256 amount,
        address indexed token
    );

    ///////////////////
    // Modifiers
    ///////////////////
    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert JustPay__NeedsMoreThanZero();
        }
        _;
    }

    modifier noSuchRequest(uint256 _request) {
        if (_request > s_requests[msg.sender].length) {
            revert JustPay__NoSuchRequest();
        }
        _;
    }

    constructor() {
        s_owner = msg.sender;
    }

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

        // Create a new instance to push into the array
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

    //Create a Request

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

        if (s_names[msg.sender].hasName) {
            newRequest.name = s_names[msg.sender].firstName;
        }
        s_requests[user].push(newRequest);
    }

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

    function removeFriend(uint256 _request) public payable {
        UserInfo[] storage myFriends = s_myFriends[msg.sender];
        myFriends[_request] = myFriends[myFriends.length - 1];
        myFriends.pop();
    }

    //Pay a Request

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

        IERC20(payableRequest.stableCoin).safeTransferFrom(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount
        );

        addHistory(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount,
            payableRequest.message
        );

        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

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
        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

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

        (token).safeTransferFrom(msg.sender, to, amount);

        // Emit event last
        emit TransferSent(msg.sender, to, amount, address(token));
    }

    function addHistory(
        address sender,
        address receiver,
        uint256 _amount,
        string memory _message
    ) private {
        SendReceive memory newSend;
        newSend.action = "Send";
        newSend.amount = _amount;
        newSend.message = _message;
        newSend.otherPartyAddress = receiver;
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
        s_history[sender].push(newSend);

        SendReceive memory newReceive;
        newReceive.action = "Receive";
        newReceive.amount = _amount;
        newReceive.message = _message;
        newReceive.otherPartyAddress = sender;
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
        s_history[receiver].push(newReceive);
    }

    //Get all historic transactions user has been apart of

    function getMyHistory(
        address _user
    ) public view returns (SendReceive[] memory) {
        return s_history[_user];
    }

    function getMyRequests(
        address _user
    ) public view returns (Request[] memory) {
        return s_requests[_user];
    }

    function getAllMyFriends(
        address _user
    ) public view returns (UserInfo[] memory) {
        return s_myFriends[_user];
    }

    function getMyName(address _user) public view returns (UserInfo memory) {
        return s_names[_user];
    }

    function getERC20Balance(
        IERC20 token,
        address account
    ) public view returns (uint256) {
        return (token).balanceOf(account);
    }
}
