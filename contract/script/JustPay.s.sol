// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {JustPay} from "../src/JustPay.sol";

contract DeployJustPay is Script {
    function deployJustPay() public returns (JustPay) {
        vm.startBroadcast();
        JustPay justPay = new JustPay();
        vm.stopBroadcast();

        return (justPay);
    }

    function run() external returns (JustPay) {
        return deployJustPay();
    }
}
