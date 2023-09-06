'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingProductImage from "./ListingProductImage";
import Heading from "@/app/components/Heading";
import { ListingProductInfo } from "./ListingProductInfo";
import ListingProductRequest from "./ListingProductRequest";
import { IProductFormatted, formattedProductById } from "@/app/hooks/useProducts";
import { useCartStore } from "@/app/hooks/useCart";
import Breadcrumbs from "@/app/components/Breadcrumbs";

interface IShopClientProps {
  currentUser?: any;
  product: IProductFormatted | null
  locale: string
}

const ShopClient: React.FC<IShopClientProps> = ({ product, locale, currentUser }) => {
  const listing = product
  const { addCart } = useCartStore()


  const handlerAddCart = async (currentListing: IProductFormatted) => {
    addCart(currentUser, currentListing, locale)
  }


  if (!listing) {
    return (<ClientOnly>
      <EmptyState title="Something went wrong with this product" subtitle="Try with another product" />
    </ClientOnly>)
  }


  return (
    <Container>
      <div className="flex justify-center flex-col something">
        <Breadcrumbs />
        {/* <div>btn</div> */}
        <div className="max-w-screen-lg mx-auto flex">

          <div className="flex flex-wrap flex-col">
            <ClientOnly>
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
            </ClientOnly>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ShopClient