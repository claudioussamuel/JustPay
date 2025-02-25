"use client"

import React, { useState } from 'react';

const TransferContent = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState<'one-time' | 'daily' | 'weekly' | 'monthly'>('one-time');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      recipientAddress,
      purpose,
      startDate,
      endDate,
      duration,
    });
   
  };

  return (
    <div className='grid place-content-center mt-20'>

      <div className='space-y-3 mb-3'>
        <h1 className='font-bowlby text-zinc-800 text-3xl'>Schedule   payment</h1>
        <p className='font-dmMono text-zinc-800 max-w-2xl'>At your own time schedule any payment with no restriction at the confort of your home </p>
      </div>
    <form onSubmit={handleSubmit} className="space-y-4 font-dmMono ">
      <div>
        <label htmlFor="recipientAddress" className="block text-[20px] font-medium text-gray-700 ">
          Recipient Address
        </label>
        <input
          type="text"
          id="recipientAddress"
          value={recipientAddress}
          onChange={(e) => setRecipientAddress(e.target.value)}
          className="mt-1 block w-[500px] rounded-md p-3  border-gray-300 text-zinc-800 placeholder:text-zinc-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter recipient's wallet address"
          required
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block  font-medium text-[18px] text-gray-700">
          Purpose
        </label>
        <textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="mt-1 block w-[500px] p-5 rounded-md placeholder:text-zinc-500 text-zinc-500 placeholder:text-[18px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Why are you sending this money?"
          rows={3}
          required
        />
      </div>

      <div>
        <label htmlFor="startDate" className="block text-[18px] font-medium text-gray-700">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 block w-[500px] p-2 text-[18px] placeholder:text-zinc-800 rounded-md text-zinc-500"
          required
        />
      </div>

      <div>
        <label htmlFor="endDate" className="block text-[18px] font-medium text-gray-700">
          End Date 
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 block  rounded-md border-gray-300 shadow-sm text-[18px] text-zinc-500"
        />
      </div>

      <div>
        <label htmlFor="duration" className="block text-[18px] font-medium text-gray-700 ">
          Duration
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value as 'one-time' | 'daily' | 'weekly' | 'monthly')}
          className="mt-1 block  rounded-md bg-gray-300 px-3 py-2  text-zinc-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="one-time">One-time</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Schedule Payment
      </button>
    </form>
    </div>
  );
};

export default TransferContent;