
export interface SendReceive {
    action: string;
    amount: bigint;
    message: string;
    otherPartyAddress: string;
    otherPartyName: string;
   
    time:bigint;
}

export interface HistoryContextType {
    transactionHistory: SendReceive[];
    isLoading:boolean;
}