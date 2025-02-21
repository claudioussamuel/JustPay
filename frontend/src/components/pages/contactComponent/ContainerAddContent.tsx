import React from "react";
import { usePaginationContext } from "@/app/context/PaginationContext";
import { ContactAddedType, ContainerAddContentProps } from "../../../../types/global.types";
import { Button } from "@/components/ui/button";
import AddToContactList from "@/components/content/AddToContactList";

function ContainerAddContent({ addNewContacts }:ContainerAddContentProps) {
  const { currentPage, itemsPerPage, setCurrentPage } = usePaginationContext();


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = addNewContacts.slice(startIndex, endIndex);


  const totalPages = Math.ceil(addNewContacts.length / itemsPerPage);

  return (
    <div className="space-y-10 mt-5">
    
      {currentItems.map((data: any, index: any) => (
        <AddToContactList key={index} data={data} />
      ))}

   
      <div className="flex items-center text-[12px] justify-center gap-3">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ContainerAddContent;