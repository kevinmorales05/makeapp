'use client'
import { SafeUser, safeFavoritesProducts } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useFavoriteStore } from "../hooks/useFavorite";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apix } from "../constants/axios-instance";
import { produce } from "immer";
import HeartButton from "../components/buttons/HeartButton";
import Image from "next/image";
import Button from "../components/buttons/Button";
import { IProductFormatted, formattedProducts } from "../hooks/useProducts";
import { Card, CardBody, CardFooter, CardHeader, Image as ImageUI, Button as ButtonUI } from "@nextui-org/react";
import image33 from '@/public/mocking/creams.jpg'
import { GiLips } from "react-icons/gi";
import { useCategories } from "../hooks/useCategories";
import CartButton from "../components/buttons/CartButton";
import { useCartStore } from "../hooks/useCart";
import EmptyState from "../components/EmptyState";
import FavoriteCard from "./FavoriteCard";


interface FavoritesClientProps {
  // favorites?: safeFavoritesProducts[],
  favorites?: IProductFormatted[],
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  favorites,
  currentUser
}) => {

  const router = useRouter();
  const locale = useLocale()
  const { mergeLocalandDB, currentFavorites } = useFavoriteStore()
  const { currentCarts } = useCartStore()
  const [data, setData] = useState<IProductFormatted[]>([])

  useEffect(() => {
    mergeLocalandDB(currentUser, favorites, locale)
  }, [currentUser, favorites, locale])

  useEffect(() => {
    setData(currentFavorites())
  }, [currentFavorites(), currentCarts()])

  const { allCategories } = useCategories()

  if (!data) return <>Loading...</>


  console.log("gimmer data ", data)
  return (
    <Container>
      {data.length === 0 &&
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite here."
        />
      }
      {data.length !== 0 &&
        <Heading
          title="Favorites"
          subtitle="List of cosmetics you favorited!"
        />
      }
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

        {data.length !== 0 && data.map((item: any) => (<>

          <FavoriteCard
            currentUser={currentUser}
            item={item}
            locale={locale}
            allCategories={allCategories}
            actionCard={() => router.push(`/${locale}/shop/${item.id}`)}
          />
        </>))
        }
      </div>

    </Container>
  );
}

export default FavoritesClient;