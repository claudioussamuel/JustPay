'use client'

import { useContext, createContext, useState } from "react";


interface AppContextType {
    receipientAddress: string;
    isEditingAmount:boolean;
    setIsEditingDescription:(editing:boolean)=>void;
    setIsEditingAmount:(editing:boolean)=>void;
    isEditingDescription:boolean;
    setRecipientAddress: (address: string)=>void;
    amount: string;
    setAmount: (amount:string) => void;
    description: string;
    setDescription: (description:string)=>void;
    resetPayment: ()=>void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}>=({children})=>{
    const [receipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('0.00');
    const [description, setDescription] = useState('');
    const [isEditingAmount, setIsEditingAmount] = useState(false)
    const [isEditingDescription, setIsEditingDescription] = useState(false)


    const resetPayment=()=>{
        setRecipientAddress('')
        setAmount('0.00');
        setDescription('')
    };


    return(
        <AppContext.Provider
            value={{
                receipientAddress,
                setRecipientAddress,
                amount,
                setAmount,
                description,
                setDescription,
                resetPayment,
                isEditingAmount,
                isEditingDescription,
                setIsEditingAmount,
                setIsEditingDescription
            }}
        >
            {children}
        </AppContext.Provider>
    )

}


export const useAppContext=()=>{
    const context = useContext(AppContext);
    if(!context){
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}