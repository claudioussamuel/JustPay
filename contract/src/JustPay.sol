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
 * @title OrderBookExchange
 * @author Opoku Claudious Samuel Mensah
 *
 * @dev OrderBookExchange is a contract for a decentralized exchange
 *  that allows users to exchange stable coins for fiat currency.
 */

contract JustPay is ReentrancyGuard {
    ///////////////////
    // Errors
    ///////////////////
    error JustPay__NeedsMoreThanZero();
    error JustPay__TokenNotAllowed(address token);
    error JustPay__TransferFailed();
    error JustPay__NoSuchRequest();
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
        string stableCoinName;
    }

    struct SendReceive {
        string action;
        uint256 amount;
        string message;
        address otherPartyAddress;
        string otherPartyName;
        string stableCoinName;
    }

    struct UserName {
        string name;
        bool hasName;
    }

    ///////////////////
    // State Variables
    ///////////////////

    address public s_owner;
    /// @dev Mapping of  address to userName Struct
    mapping(address => UserName) private s_names;
    /// @dev Mapping of  address to request array
    mapping(address => Request[]) private s_requests;
    /// @dev Mapping of address to history
    mapping(address => SendReceive[]) private s_history;

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

    // modifier isAllowedToken(address token) {
    //     if (s_priceFeeds[token] == address(0)) {
    //         revert JustPay__TokenNotAllowed(token);
    //     }
    //     _;
    // }

    constructor() {
        s_owner = msg.sender;
    }

    //Add a name to wallet address

    function addName(string memory _name) public {
        UserName storage newUserName = s_names[msg.sender];
        newUserName.name = _name;
        newUserName.hasName = true;
    }

    //Create a Request

    function createRequest(
        address user,
        uint256 _amount,
        string memory _message,
        address _stableCoin,
        string memory _tokenName
    ) public {
        Request memory newRequest;
        newRequest.requestor = msg.sender;
        newRequest.amount = _amount;
        newRequest.message = _message;
        newRequest.stableCoin = _stableCoin;
        newRequest.stableCoinName = _tokenName;

        if (s_names[msg.sender].hasName) {
            newRequest.name = s_names[msg.sender].name;
        }
        s_requests[user].push(newRequest);
    }

    //  function transferERC20(IERC20 token, address to, uint256 amount) public {
    //     require(msg.sender == owner, "Only owner can withdraw funds");
    //     uint256 erc20balance = token.balanceOf(address(this));
    //     require(amount <= erc20balance, "balance is low");
    //     token.transfer(to, amount);
    //     emit TransferSent(msg.sender, to, amount);
    // }

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
        // require(
        //     0 < ,
        //     "Cant send less than zero token"
        // );
        Request[] storage myRequests = s_requests[msg.sender];
        Request storage payableRequest = myRequests[_request];

        IERC20(payableRequest.stableCoin).safeTransferFrom(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount
        );
        //require(msg.value == (toPay), "Pay Correct Amount");

        // payable(payableRequest.requestor).transfer(msg.value);

        addHistory(
            msg.sender,
            payableRequest.requestor,
            payableRequest.amount,
            payableRequest.message,
            payableRequest.stableCoinName
        );

        myRequests[_request] = myRequests[myRequests.length - 1];
        myRequests.pop();
    }

    function addHistory(
        address sender,
        address receiver,
        uint256 _amount,
        string memory _message,
        string memory _stableCoinName
    ) private {
        SendReceive memory newSend;
        newSend.action = "Send";
        newSend.amount = _amount;
        newSend.message = _message;
        newSend.otherPartyAddress = receiver;
        newSend.stableCoinName = _stableCoinName;
        if (s_names[receiver].hasName) {
            newSend.otherPartyName = s_names[receiver].name;
        }
        s_history[sender].push(newSend);

        SendReceive memory newReceive;
        newReceive.action = "Receive";
        newReceive.amount = _amount;
        newReceive.message = _message;
        newReceive.otherPartyAddress = sender;
        newReceive.stableCoinName = _stableCoinName;
        if (s_names[sender].hasName) {
            newReceive.otherPartyName = s_names[sender].name;
        }
        s_history[receiver].push(newReceive);
    }

    //Get all requests sent to a User

    function getMyRequests(
        address _user
    )
        public
        view
        returns (
            address[] memory,
            uint256[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory addrs = new address[](s_requests[_user].length);
        uint256[] memory amnt = new uint256[](s_requests[_user].length);
        string[] memory msge = new string[](s_requests[_user].length);
        string[] memory nme = new string[](s_requests[_user].length);

        for (uint i = 0; i < s_requests[_user].length; i++) {
            Request storage myRequests = s_requests[_user][i];
            addrs[i] = myRequests.requestor;
            amnt[i] = myRequests.amount;
            msge[i] = myRequests.message;
            nme[i] = myRequests.name;
        }

        return (addrs, amnt, msge, nme);
    }

    //Get all historic transactions user has been apart of

    function getMyHistory(
        address _user
    ) public view returns (SendReceive[] memory) {
        return s_history[_user];
    }

    function getMyName(address _user) public view returns (UserName memory) {
        return s_names[_user];
    }
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
