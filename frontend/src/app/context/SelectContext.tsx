"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";


interface Contact {
  id?:string;
  firstName:string;
  lastName:string;
  gender:string;
  dateOfBirth:string;
  imageUrl:string;
  xHandle:string;
  facebookHandle:string;
  igHandle:string;
  location:string;
  email:string;
  phone:string;
  userAddress:string;
  hasName:boolean;
}

interface SelectedContactContextType {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  removeContact:(id:string)=>void;
}

const SelectedContactContext = createContext<SelectedContactContextType | undefined>(undefined);

export const useSelectedContactContext = () => {
  const context = useContext(SelectedContactContext);
  if (!context) {
    throw new Error("useSelectedContactContext must be used within a SelectedContactProvider");
  }
  return context;
};

export const SelectedContactProvider = ({ children }: { children: ReactNode }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [, setContacts] = useState<Contact[]>([]);

  const removeContact=(id:string)=>{
    setContacts((prevContacts)=>prevContacts.filter((contact)=>contact.id !== id));
    if(selectedContact?.id === id){
      setSelectedContact(null)
    }
  } 

  return (
    <SelectedContactContext.Provider value={{ selectedContact, setSelectedContact, removeContact }}>
      {children}
    </SelectedContactContext.Provider>
  );
};