'use client'
import { SafeListing, SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import { useFavoriteStore } from "../hooks/useFavorite";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apix } from "../constants/axios-instance";
import { produce } from "immer";
import HeartButton from "../components/HeartButton";
import Image from "next/image";
import Button from "../components/Button";

interface CartsClientsProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const CartsClients: React.FC<CartsClientsProps> = ({
  listings,
  currentUser
}) => {

  const router = useRouter();

  const { currentFavorites } = useFavoriteStore()
  const locale = useLocale()
  const [data, setData] = useState()
  console.log(currentFavorites())
  useEffect(() => {
    if (currentFavorites().length) {
      console.log("all right");
      (async () => {
        const favorites = await apix(locale).post(`favorites`, currentFavorites());

        // setData(produce(draft => ({ data: favorites.data })))
        setData(favorites.data)
        console.log("axios response: ", favorites);
      })();
    };
  }, [currentFavorites(),]);

  if (!data) return <>Loading...</>

  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of cosmetics you favorited!"
      />
      <div
        className="
          mt-10
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
        {data.map((item: any) => (<>

          <div
            onClick={() => router.push(`/listings/${item.id}`)}
            className="col-span-1 cursor-pointer group"
          >
            <div className="flex flex-col gap-2 w-full">
              <div
                className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
              >
                <Image
                  fill
                  className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
                  src={item.imageSrc}
                  alt="Listing"
                />
                <div className="
            absolute
            top-3
            right-3
          ">
                  <HeartButton
                    listingId={item.id}
                    currentUser={currentUser}
                  />
                </div>
              </div>
              <div className="font-semibold text-lg">
                {/* {location?.region}, {location?.label} */}
              </div>
              <div className="font-light text-neutral-500">
                {item.category}
              </div>
              <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                  $ {item.cost}
                </div>
                {(
                  <div className="font-light">night</div>
                )}
              </div>
              {(
                <Button
                  small
                  label={"add to cart"}
                  onClick={() => alert("you have already added")}
                />
              )}
            </div>
          </div>
        </>))
        }


      </div>
    </Container>
  );
}

export default CartsClients;