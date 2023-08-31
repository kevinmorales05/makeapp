
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import FavoritesClient from "./FavoritesClient";

const page = async () => {
  // const listings = await getFavoriteListings();
  const favorites = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  console.log("carts", favorites)

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
          listings={favorites}
          currentUser={currentUser}
        />
      </ClientOnly>
  );
}

export default page;
