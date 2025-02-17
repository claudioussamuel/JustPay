"use client"

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useToast } from "./use-toast";


export default function ProtectedRoute({children}:{children:React.ReactNode}){
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    const {toast} = useToast()

    useEffect(()=>{
        if(!isAuthenticated){
            router.push("/");
            toast({
                variant:'destructive',
                description:'Please login before you can access the page'
            })
        }
        else if(isAuthenticated){
            toast({
                variant:'default',
                description:'You are Authenticate :)',
                className:'toast-success'
            })
        }
    },[isAuthenticated, router]);

    if(!isAuthenticated) return null;

    return <>{children}</>
}