'use client'
import { SafeUser, safeFavoritesProducts } from "@/app/types";

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
import { IProductFormatted } from "../hooks/useProducts";
import { Card, CardBody, CardFooter, CardHeader, Image as ImageUI, Button as ButtonUI } from "@nextui-org/react";
import image33 from '@/public/mocking/creams.jpg'


interface FavoritesClientProps {
  favorites?: safeFavoritesProducts[] | null,
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser
}) => {

  const router = useRouter();
  const locale = useLocale()
  const { mergeLocalandDB, currentFavorites } = useFavoriteStore()



  const [data, setData] = useState<IProductFormatted[]>([])
  // useEffect(() => {
  //   if (currentFavorites().length) {
  //     console.log("all right");
  //     (async () => {
  //       const favorites = await apix(locale).post(`favorites`, currentFavorites());

  //       // setData(produce(draft => ({ data: favorites.data })))
  //       setData(favorites.data)
  //       console.log("axios response: ", favorites);
  //     })();
  //   };
  // }, [currentFavorites(),]);

  useEffect(() => {
    mergeLocalandDB(currentUser, favorites, locale)
  }, [currentFavorites()])

  useEffect(() => {
    setData(currentFavorites())
  }, [])

  console.log("final data sync", data)


  if (!data) return <>Loading...</>

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];


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
        {/* {favorites.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))} */}
        {data.length !== 0 && data.map((item: any) => (<>

          <div
            onClick={() => router.push(`/${locale}/shop/${item.id}`)}
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
                    listing={item}
                    currentUser={currentUser}
                  />
                </div>
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
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 mt-10">
        {list.map((item, index) => (
          <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
            <CardBody className="overflow-visible p-0">
              <ImageUI
                shadow="sm"
                radius="lg"
                width="100%"
                height={""}
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={image33.src}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">


        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">New</p>
            <h4 className="text-black font-medium text-2xl">Acme camera</h4>
          </CardHeader>
          <ImageUI
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src={image33.src}
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
              <p className="text-black text-tiny">Available soon.</p>
              <p className="text-black text-tiny">Get notified.</p>
            </div>
            <ButtonUI className="text-tiny" color="primary" radius="full" size="sm">
              Notify Me
            </ButtonUI>
          </CardFooter>
        </Card>

        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
            <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
          </CardHeader>
          <ImageUI
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={image33.src}
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <ImageUI
                alt="Breathing app icon"
                className="rounded-full w-10 h-11 bg-black"
                src={image33.src}
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Breathing App</p>
                <p className="text-tiny text-white/60">Get a good night's sleep.</p>
              </div>
            </div>
            <ButtonUI radius="full" size="sm">Get App</ButtonUI>
          </CardFooter>
        </Card>
      </div>

    </Container>
  );
}

export default FavoritesClient;