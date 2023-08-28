import { produce } from "immer";
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
const useCartStore = create<CartStore>()(
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

export default useCartStore
