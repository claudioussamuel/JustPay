import { useSelectedContactContext } from '@/app/context/SelectContext';
import ContactInscription from '@/components/content/ContactInscription';
import { Button } from '@/components/ui/button';
import UnavailableData from '@/components/unavailable/UnavailableData';
import Link from 'next/link';
import React from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { IoSendOutline } from 'react-icons/io5';

function ContactDynamism() {
  const { selectedContact } = useSelectedContactContext();


  if (!selectedContact) {
    return (
      <UnavailableData
       title="Select a contact"
       description="In order to send some money kindly select the contact"
        image="/images/select.png"/>
    )
  }

  return (
    <div className='flex-[50%] bg-softBlend border h-auto'>
      <div className='p-5 border bg-brand-beige m-5 rounded-md'>
        <div className='flex gap-5'>
          <div className="w-20 h-20 p-3 rounded-full font-dmMono bg-gradient-to-r text-nowrap from-pink-500 via-purple-500 to-indigo-500 flex justify-center items-center">
            <h1 className="text-2xl text-white flex justify-center items-center text-nowrap">
              <span>{selectedContact.firstName[0]}</span>{' '}
              <span className='text-nowrap'>{selectedContact.lastName[0]}</span>
            </h1>
          </div>

          <div>
            <h1 className='text-2xl'>
              {selectedContact.firstName} {selectedContact.lastName}
            </h1>
            <div>
              <p>{selectedContact.occupation}</p>
            </div>

            <div className='bg-brand-light p-1 w-20 rounded-md'>
              <p className='text-center text-white text-[10px]'>
                {selectedContact.relationship}
              </p>
            </div>
          </div>
        </div>

        <div className='mt-5 flex flex-row gap-5 justify-around text-white'>
          <Link href="/payment">
            <Button className='hover:bg-none flex items-center gap-3 bg-brand-hue-color w-full justify-center py-2'>
              <IoSendOutline />
              send
            </Button>
          </Link>

          <div className='flex items-center gap-3 bg-green-400 w-full justify-center py-2'>
            receive
            <GiReceiveMoney />
          </div>
        </div>
      </div>

      <div className='p-5 space-y-3'>
        <ContactInscription title='phone number' description={selectedContact.phone} />
        <ContactInscription title='gmail' description={selectedContact.gmail} />
        <ContactInscription title='work' description={selectedContact.occupation} />
        <ContactInscription title='X' description={selectedContact.x} />
        <ContactInscription title='Birthday' description={selectedContact.date} />
      </div>
    </div>
  );
}

export default ContactDynamism;