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
import { formattedProductById } from "@/app/hooks/useProducts";
import useCart from "@/app/hooks/useCart";
// import { apix } from "@/app/constants/axios-instance";

interface IProductDetailProps {
  currentUser?: any;
  product: any
  locale: string
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product, locale, currentUser }) => {
  const listing = formattedProductById(product)
  const [hasUser, setHasUser] = useState<boolean>(false)
  const cart = useCart()


  const handlerAddCart = async () => {

    if (!hasUser) {
      // console.log("items", cart.items)
      // console.log("totalPrice", cart.totalPrice())
      cart.addItem({
        id: listing.id,
        cost: listing.cost,
        src: listing.src,
        title: listing.title,
      })

      localStorage.setItem("cart", JSON.stringify(
        cart.items))
      const text: any = localStorage.getItem('cart')
      const data = JSON.parse(text)
      console.log("data", data)
    }


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
              imageSrc={listing.src}
              id={listing.id}
              currentUser={currentUser}
            />

            <Heading
              title={listing.title}
              subtitle={listing.description}
            />

            <ListingProductRequest price={listing.cost} handlerButton={handlerAddCart} />
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