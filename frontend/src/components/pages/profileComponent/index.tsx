"use client";

import { useEffect, useState } from "react";
import { readContractData } from "@/lib/integrations/viem/contract";

type ContractNameData = [string, boolean] | null; 

export default function ContractReader() {
  const [data, setData] = useState<ContractNameData>(null);
  
  const userAddress:`0x${string}`="0x4a18a9Dc57C6faA65EDBA9333c510d26d4154ecF"; 

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await readContractData(userAddress);
        console.log("Fetched Data:", result);

        if (result) {
          setData(result); 
        }
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Smart Contract Data</h1>
      {data ? (
        <p>
          Name: {data[0]} <br />
          Has Name: {data[1] ? "Yes" : "No"}
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
