import { useState, useMemo } from "react";
import { contactNumbers } from "@/app/data"; 

function useContactSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contactNumbers;

    return contactNumbers
      .map(contact => ({
        ...contact,
        relevance: 
          (contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ? 3 : 0) +
          (contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
          (contact.occupation.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0),
      }))
      .filter(contact => contact.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance); 
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, filteredContacts };
}

export default useContactSearch;
