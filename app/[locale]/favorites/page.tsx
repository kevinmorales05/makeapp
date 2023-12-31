
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";

import FavoritesClient from "./FavoritesClient";
import { formattedProducts } from "../hooks/useProducts";
import { SafeProducts, SafeUser } from "../types";

export const dynamic = "force-dynamic";

const page = async () => {
  const favorites: SafeProducts[] = await getFavorites();
  const formattedFavorites = formattedProducts(favorites);
  
  const currentUser: SafeUser | null = await getCurrentUser();
  
  return (
    <ClientOnly>
      <FavoritesClient
        favorites={formattedFavorites}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default page;
