"use client"
import { useState, useMemo, useCallback } from "react";
import { UsePaginationProps, UsePaginationReturn } from "../../types/Context.types";



export const usePagination = ({
  itemsPerPage: initialItemsPerPage,
  totalItems,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);


  const totalPages = useMemo(() => Math.max(Math.ceil(totalItems / itemsPerPage), 1), [totalItems, itemsPerPage]);


  const safeSetCurrentPage = useCallback((page: number) => {
    setCurrentPage((prevPage) => {
      const newPage = Math.min(Math.max(page, 1), totalPages);
      return newPage;
    });
  }, [totalPages]);

  const safeSetItemsPerPage = useCallback((items: number) => {
    if (items > 0) {
      setItemsPerPage(items);
      setCurrentPage(1); 
    }
  }, []);

  const paginatedItems = useCallback(
    <T,>(items: T[]): T[] => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.slice(startIndex, endIndex);
    },
    [currentPage, itemsPerPage]
  );

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage: safeSetCurrentPage,
    setItemsPerPage: safeSetItemsPerPage,
    paginatedItems,
    totalPages,
  };
};


