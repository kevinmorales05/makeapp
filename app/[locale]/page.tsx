import Container from "@/app/components/Container";
// import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

// import getListings, {IListingsParams} from "@/app/actions/getListings";
// import { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import Carousel from "./components/carousel/Carousel";
import { GiLips } from "react-icons/gi";
import { AiOutlineHighlight } from "react-icons/ai";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import ProductCarousel from "./components/carousel/ProductCarousel";
import getItemsCarousel from "./actions/getItemsCarousel";
import { formattedProducts } from "./hooks/useProducts";


// interface HomeProps {
// searchParams: IListingsParams
// };


const Home = async (
  // { searchParams }: HomeProps
) => {
  // const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  const slides_count = 10;
  const itemsCarousel = await getItemsCarousel(slides_count);

  // const locale1 = useLocale()

  // console.log("locale 1", locale1)

  // if (listings.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState showReset />
  //     </ClientOnly>
  //   );
  // }

  return (
    <>
      <Container>
        <ClientOnly>
          <Carousel />
          {/* <ProductCarousel
            title="top products"
            autoPlayProp
            items={formattedProducts(itemsCarousel)}
            currentUser={currentUser}
          /> */}
        </ClientOnly >
      </Container>
      <Container>
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
        >

          {/* {listings.map((listing: any) => (
            <ListingCard
            currentUser={currentUser}
              key={listing.id}
              data={listing}
              />
          ))} */}

        </div>



      </Container>
    </>
  )
}

export default Home;
