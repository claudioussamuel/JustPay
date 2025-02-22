export type PaginationContextType={
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage: (page: number | ((prev:number)=>number))=>void
    setItemsPerPage: (items:number)=>void
}

export type UsePaginationProps = {
    itemsPerPage: number;
    totalItems: number;
}

export type UsePaginationReturn = {
    currentPage:number;
    itemsPerPage: number;
    setCurrentPage: (page:number)=>void;
    setItemsPerPage: (items:number)=>void;
    totalPages: number;
    paginatedItems: <T>(items: T[])=>T[];
}


export type Contact = {
    firstName:string;
    lastName:string;
    gmail:string;
    relationship?:string;
    occupation:string;
    x?:string;
    date?:string;
    ig?:string;
    phone?:string | number | any;
}

export type SelectedContactContextType ={
    selectedContact: Contact | null;
    setSelectedContact: (contact: Contact | null)=>void;
}