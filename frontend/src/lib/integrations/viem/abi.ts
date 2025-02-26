export const contractAbi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"JustPay__ApproveFailed","type":"error"},{"inputs":[],"name":"JustPay__InsufficientAllowance","type":"error"},{"inputs":[],"name":"JustPay__InsufficientBalance","type":"error"},{"inputs":[],"name":"JustPay__NeedsMoreThanZero","type":"error"},{"inputs":[],"name":"JustPay__NoSuchRequest","type":"error"},{"inputs":[],"name":"JustPay__NotOwner","type":"error"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"JustPay__TokenNotAllowed","type":"error"},{"inputs":[],"name":"JustPay__TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TransactionExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"executeAt","type":"uint256"}],"name":"TransactionScheduled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"address","name":"token","type":"address"}],"name":"TransferSent","type":"event"},{"inputs":[{"internalType":"string","name":"_firstName","type":"string"},{"internalType":"string","name":"_lastName","type":"string"},{"internalType":"string","name":"_gender","type":"string"},{"internalType":"string","name":"_dateOfBirth","type":"string"},{"internalType":"string","name":"_imageUrl","type":"string"},{"internalType":"string","name":"_xHandle","type":"string"},{"internalType":"string","name":"_facebookHandle","type":"string"},{"internalType":"string","name":"_igHandle","type":"string"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_phone","type":"string"},{"internalType":"address","name":"userAddress","type":"address"}],"name":"addFriends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_firstName","type":"string"},{"internalType":"string","name":"_lastName","type":"string"},{"internalType":"string","name":"_gender","type":"string"},{"internalType":"string","name":"_dateOfBirth","type":"string"},{"internalType":"string","name":"_imageUrl","type":"string"},{"internalType":"string","name":"_xHandle","type":"string"},{"internalType":"string","name":"_facebookHandle","type":"string"},{"internalType":"string","name":"_igHandle","type":"string"},{"internalType":"string","name":"_location","type":"string"},{"internalType":"string","name":"_email","type":"string"},{"internalType":"string","name":"_phone","type":"string"}],"name":"addName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"address","name":"_stableCoin","type":"address"}],"name":"createRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"executeTransactions","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getAllMyFriends","outputs":[{"components":[{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"string","name":"dateOfBirth","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"string","name":"xHandle","type":"string"},{"internalType":"string","name":"facebookHandle","type":"string"},{"internalType":"string","name":"igHandle","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bool","name":"hasName","type":"bool"}],"internalType":"struct JustPay.UserInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllUsers","outputs":[{"components":[{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"string","name":"dateOfBirth","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"string","name":"xHandle","type":"string"},{"internalType":"string","name":"facebookHandle","type":"string"},{"internalType":"string","name":"igHandle","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bool","name":"hasName","type":"bool"}],"internalType":"struct JustPay.UserInfo[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"address","name":"account","type":"address"}],"name":"getERC20Balance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getMyHistory","outputs":[{"components":[{"internalType":"string","name":"action","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"otherPartyAddress","type":"address"},{"internalType":"string","name":"otherPartyName","type":"string"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"struct JustPay.SendReceive[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_friend","type":"address"}],"name":"getMyHistoryWithAFriend","outputs":[{"components":[{"internalType":"string","name":"action","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"address","name":"otherPartyAddress","type":"address"},{"internalType":"string","name":"otherPartyName","type":"string"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"struct JustPay.SendReceive[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getMyName","outputs":[{"components":[{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"string","name":"dateOfBirth","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"string","name":"xHandle","type":"string"},{"internalType":"string","name":"facebookHandle","type":"string"},{"internalType":"string","name":"igHandle","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bool","name":"hasName","type":"bool"}],"internalType":"struct JustPay.UserInfo","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getMyRequests","outputs":[{"components":[{"internalType":"address","name":"requestor","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"address","name":"stableCoin","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"}],"internalType":"struct JustPay.Request[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_request","type":"uint256"}],"name":"payRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_request","type":"uint256"}],"name":"rejectRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"removeFriend","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"s_allUsers","outputs":[{"internalType":"string","name":"firstName","type":"string"},{"internalType":"string","name":"lastName","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"string","name":"dateOfBirth","type":"string"},{"internalType":"string","name":"imageUrl","type":"string"},{"internalType":"string","name":"xHandle","type":"string"},{"internalType":"string","name":"facebookHandle","type":"string"},{"internalType":"string","name":"igHandle","type":"string"},{"internalType":"string","name":"location","type":"string"},{"internalType":"string","name":"email","type":"string"},{"internalType":"string","name":"phone","type":"string"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"bool","name":"hasName","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"s_owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"string","name":"_message","type":"string"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"uint256","name":"_executeAt","type":"uint256"},{"internalType":"address","name":"_stableCoin","type":"address"}],"name":"scheduleTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"contract IERC20","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"name":"sendToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
export const contractAddress='0x6E3A3dB9956aa1ab5597d589c73760794c2fd5BE';
export const stableCoinAddress='0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A';
export const stableCoinAbi=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];