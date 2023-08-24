'use client'

import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { useCategories } from "@/app/hooks/useCategories";
import { useMemo } from "react";
import ListingProductHead from "./ListingProductImage";
import ListingProductImage from "./ListingProductImage";
import Heading from "@/app/components/Heading";
import { ListingProductInfo } from "./ListingProductInfo";

interface IProductDetailProps {
  currentUser?: any;
  product: any
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product: listing }) => {

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
          <div className="flex flex-col">

            <div className="flex flex-wrap">

              <ListingProductImage
                imageSrc={listing.imageSrc}
                id={listing.id}
              // currentUser={currentUser}
              />

              <Heading
                title={listing.title}
                subtitle={listing.description}
              />
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
      </div>
    </Container>
  )
}

export default ProductDetail