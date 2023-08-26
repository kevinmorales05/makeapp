'use client'

import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { useCategories } from "@/app/hooks/useCategories";
import { useMemo, useState } from "react";
import ListingProductHead from "./ListingProductImage";
import ListingProductImage from "./ListingProductImage";
import Heading from "@/app/components/Heading";
import { ListingProductInfo } from "./ListingProductInfo";
import ListingProductRequest from "./ListingProductRequest";
import axios from "axios";
import { toast } from "sonner";
import { useLocale } from "next-intl";
import { apix } from "@/app/constants/axios-instance";
// import { apix } from "@/app/constants/axios-instance";

interface IProductDetailProps {
  currentUser?: any;
  product: any
  locale: string
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product: listing, locale }) => {

  const [hasUser, setHasUser] = useState<boolean>(false)

  const handlerAddCart = async () => {
    const p = await apix(locale).get("https://pokeapi.co/api/v2/pokemon/ditto")
    console.log(p)

    // if (!hasUser) {
      
    //   localStorage.setItem("", JSON.stringify())
    // }


    if (hasUser) {
      apix(locale).post(`cart`, { data: listing })
        .then((e) => {
          console.log(e)
          toast.success("toaster.success");
        })
        .catch((error) => {
          toast.error("toaster.error");
        })
        .finally(() => {
        })
    }
  }


  return (
    <Container>
      <div className="flex justify-center flex-col">

        <div>btn</div>
        <div
          className="
          max-w-screen-lg 
          mx-auto
          flex
        "
        >

          <div className="flex flex-wrap flex-col">

            <ListingProductImage
              imageSrc={listing.imageSrc}
              id={listing.id}
            // currentUser={currentUser}
            />

            <Heading
              title={listing.title}
              subtitle={listing.description}
            />

            <ListingProductRequest price={listing.cost} handlerButton={handlerAddCart} />
            <ListingProductInfo
              user={listing.user}
              // category={["category"]}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />

          </div>

        </div>


      </div>
    </Container>
  )
}

export default ProductDetail