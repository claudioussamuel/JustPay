"use client";

import React from "react";
import { ContainerAddContentProps } from "../../../../types/global.types";
import { Button } from "@/components/ui/button";
import AddToContactList from "@/components/content/AddToContactList";
import UnavailableData from "@/components/unavailable/UnavailableData";
import { usePagination } from "@/hooks/usePagination";
import ItemPageSelector from "@/components/content/ItemPageSelector";

function ContainerAddContent({ addNewContacts }: ContainerAddContentProps) {
  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    paginatedItems,
    totalPages,
  } = usePagination({ itemsPerPage: 5, totalItems: addNewContacts.length });

  const currentItems = paginatedItems(addNewContacts);

  if (addNewContacts.length === 0) {
    return (
      <div>
        <UnavailableData
          title="Contact list is empty"
          description="Add contacts to see your data!"
          image="/images/contact-book.png"
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ItemPageSelector
        className="text-zinc-800 place-self-center"
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      {currentItems.map((data, index) => (
        <AddToContactList key={index} data={data} />
      ))}

      <div className="flex items-center text-[12px] justify-center gap-3 text-zinc-800">
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default ContainerAddContent;
