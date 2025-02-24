"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import AddToContactList from "@/components/content/AddToContactList";
import UnavailableData from "@/components/unavailable/UnavailableData";
import { usePagination } from "@/hooks/usePagination";
import ItemPageSelector from "@/components/content/ItemPageSelector";
import { IoSearchCircleOutline } from "react-icons/io5";
import useContactSearch from "@/hooks/useAllContactSearch";

function ContainerAddContent() {

  const { searchQuery, setSearchQuery, filteredContacts } = useContactSearch();
  const {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    paginatedItems,
    totalPages,
  } = usePagination({ itemsPerPage: 5, totalItems: filteredContacts.length}); 




  const currentItems = paginatedItems(filteredContacts);

  if (filteredContacts.length === 0) {
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

    
      <div className="flex border gap-5 items-center p-2 border-zinc-800 rounded-md">
        <IoSearchCircleOutline className="text-2xl" />
        <input
          className="outline-none bg-transparent placeholder:text-zinc-800"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      {currentItems.length === 0 ? (
        <UnavailableData
          title="No contacts found"
          description="Try searching for a different name or occupation."
          image="/images/contact-book.png"
        />
      ) : (
        currentItems.map((data, index) => (
          <AddToContactList key={index} data={data} />
        ))
      )}

   
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
