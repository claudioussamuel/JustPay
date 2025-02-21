export type PaginationContextType={
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage: (page: number | ((prev:number)=>number))=>void
    setItemsPerPage: (items:number)=>void
}