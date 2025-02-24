import { useState, useMemo,useEffect } from "react";
import { Contact } from "../../types/Context.types";
import { readAllMembers } from "@/lib/integrations/viem/contract";
// import { contactNumbers } from "@/app/data"; 

function useAllContactSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactNumbers, setContactNumbers] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      // TODO: Implement myFriends
      const data = await readAllMembers();
      if (data) {
        setContactNumbers(data);
      }
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    // Any additional logic that needs to run after contactNumbers has been set
  }, [contactNumbers]);

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contactNumbers;

    return contactNumbers
      .map(contact => ({
        ...contact,
        relevance: 
          (contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ? 3 : 0) +
          (contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 0) +
          (contact.userAddress.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0),
      }))
      .filter(contact => contact.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance); 
  }, [searchQuery, contactNumbers]);

  return { searchQuery, setSearchQuery, filteredContacts };
}

export default useAllContactSearch;
