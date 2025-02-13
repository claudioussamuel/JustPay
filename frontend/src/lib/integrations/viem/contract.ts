"use client"

import { getContract } from "viem";
import { contractAbi, contractAddress } from "./abi";
import { client } from "./client";
import { useToast } from "@/hooks/use-toast";

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