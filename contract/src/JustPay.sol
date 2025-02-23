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
 * @author Opoku Claudious Samuel Mensah
 *
 * @dev Just Pay is a contract for a decentralized p2p
 *  that allows users to exchange stable coins.
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
        string memory _igHandle
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
            newSend.otherPartyName = s_names[receiver].firstName;
        }
        newSend.time = block.timestamp;
        s_history[sender].push(newSend);

        SendReceive memory newReceive;
        newReceive.action = "Receive";
        newReceive.amount = _amount;
        newReceive.message = _message;
        newReceive.otherPartyAddress = sender;
        if (s_names[sender].hasName) {
            newReceive.otherPartyName = s_names[sender].firstName;
        }
        newReceive.time = block.timestamp;
        s_history[receiver].push(newReceive);
    }

    //Get all requests sent to a User

    // function getMyRequests(
    //     address _user
    // )
    //     public
    //     view
    //     returns (
    //         address[] memory,
    //         uint256[] memory,
    //         string[] memory,
    //         string[] memory
    //     )
    // {
    //     address[] memory addrs = new address[](s_requests[_user].length);
    //     uint256[] memory amnt = new uint256[](s_requests[_user].length);
    //     string[] memory msge = new string[](s_requests[_user].length);
    //     string[] memory nme = new string[](s_requests[_user].length);

    //     for (uint i = 0; i < s_requests[_user].length; i++) {
    //         Request storage myRequests = s_requests[_user][i];
    //         addrs[i] = myRequests.requestor;
    //         amnt[i] = myRequests.amount;
    //         msge[i] = myRequests.message;
    //         nme[i] = myRequests.name;
    //     }

    //     return (addrs, amnt, msge, nme);
    // }

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

    function getMyName(address _user) public view returns (UserInfo memory) {
        return s_names[_user];
    }

    function getERC20Balance(
        IERC20 token,
        address account
    ) public view returns (uint256) {
        return (token).balanceOf(account);
    }

    /**
     * @notice Sends ERC20 tokens from one user to another
     * @param to The recipient address
     * @param token The ERC20 token contract address
     * @param amount The amount of tokens to send
     * @param message Optional message for the transaction
     * @param tokenName The name of the token (for display purposes)
     */
}

// Order Creation (Function to lock your Stable coin (USDT,USDC))
//1. Lock the stable coin
// 2. Add Name
// 3. Add Rate
// 4. Add Order limit
// 5. Add Payment Method

// Order Matching (Function to match the order with the best price)
// 1. Select Add Order
// 2. Select the amount of stable coin to be exchanged

// Order Calculation (Function to calculate the order)
// Seller Confirms the order
// Buyer Confirms the order
// Sent the stable coin to the buyer
// Seller get on chain credibility

// Order Cancellation (Function to cancel the order)
// Seller Cancels the order
// Buyer Cancels the order

// Order Conflict (Function to resolve the conflict)
// Seller add proof of payment
// Buyer add proof of payment
// Admin resolve the conflict

// Withdrawal (Function to withdraw the stable coin)
// Seller has no conflict nor order
