import Image from "next/image";

import { Heading } from "@/components/shared/Heading";
import { exploreSection } from "@/app/data";

function Explore() {
  return (
    <div className="bg-softBlend">
      <section className="article mx-5 md:mx-10 border border-zinc-800 border-t-0 border-b-0">
      <Heading className="font-bowlby text-white flex text-2xl text-nowrap md:text-wrap md:text-5xl  justify-center items-center ">what we offer</Heading>
        {exploreSection.map(({image,description},index)=>(
          <div className="font-dmMono" key={index}>
              <Image  src={image} alt={image} width={500} height={150} />
              <p>{description}</p>
          </div>
        ))}
      </section>
      </div>

  );
}

export default Explore;
