'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "@/app/components/Heading";
import HeartButton from "@/app/components/buttons/HeartButton";
import { IProductFormatted } from "@/app/hooks/useProducts";


interface ListingHeadProps {
  imageSrc: string;
  id: number;
  listing: IProductFormatted;
  currentUser?: SafeUser | null
}

const ListingProductImage: React.FC<ListingHeadProps> = ({
  imageSrc,
  id,
  listing,
  currentUser
}) => {

  return (
    <>
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          // width={200}
          // height={200}
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton
            listing={listing}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  );
}

export default ListingProductImage;