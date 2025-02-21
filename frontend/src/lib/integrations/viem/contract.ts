"use client"

import { getContract } from "viem";
import { contractAbi, contractAddress, stableCoinAbi, stableCoinAddress } from "./abi";
import { client } from "./client";
import { useToast } from "@/hooks/use-toast";

interface SendReceive {
    action: string;
    amount: bigint;
    message: string;
    otherPartyAddress: string;
    otherPartyName: string;
    time:bigint;
}

interface Request {
    requestor:string;
    amount:bigint;
    message:string;
    name:string;
    stableCoin:string;
    time:bigint;
}

export async function readContractData(userAddress: `0x${string}`): Promise<[string, string, string, string, string, string, string, string, string, string, string, string, boolean] | null> {
    const {toast} = useToast();
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getMyName([userAddress]);

        console.log("Smart Contract Data:", data);

        if (typeof data === "object"
             && data !== null 
             && "firstName" in data 
             && "lastName" in data 
             && "gender" in data 
             && "dateOfBirth" in data 
             && "homeTown" in data 
             && "gmail" in data 
             && "telephone" in data 
             && "country" in data 
             && "imageUrl" in data 
             && "xHandle" in data 
             && "facebookHandle" in data 
             && "igHandle" in data 
             && "hasName" in data
            ) {
          
            return [data.firstName, data.lastName,data.gender,data.dateOfBirth,data.homeTown,data.gmail,data.telephone,data.country,data.imageUrl,data.xHandle,data.facebookHandle,data.igHandle,data.hasName] as [string, string,string,string,string,string,string,string,string,string,string,string,boolean];
        } else {
            toast({
                variant: 'destructive',
                title:'Unexpected data format',
                description: 'Unexpected data format sent !!!'
            })
            return null;
        }
    } catch (error) {
        toast({
            variant: 'destructive',
            title:'Error occured',
            description: 'Error reading contract !!!'
        })
        console.error("Error reading contract:", error);
        return null;
    }
} 


export async function readERC20Balance(tokenAddress: `0x${string}`,userAddress: `0x${string}`): Promise<bigint | null> {
    // const {toast} = useToast();
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getERC20Balance([tokenAddress,userAddress]);

        console.log("Read ERC20 Balance", data);

        if (typeof data === "bigint"
             && data !== null 
           
            ) {
          
            return data;
        } else {
            // toast({
            //     variant: 'destructive',
            //     title:'Unexpected data format',
            //     description: 'Unexpected data format sent !!!'
            // })
            return null;
        }
    } catch (error) {
        // toast({
        //     variant: 'destructive',
        //     title:'Error occured',
        //     description: 'Error reading contract !!!'
        // })
        console.error("Error reading contract:", error);
        return null;
    }
}

export async function readHistoryData(userAddress: `0x${string}`): Promise<SendReceive[] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getMyHistory([userAddress]);

        console.log("History Data:", data);

        if (Array.isArray(data)) {
            return data as SendReceive[];
        } else {
            
            return null;
        }
    } catch (error) {
        
        console.error("Error reading history:", error);
        return null;
    }
}

export async function approve(spender: `0x${string}`, amount: bigint): Promise<boolean | null> {
    try {
        const contract = getContract({
            address: stableCoinAddress,
            abi: stableCoinAbi,
            client,
        });

        const tx = await contract.write.approve([spender, amount]);
        console.log("Approve Transaction:", tx);
        return true; // Assuming the transaction is successful
    } catch (error) {
        console.error("Error approving tokens:", error);
        return null;
    }
}

export async function allowance(owner: `0x${string}`, spender: `0x${string}`): Promise<bigint | null> {
    try {
        const contract = getContract({
            address: stableCoinAddress,
            abi: stableCoinAbi,
            client,
        });

        const data = await contract.read.allowance([owner, spender]);

        console.log(`${data} clauouidb `)
        if (typeof data === "bigint"
            && data !== null 
          
           ) {
         
           return data;
       } else {
           // toast({
           //     variant: 'destructive',
           //     title:'Unexpected data format',
           //     description: 'Unexpected data format sent !!!'
           // })
           return null;
       }
    } catch (error) {
        console.error("Error fetching allowance:", error);
        return BigInt(0);
    }
}

export async function readMyRequests(userAddress: `0x${string}`): Promise<Request[] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getMyRequests([userAddress]);

        console.log("My Requests Data:", data);

        if (Array.isArray(data)) {
            return data as Request[];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error reading my requests:", error);
        return null;
    }
}

// const history = await readHistoryData(userAddress);
// if (history) {
//     // Process the history data
//     history.forEach(transaction => {
//         console.log(transaction.action, transaction.amount, transaction.message);
//     });
// }