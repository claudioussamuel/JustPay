
export interface SendReceive {
    action: string;
    amount: bigint;
    message: string;
    otherPartyAddress: string;
    otherPartyName: string;
    stableCoinName: string;
    time:bigint;
}

export interface HistoryContextType {
    transactionHistory: SendReceive[];
    isLoading:boolean;
}