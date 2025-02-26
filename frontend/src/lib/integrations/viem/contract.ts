"use client"

import { getContract } from "viem";
import { contractAbi, contractAddress, stableCoinAbi, stableCoinAddress } from "./abi";
import { client } from "./client";


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

interface UserInfo {
    firstName:string;
    lastName:string;
    gender:string;
    dateOfBirth:string;
    imageUrl:string;
    xHandle:string;
    facebookHandle:string;
    igHandle:string;
    location:string;
    email:string;
    phone:string;
    userAddress:string;
    hasName:boolean;
}

export async function readContractData(userAddress: `0x${string}`): Promise<[string, string, string, string, string, string, string, string,string,string,string,string, boolean] | null> {
   
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
             && "imageUrl" in data 
             && "xHandle" in data 
             && "facebookHandle" in data 
             && "igHandle" in data 
             && "location" in data
             && "email" in data
             && "phone" in data
             && "userAddress" in data
             && "hasName" in data
            ) {
          
            return [data.firstName, data.lastName,data.gender,data.dateOfBirth,data.imageUrl,data.xHandle,data.facebookHandle,data.igHandle,data.location,data.email,data.phone,data.userAddress,data.hasName] as [string, string,string,string,string,string,string,string,string,string,string,string,boolean];
        } else {
           
            return null;
        }
    } catch (error) {
     
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

export async function readHistoryBetweenFriendsData(userAddress: `0x${string}`,friendAddress: `0x${string}`): Promise<SendReceive[] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getMyHistoryWithAFriend([userAddress,friendAddress]);

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

//

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


export async function readAllMembers(): Promise<UserInfo[] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getAllUsers();

        console.log("My Requests Data:", data);

        if (Array.isArray(data)) {
            return data as UserInfo[];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error reading my requests:", error);
        return null;
    }
}

export async function readMyFriends(userAddress: `0x${string}`): Promise<UserInfo[] | null> {
    try {
        const contract = getContract({
            address: contractAddress,
            abi: contractAbi,
            client,
        });

        const data = await contract.read.getAllMyFriends([userAddress]);

        console.log("My Friends Data:", data);

        if (Array.isArray(data)) {
            return data as UserInfo[];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error reading my friends:", error);
        return null;
    }
}

