'use client'

import { createContext, ReactNode, useContext, useState } from "react";
import { User, UserContextType } from "../../../types/global.types";

const userContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider =({children}:{children:ReactNode})=>{
    const [users, setUsers] = useState<User[]>([]);

    const addUser=(user:User)=>{
        setUsers((prevUsers)=>[...prevUsers, user])
    };

    return(
        <userContext.Provider
         value={{users, addUser}}
        >
            {children}
        </userContext.Provider>
    )
}

export const useUserContext=()=>{
    const context = useContext(userContext);
    if(!context){
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context;
}