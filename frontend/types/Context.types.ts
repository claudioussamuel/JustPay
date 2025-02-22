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
