import { produce } from "immer";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ItemState {
    id: number,
    title: string,
    cost: number,
    src: string,
    quantity?: number
}

interface CartStore {
    items: ItemState[],
    addItem: (item: ItemState) => void,
    removeItem: (id: number) => void,
    totalPrice: () => number
    fetch: () => void
    clear: () => void
}


const url = "https://pokeapi.co/api/v2/pokemon/ditto"
export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                items: [],
                addItem: (item: ItemState) => set(produce((draft) => { draft.items.push(item) })),
                removeItem: (id: number) =>
                    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
                totalPrice: () =>
                    get().items.reduce((total, item) => total + item.cost, 0),
                clear: () => set(produce((draft) => { draft.items = [] })),
                fetch: async () => fetch(url).then((res) => res.json()).then((data) => {


                    console.log('lets go', data);

                    // set(produce((draft) => { draft.items = data }))
                })
            }),
            {
                name: 'evil24-storage',
                partialize: (state) => ({ items: state.items.map(({ id, title }) => ({ id, title })) }),
                // storage: createJSONStorage(),
            }
        )
    )
)
// useCart.persist.clearStorage()

// const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
//     const router = useRouter();
  
//     const { favoriteItems, addFavorite, removeFavorite, currentFavorites } = useCartStore()
//     const locale = useLocale()
  
//     // const loginModal = useLoginModal();
//     console.log("current favorites", currentFavorites());
  
  
  
  
//     const hasFavorited = useMemo(() => {
//       const list = currentUser?.favoriteIds || [];
  
//       list.forEach(item => {
//         addFavorite(item)
//       });
  
//       // return list.includes(listingId);
//       console.log(currentFavorites().includes(listingId))
//       return currentFavorites().includes(listingId);
//     }, [currentUser, listingId, addFavorite, currentFavorites(),]);
  
  
  
  
//     const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
//       e.stopPropagation();
  
//       // if (!currentUser) {
//       // return loginModal.onOpen();
//       // }
  
//       try {
//         let request;
  
//         if (hasFavorited) {
//           // request = () => axios.delete(`/${locale}/api/favorites/${listingId}`);
//           removeFavorite(listingId);
//         } else {
//           addFavorite(listingId);
//           // request = () => axios.post(`/${locale}/api/favorites/${listingId}`);
//         }
  
//         // await request();
//         toast.success('Success');
//         // router.refresh();
//       } catch (error) {
//         toast.error('Something went wrong.');
//       }
//     },
//       [
//         // currentUser,
//         hasFavorited,
//         listingId,
//         addFavorite,
//         removeFavorite,
//         // loginModal,
//         locale,
//         toast,
//         router,
//         // loginModal,
//         router
//       ]);
  
//     return {
//       hasFavorited,
//       toggleFavorite,
//     }
//   }
  
//   export default useFavorite;
