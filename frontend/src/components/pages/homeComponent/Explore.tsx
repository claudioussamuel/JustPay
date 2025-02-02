import Image from "next/image";

import { Heading } from "@/components/shared/Heading";
import { exploreSection } from "@/app/data";

function Explore() {
  return (
    <div className="border py-10 border-l-0 border-r-0">
      <section className="article mx-10">
      <Heading className="font-bowlby text-white flex text-5xl  justify-center items-center ">what we offer</Heading>
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
