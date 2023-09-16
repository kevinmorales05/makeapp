'use client'

import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingProductImage from "./ProductImage";
import { DescriptionProduct } from "./ProductInfo";
import { IProductFormatted } from "@/app/hooks/useProducts";
import { useCartStore } from "@/app/hooks/useCart";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { SafeUser } from "@/app/types";
import DetailProduct from "./DetailProduct";
import ProductImage from "./ProductImage";

interface IShopClientProps {
  product: IProductFormatted | null
  locale: string
  currentUser?: SafeUser | null
}

const ShopClient: React.FC<IShopClientProps> = ({ product, locale, currentUser }) => {
  const { addCart } = useCartStore()


  const handlerAddCart = async (currentListing: IProductFormatted) => {
    addCart(currentUser, currentListing, locale)
  }

  if (!product) {
    return (<ClientOnly>
      <EmptyState title="Something went wrong with this product" subtitle="Try with another product" />
    </ClientOnly>)
  }


  return (
    <Container>
      <div className="flex justify-center flex-col">
        <Breadcrumbs />
        <div className="max-w-screen-lg mx-auto flex flex-col gap-4 sm:gap-0">
          <ClientOnly>
            <div className="
          flex flex-col px-4 
          sm:grid sm:grid-flow-row sm:grid-cols-2
          gap-0 sm:gap-8 w-full
           ">
              <ProductImage
                imageSrc={product.src}
                product={product}
                currentUser={currentUser}
              />
              <DetailProduct handlerButton={handlerAddCart} product={product} currentUser={currentUser} locale={locale} />
            </div>
            <DescriptionProduct
              description={product.description}
            />
          </ClientOnly>
        </div>
      </div>
    </Container>
  )
}

export default ShopClient