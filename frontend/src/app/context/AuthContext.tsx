"use client"

import { createContext, useContext, useEffect, useState } from "react";

import { usePrivy } from "@privy-io/react-auth";

interface AuthContextType {
    isAuthenticated: boolean;
    user: any;
    login: ()=>void;
    logout: ()=>void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider=({children}:{children:React.ReactNode})=>{
    const {ready, authenticated,login,user,logout} = usePrivy();
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(()=>{
        if(ready){
            setIsAuthenticated(authenticated)
        }
    },[ready,authenticated])
    
    return(
        <AuthContext.Provider
        value={{
            isAuthenticated,
            user,
            login,
            logout
        }} 
        >
            {children}
        </AuthContext.Provider>
    )

}


export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AppProvider")
    }

    return context;
}