import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { useLocale } from "next-intl";
import { IProductFormatted } from "./useProducts";
import { toast } from "sonner";
import { apix } from "../constants/axios-instance";

interface FavoriteStore {
  favoriteItems: IProductFormatted[] | never,
  addFavorite: (
    item: IProductFormatted,
    currentUser: SafeUser | null | undefined,
    locale: string
  ) => Promise<void>,
  removeFavorite: (
    item: IProductFormatted,
    currentUser: SafeUser | null | undefined,
    locale: string
  ) => Promise<void>,
  totalFavorite: () => number,
  mergeLocalandDB: (localObjIds: IProductFormatted[], userIds: number[], locale: string) => Promise<void>,
  currentFavorites: () => IProductFormatted[]
  clear: () => void
}

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
          mergeLocalandDB: async (localObjIds, userIds, locale) => {
            const localIds = localObjIds.map(it => it.id);
            const uniqueIds = Array.from(([...localIds, ...userIds]));
            // console.log("uniqueIds: ", uniqueIds)
            toast.promise(apix(locale).post(`favorites`, uniqueIds), {
              loading: 'Loading...',
              success: (data) => {
                console.log("data", data)
                set(produce((draft) => ({
                  ...draft, favoriteItems: data.data
                })))
                return `Favorites syncronized`;
              },
              error: (error: any) => {
                return `Failed to syncronized favorites: ${error.message}`;
              }
            })

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
