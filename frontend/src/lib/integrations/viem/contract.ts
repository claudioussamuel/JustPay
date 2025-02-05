import { getContract } from "viem";
import { contractAbi, contractAddress } from "./abi";
import { client } from "./client";

export async function readContractData(userAddress: `0x${string}`): Promise<[string, boolean] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getMyName([userAddress]);

        console.log("Smart Contract Data:", data);

        if (typeof data === "object" && data !== null && "name" in data && "hasName" in data) {
            return [data.name, data.hasName] as [string, boolean];
        } else {
            console.error("Unexpected data format:", data);
            return null;
        }
    } catch (error) {
        console.error("Error reading contract:", error);
        return null;
    }
}
