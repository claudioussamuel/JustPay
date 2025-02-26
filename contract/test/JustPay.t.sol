// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/JustPay.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Mock ERC20 token for testing
contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000000 * 10 ** 18); // Mint 1,000,000 tokens to deployer
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}

contract JustPayTest is Test {
    JustPay public justPay;
    MockERC20 public mockStableCoin;

    address public alice = address(0x1);
    address public bob = address(0x2);
    address public charlie = address(0x3);

    event TransferSent(
        address indexed from,
        address indexed to,
        uint256 amount,
        address indexed token
    );

    function setUp() public {
        // Deploy contracts
        justPay = new JustPay();
        mockStableCoin = new MockERC20("Mock USDC", "mUSDC");

        // Fund test accounts
        vm.startPrank(address(this));
        mockStableCoin.transfer(alice, 10000 * 10 ** 18);
        mockStableCoin.transfer(bob, 10000 * 10 ** 18);
        mockStableCoin.transfer(charlie, 10000 * 10 ** 18);
        vm.stopPrank();
    }

    function testAddName() public {
        // Setup
        vm.startPrank(alice);

        // Test adding user info
        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        // Verify user info was added correctly
        JustPay.UserInfo memory userInfo = justPay.getMyName(alice);

        assertEq(userInfo.firstName, "Alice");
        assertEq(userInfo.lastName, "Johnson");
        assertEq(userInfo.gender, "Female");
        assertEq(userInfo.dateOfBirth, "1990-01-01");
        assertEq(userInfo.imageUrl, "https://example.com/alice.jpg");
        assertEq(userInfo.xHandle, "@alicejohnson");
        assertEq(userInfo.facebookHandle, "alicejohnson");
        assertEq(userInfo.igHandle, "alice_j");
        assertEq(userInfo.location, "New York");
        assertEq(userInfo.email, "alice@example.com");
        assertEq(userInfo.phone, "+1234567890");
        assertEq(userInfo.userAddress, alice);
        assertTrue(userInfo.hasName);

        vm.stopPrank();
    }

    function testAddFriend() public {
        // Setup
        vm.startPrank(alice);

        // Test adding a friend
        justPay.addFriends(
            "Bob",
            "Smith",
            "Male",
            "1992-05-15",
            "https://example.com/bob.jpg",
            "@bobsmith",
            "bobsmith",
            "bob_s",
            "Los Angeles",
            "bob@example.com",
            "+1987654321",
            bob
        );

        // Verify friend was added
        JustPay.UserInfo[] memory friends = justPay.getAllMyFriends(alice);

        assertEq(friends.length, 1);
        assertEq(friends[0].firstName, "Bob");
        assertEq(friends[0].lastName, "Smith");
        assertEq(friends[0].userAddress, bob);

        vm.stopPrank();
    }

    function testRemoveFriend() public {
        // Setup - add a friend first
        vm.startPrank(alice);

        justPay.addFriends(
            "Bob",
            "Smith",
            "Male",
            "1992-05-15",
            "https://example.com/bob.jpg",
            "@bobsmith",
            "bobsmith",
            "bob_s",
            "Los Angeles",
            "bob@example.com",
            "+1987654321",
            bob
        );

        // Verify friend was added
        JustPay.UserInfo[] memory friendsBefore = justPay.getAllMyFriends(
            alice
        );
        assertEq(friendsBefore.length, 1);

        // Test removing friend
        justPay.removeFriend(0);

        // Verify friend was removed
        JustPay.UserInfo[] memory friendsAfter = justPay.getAllMyFriends(alice);
        assertEq(friendsAfter.length, 0);

        vm.stopPrank();
    }

    function testCreateRequest() public {
        // Setup - add user info first
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        // Test creating a request
        uint256 requestAmount = 100 * 10 ** 18;
        justPay.createRequest(
            bob,
            requestAmount,
            "Please pay me back for lunch",
            address(mockStableCoin)
        );

        // Verify request was created
        vm.stopPrank();

        vm.startPrank(bob);
        JustPay.Request[] memory requests = justPay.getMyRequests(bob);

        assertEq(requests.length, 1);
        assertEq(requests[0].requestor, alice);
        assertEq(requests[0].amount, requestAmount);
        assertEq(requests[0].message, "Please pay me back for lunch");
        assertEq(requests[0].stableCoin, address(mockStableCoin));
        assertEq(requests[0].name, "Alice");

        vm.stopPrank();
    }

    function testPayRequest() public {
        // Setup - create request first
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        uint256 requestAmount = 100 * 10 ** 18;
        justPay.createRequest(
            bob,
            requestAmount,
            "Please pay me back for lunch",
            address(mockStableCoin)
        );

        vm.stopPrank();

        // Test paying request
        vm.startPrank(bob);

        // Need to approve the payment first
        mockStableCoin.approve(address(justPay), requestAmount);

        // Record balances before
        uint256 aliceBalanceBefore = mockStableCoin.balanceOf(alice);
        uint256 bobBalanceBefore = mockStableCoin.balanceOf(bob);

        // Pay the request
        justPay.payRequest(0);

        // Verify the request was paid and removed
        JustPay.Request[] memory requests = justPay.getMyRequests(bob);
        assertEq(requests.length, 0);

        // Verify tokens were transferred
        uint256 aliceBalanceAfter = mockStableCoin.balanceOf(alice);
        uint256 bobBalanceAfter = mockStableCoin.balanceOf(bob);

        assertEq(aliceBalanceAfter - aliceBalanceBefore, requestAmount);
        assertEq(bobBalanceBefore - bobBalanceAfter, requestAmount);

        // Verify transaction history
        JustPay.SendReceive[] memory aliceHistory = justPay.getMyHistory(alice);
        JustPay.SendReceive[] memory bobHistory = justPay.getMyHistory(bob);

        assertEq(aliceHistory.length, 1);
        assertEq(aliceHistory[0].action, "Receive");
        assertEq(aliceHistory[0].amount, requestAmount);

        assertEq(bobHistory.length, 1);
        assertEq(bobHistory[0].action, "Send");
        assertEq(bobHistory[0].amount, requestAmount);

        vm.stopPrank();
    }

    function testRejectRequest() public {
        // Setup - create request first
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        uint256 requestAmount = 100 * 10 ** 18;
        justPay.createRequest(
            bob,
            requestAmount,
            "Please pay me back for lunch",
            address(mockStableCoin)
        );

        vm.stopPrank();

        // Test rejecting request
        vm.startPrank(bob);

        // Verify request exists
        JustPay.Request[] memory requestsBefore = justPay.getMyRequests(bob);
        assertEq(requestsBefore.length, 1);

        // Reject the request
        justPay.rejectRequest(0);

        // Verify the request was removed
        JustPay.Request[] memory requestsAfter = justPay.getMyRequests(bob);
        assertEq(requestsAfter.length, 0);

        // Verify no transaction history was created
        JustPay.SendReceive[] memory aliceHistory = justPay.getMyHistory(alice);
        JustPay.SendReceive[] memory bobHistory = justPay.getMyHistory(bob);

        assertEq(aliceHistory.length, 0);
        assertEq(bobHistory.length, 0);

        vm.stopPrank();
    }

    function testSendToken() public {
        // Setup
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        // Bob also sets up profile so we can test name resolution in history
        vm.stopPrank();
        vm.startPrank(bob);

        justPay.addName(
            "Bob",
            "Smith",
            "Male",
            "1992-05-15",
            "https://example.com/bob.jpg",
            "@bobsmith",
            "bobsmith",
            "bob_s",
            "Los Angeles",
            "bob@example.com",
            "+1987654321"
        );

        vm.stopPrank();
        vm.startPrank(alice);

        // Test sending tokens
        uint256 sendAmount = 50 * 10 ** 18;
        mockStableCoin.approve(address(justPay), sendAmount);

        // Record balances before
        uint256 aliceBalanceBefore = mockStableCoin.balanceOf(alice);
        uint256 bobBalanceBefore = mockStableCoin.balanceOf(bob);

        // Expect the TransferSent event
        vm.expectEmit(true, true, true, true);
        emit TransferSent(alice, bob, sendAmount, address(mockStableCoin));

        // Send tokens
        justPay.sendToken(
            bob,
            IERC20(address(mockStableCoin)),
            sendAmount,
            "Here's some money"
        );

        // Verify tokens were transferred
        uint256 aliceBalanceAfter = mockStableCoin.balanceOf(alice);
        uint256 bobBalanceAfter = mockStableCoin.balanceOf(bob);

        assertEq(aliceBalanceBefore - aliceBalanceAfter, sendAmount);
        assertEq(bobBalanceAfter - bobBalanceBefore, sendAmount);

        // Verify transaction history
        JustPay.SendReceive[] memory aliceHistory = justPay.getMyHistory(alice);
        JustPay.SendReceive[] memory bobHistory = justPay.getMyHistory(bob);

        assertEq(aliceHistory.length, 1);
        assertEq(aliceHistory[0].action, "Send");
        assertEq(aliceHistory[0].amount, sendAmount);
        assertEq(aliceHistory[0].message, "Here's some money");
        assertEq(aliceHistory[0].otherPartyAddress, bob);
        assertEq(aliceHistory[0].otherPartyName, "Bob Smith");

        assertEq(bobHistory.length, 1);
        assertEq(bobHistory[0].action, "Receive");
        assertEq(bobHistory[0].amount, sendAmount);
        assertEq(bobHistory[0].message, "Here's some money");
        assertEq(bobHistory[0].otherPartyAddress, alice);
        assertEq(bobHistory[0].otherPartyName, "Alice Johnson");

        vm.stopPrank();
    }

    function testGetAllUsers() public {
        // Setup - add multiple users
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        vm.stopPrank();
        vm.startPrank(bob);

        justPay.addName(
            "Bob",
            "Smith",
            "Male",
            "1992-05-15",
            "https://example.com/bob.jpg",
            "@bobsmith",
            "bobsmith",
            "bob_s",
            "Los Angeles",
            "bob@example.com",
            "+1987654321"
        );

        vm.stopPrank();

        // Test getting all users
        JustPay.UserInfo[] memory allUsers = justPay.getAllUsers();

        assertEq(allUsers.length, 2);
        assertEq(allUsers[0].firstName, "Alice");
        assertEq(allUsers[0].userAddress, alice);
        assertEq(allUsers[1].firstName, "Bob");
        assertEq(allUsers[1].userAddress, bob);
    }

    function testGetERC20Balance() public {
        // Test getting ERC20 balance
        uint256 aliceBalance = justPay.getERC20Balance(
            IERC20(address(mockStableCoin)),
            alice
        );
        assertEq(aliceBalance, 10000 * 10 ** 18);
    }

    function testFailPayRequestWithZeroAmount() public {
        // Setup - create request with zero amount (this will fail)
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        justPay.createRequest(
            bob,
            0, // Zero amount
            "Invalid request",
            address(mockStableCoin)
        );

        vm.stopPrank();

        // This should fail due to the moreThanZero modifier
        vm.startPrank(bob);
        justPay.payRequest(0);
        vm.stopPrank();
    }

    function testFailPayRequestInsufficientAllowance() public {
        // Setup - create valid request
        vm.startPrank(alice);

        justPay.addName(
            "Alice",
            "Johnson",
            "Female",
            "1990-01-01",
            "https://example.com/alice.jpg",
            "@alicejohnson",
            "alicejohnson",
            "alice_j",
            "New York",
            "alice@example.com",
            "+1234567890"
        );

        uint256 requestAmount = 100 * 10 ** 18;
        justPay.createRequest(
            bob,
            requestAmount,
            "Please pay me back for lunch",
            address(mockStableCoin)
        );

        vm.stopPrank();

        // Try to pay without approval (should fail)
        vm.startPrank(bob);

        // No mockStableCoin.approve() call!

        justPay.payRequest(0);
        vm.stopPrank();
    }
}
