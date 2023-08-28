import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { useLocale } from "next-intl";

interface FavoriteState {
  id: number;
  title: string;        // @db.VarChar(200)
  description: string;
  imageSrc: string;
  cost: number;
  promoCost: number;
  bestSeller: boolean;  // @default(false)
  kit: boolean;         // @default(false)
  weight: string;
  farmacState: string;
  presentation: string;
  category: string;
  subCategory: string;
  color: string;
}

interface FavoriteStore {
  favoriteItems: FavoriteState[],
  addFavorite: (item: number) => void,
  removeFavorite: (id: number) => void,
  totalFavorite: () => number
  currentFavorites: () => FavoriteState[]
  clear: () => void

}

export const useFavoriteStore = create<FavoriteStore>()(
  devtools(
    persist(
      (set, get) => (
        {
          favoriteItems: [],
          addFavorite: (item) => set(produce((draft: any) => { draft.favoriteItems.push(item) })),
          removeFavorite: (id) =>
            set((state) => ({ favoriteItems: state.favoriteItems.filter((item) => item.id !== id) })),
          totalFavorite: () => get().favoriteItems.length,
          currentFavorites: () => get().favoriteItems,
          clear: () => set(produce((draft: any) => { draft.favoriteItems = [] })),
        }
      ),
      {
        name: 'favorite-storage',
        partialize: (state) => ({ favoriteItems: state.favoriteItems.map(({ id, title }) => ({ id, title })) }),
      }
    )
  )
)




interface IUseFavorite {
  listingId: number;
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const { favoriteItems, addFavorite, removeFavorite, currentFavorites } = useFavoriteStore()
  const locale = useLocale()

  // const loginModal = useLoginModal();
  console.log("current favorites", currentFavorites());




  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    list.forEach(item => {
      addFavorite(item)
    });

    // return list.includes(listingId);
    console.log(currentFavorites().every((it) => it.id === listingId));
    return currentFavorites().every((it) => it.id === listingId);
  }, [currentUser, listingId, addFavorite, currentFavorites(),]);




  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    // if (!currentUser) {
    // return loginModal.onOpen();
    // }

    try {
      let request;

      if (hasFavorited) {
        // request = () => axios.delete(`/${locale}/api/favorites/${listingId}`);
        removeFavorite(listingId);
      } else {
        addFavorite(listingId);
        // request = () => axios.post(`/${locale}/api/favorites/${listingId}`);
      }

      // await request();
      toast.success('Success');
      // router.refresh();
    } catch (error) {
      toast.error('Something went wrong.');
    }
  },
    [
      // currentUser,
      hasFavorited,
      listingId,
      addFavorite,
      removeFavorite,
      // loginModal,
      locale,
      toast,
      router,
      // loginModal,
      router
    ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite;
