import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser, safeFavoritesProducts } from "@/app/types";

import useLoginModal from "./useLoginModal";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { useLocale } from "next-intl";
import { IProductFormatted } from "./useProducts";
import { toast } from "sonner";
import { apix } from "../constants/axios-instance";

interface FavoriteStore {
  favoriteItems: IProductFormatted[] | never[],
  addFavorite: (
    item: IProductFormatted | never,
    currentUser: SafeUser | null | undefined,
    locale: string
  ) => Promise<void>,
  removeFavorite: (
    item: IProductFormatted,
    currentUser: SafeUser | null | undefined,
    locale: string
  ) => Promise<void>,
  totalFavorite: () => number,
  mergeLocalandDB: (currentUser?: SafeUser | null, favoritesServer?: safeFavoritesProducts[] | null, locale?: string) => Promise<void>,
  currentFavorites: () => IProductFormatted[]
  clear: () => void
}

const mergingBoth = () => { }

export const useFavoriteStore = create<FavoriteStore>()(
  devtools(
    persist(
      (set, get) => (
        {
          favoriteItems: [],
          addFavorite: async (item, currentUser, locale) => {
            if (currentUser) {
              toast.promise(apix(locale).put("favorites", item), {
                loading: 'Loading...',
                success: (data) => {
                  // console.log("data", data)
                  set(produce((draft) => ({
                    ...draft, favoriteItems: data.data
                  })))
                  return `Item has been added`;
                },
                error: (error: any) => {
                  return `Failed to add item: ${error.message}`;
                }
              })
            } else {
              set(produce(draft => {
                draft.favoriteItems.push(item)
              }))
            }
          },
          removeFavorite: async (item, currentUser, locale) => {
            if (currentUser) {
              toast.promise(apix(locale).delete(`favorites/${item.id}`,), {
                loading: 'Loading...',
                success: (data) => {
                  // console.log("data", data)
                  set(produce((draft) => ({
                    ...draft, favoriteItems: data.data
                  })))
                  return `Item deleted`;
                },
                error: (error: any) => {
                  return `Failed to add item: ${error.message}`;
                }
              })
            } else {
              set(produce(draft => {
                draft.favoriteItems = draft.favoriteItems.filter((it: IProductFormatted) => it.id !== item.id)
              }))
            }
          },
          totalFavorite: () => get().favoriteItems.length,
          mergeLocalandDB: async (currentUser, favoritesServer, locale) => {

            if (currentUser && favoritesServer && locale) {

              const favoritesLocal = get().favoriteItems

              // nothing to db and local
              if (favoritesLocal.length === 0) {
                set(produce(draft => {
                  draft.favoriteItems = favoritesServer
                }))
              } else {

                // merge both to find differences between db and localStorage
                const both = [...favoritesLocal, ...favoritesServer]

                // ids which are not in server
                const mergeToServer = both.filter(all => favoritesServer.every(fserver => fserver.id !== all.id))

                const uniqueIds = mergeToServer.map(f => f.id)

                console.log('server', favoritesServer)
                console.log('local', favoritesLocal)
                console.log('total both ', both)
                console.log('merger to server ', mergeToServer)
                console.log('unique ids: ', uniqueIds)

                // if existe ids to update then update them
                if (uniqueIds.length > 0) {
                  toast.promise(apix(locale).put("favorites/merging", uniqueIds), {
                    loading: 'Loading...',
                    success: ({ data }) => {
                      set(produce((draft) => ({
                        ...draft, favoriteItems: data
                      })))
                      return `favorites sync has been added`;
                    },
                    error: (error: any) => {
                      return `Failed to sync: ${error.message}`;
                    }
                  })
                }
              }
            }
          },
          currentFavorites: () => get().favoriteItems,
          clear: () => set(produce((draft) => { draft.favoriteItems = [] })),
        }
      ),
      {
        name: 'favorite-storage',
        // partialize: (state) => ({ favoriteItems: state.favoriteItems.map(({ id, title, cost }) => ({ id, title, })) }),
      }
    )
  )
)




interface IUseFavorite {
  listing: IProductFormatted;
  currentUser?: SafeUser | null
}

const useFavorite = ({ listing, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const { addFavorite, removeFavorite, currentFavorites, mergeLocalandDB } = useFavoriteStore()
  const locale = useLocale()

  // const loginModal = useLoginModal();
  // console.log("current favorites", currentFavorites());
  // console.log("listing", listing)

  // console.log("currentuser", currentUser)

  const hasFavorited = useMemo(() => {
    // const list = currentUser?.favoriteIds || [];

    // if (list.length > 0) {
    //   mergeLocalandDB(currentFavorites(), list, locale)
    // }
    // list.forEach(item => {addFavorite(item)});
    // return list.includes(listingId);

    // if (currentFavorites().length === 0) {
    //   console.log("why number times")
    //   if (currentUser?.email) {
    //     mergeLocalandDB(currentFavorites(), currentUser?.favoriteIds, locale)
    //   }
    //   return false;
    // }
    return currentFavorites().some((it) => it.id === listing.id);
  }, [currentFavorites()]);


  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    try {
      let request;
      if (hasFavorited) {
        // request = () => axios.delete(`/${locale}/api/favorites/${listingId}`);
        removeFavorite(listing, currentUser, locale);
      } else {

        addFavorite(listing, currentUser, locale)
        // request = () => axios.post(`/${locale}/api/favorites/${listingId}`);
      }
      // await request();
      // router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  },
    [
      currentUser,
      hasFavorited,
      listing,
      addFavorite,
      removeFavorite,
      locale,
      router,
    ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
