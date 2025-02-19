"use client"
import { createContext,  useContext, useEffect, useState } from "react";
import { HistoryContextType, SendReceive } from "../../../types/transaction.types";
import { usePrivy } from "@privy-io/react-auth";
import { readHistoryData } from "@/lib/integrations/viem/contract";
import { toast } from "@/hooks/use-toast";

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({children}:{children:React.ReactNode}){
    const [transactionHistory, setTransactionHistory] = useState<SendReceive[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {user} = usePrivy();
    const walletAddress = user?.wallet?.address

    useEffect(()=>{
        const fetchUserData=async()=>{
            if(!walletAddress){
                setIsLoading(false);
                return
            }

            setIsLoading(true);

            try {
                const history = await readHistoryData(walletAddress as `0x${string}`);
                setTransactionHistory(history || []);
            } catch (error) {
                toast({
                    variant:'destructive',
                    description:`Error fetching transaction history: ${error}`
                })
            }
            finally{
                setIsLoading(false)
            }
        };

        fetchUserData();

    },[walletAddress]);


    return(
        <HistoryContext.Provider value={{transactionHistory,isLoading}}>
            {children}
        </HistoryContext.Provider>
    )
}

export function useHistory(){
    const context = useContext(HistoryContext);
    if(!context){
        throw new Error("useHistory must be used within a HistoryProvider")
    }

    return context;
}