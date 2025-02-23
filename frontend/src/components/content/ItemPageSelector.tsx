"use client"

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";

interface ItemPageSelectorProps {
  className?: string;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

function ItemPageSelector({ className, itemsPerPage, setItemsPerPage }: ItemPageSelectorProps) {
  return (
    <div className={clsx("flex items-center gap-3 py-5", className)}>
      <label htmlFor="itemsPerPage">Items per page:</label>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => setItemsPerPage(Number(value))}
      >
        <SelectTrigger className="w-[60px]">
          <SelectValue placeholder="Select number" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Items per page</SelectLabel>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ItemPageSelector;
