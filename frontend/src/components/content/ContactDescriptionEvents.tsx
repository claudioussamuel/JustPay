import Image from 'next/image';
import React from 'react';

type Props = {
  date: string;
  title: string;
  time?: string;
  description: string;
  images: { images: string[] };
};

function ContactDescriptionEvents({ date, title, description, images: { images }, time }: Props) {
  const displayedImages = images.slice(0, 3);
  const extraImagesCount = images.length > 3 ? images.length - 3 : 0; 
  return (
    <div className="text-zinc-800">
      <h1 className="mb-1 text-[13px]">{date}</h1>
      <div className="border rounded-2xl p-5 bg-softBlend">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm ">{description}</p>

        {/* Image Display Section */}
        <div className='flex items-center justify-between'>

        <div className="flex items-center mt-3 -space-x-3">
          {displayedImages.map((img, index) => (
            <div key={index} className="relative w-10 h-10">
              <Image
                src={img}
                alt={`Event image ${index + 1}`}
                layout="fill"
                className="rounded-full object-cover border"
              />
            </div>
          ))}

         
          {extraImagesCount > 0 && (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-sm font-semibold">
              +{extraImagesCount}
            </div>
          )}
        </div>


        {time && (
          <div className="mt-2  text-sm">
            <h1>{time}</h1>
          </div>
        )}

        </div>



      </div>
    </div>
  );
}

export default ContactDescriptionEvents;
