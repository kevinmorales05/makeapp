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
const useCart = create<CartStore>()(
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

export default useCart

interface Item {
    id: number
    name: string
    price: number
}

interface Store {
    items: Item[]
    addItem: (item: Item) => void
    removeItem: (id: number) => void
    totalPrice: () => number
}

export const useCartStore = create<Store>((set, get) => ({
    items: [],
    addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (id: number) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    totalPrice: () =>
        get().items.reduce((total, item) => total + item.price, 0)
}))



interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()(
    devtools(
        persist(
            (set) => ({
                bears: 0,
                increase: (by) => set((state) => ({ bears: state.bears + by })),
            }),
            {
                name: 'bear-storage',
            }
        )
    )
)