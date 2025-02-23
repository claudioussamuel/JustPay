"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Contact {
    firstName:string;
    lastName:string;
    gmail:string;
    relationship?:string;
    occupation:string;
    x?:string;
    date?:string;
    ig?:string;
    phone?:number;
}

interface SelectedContactContextType {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
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

  return (
    <SelectedContactContext.Provider value={{ selectedContact, setSelectedContact }}>
      {children}
    </SelectedContactContext.Provider>
  );
};