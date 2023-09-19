'use client'
import { SafeUser } from "@/app/types";

import Heading from "@/app/components/Heading";
import Container from "@/app/components/Container";
import { useFavoriteStore } from "../hooks/useFavorite";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProductFormatted, formattedProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
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
  const t = useTranslations("favoritepage")
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
          title={t("title")}
          subtitle={t("subtitle")}
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