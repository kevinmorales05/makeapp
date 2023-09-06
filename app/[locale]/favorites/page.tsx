
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavorites from "@/app/actions/getFavorites";

import FavoritesClient from "./FavoritesClient";
import { formattedProducts } from "../hooks/useProducts";
import { SafeProducts, SafeUser } from "../types";

const page = async () => {
  // const listings = await getFavoriteListings();
  const favorites: SafeProducts[] = await getFavorites();
  const currentUser: SafeUser | null = await getCurrentUser();

  const formattedFavorites = formattedProducts(favorites);
  
  // if (favorites.length === 0) {
  //   return (
  //     <ClientOnly>
  //       <EmptyState
  //         title="No favorites found"
  //         subtitle="Looks like you have no favorite listings."
  //       />
  //     </ClientOnly>
  //   );
  // }

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
