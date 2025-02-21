"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { PaginationContextType } from "../../../types/Context.types";

const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

export const usePaginationContext =()=>{
    const context = useContext(PaginationContext);
    if (!context){
        throw new Error("usePaginationContexgt must be used within a PaginationProvider")
    }
    return context;
}


export const PaginationProvider=({children}:{children:ReactNode})=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);

    return(
        <PaginationContext.Provider

         value={{currentPage,
                itemsPerPage,
                 setCurrentPage,
                 setItemsPerPage}}
        >
            {children}
        </PaginationContext.Provider>
    )
}