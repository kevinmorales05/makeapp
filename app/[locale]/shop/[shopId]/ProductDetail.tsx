'use client'

import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
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
import { IProductFormatted, formattedProductById } from "@/app/hooks/useProducts";
import { useCartStore } from "@/app/hooks/useCart";
import Breadcrumbs from "@/app/carts/Breadcrumbs";
// import { apix } from "@/app/constants/axios-instance";

interface IProductDetailProps {
  currentUser?: any;
  product: any
  locale: string
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product, locale, currentUser }) => {
  const listing = formattedProductById(product)
  const [hasUser, setHasUser] = useState<boolean>(false)
  const { currentCarts, addCart } = useCartStore()


  const handlerAddCart = async (currentListing: IProductFormatted) => {
    addCart(currentListing, currentUser, locale)
  }


  return (
    <Container>
      <div className="flex justify-center flex-col">
        <Breadcrumbs/>
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
              imageSrc={listing.src}
              id={listing.id}
              listing={listing}
              currentUser={currentUser}
            />

            <Heading
              title={listing.title}
              subtitle={listing.description}
            />

            <ListingProductRequest price={listing.cost} handlerButton={handlerAddCart} listing={listing} />
            <ListingProductInfo
              description={listing.description}
            />

          </div>

        </div>


      </div>
    </Container>
  )
}

export default ProductDetail