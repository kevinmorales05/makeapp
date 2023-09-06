import { SafeUser } from "@/app/types";

import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { IProductFormatted } from "./useProducts";
import { toast } from "sonner";
import { apix } from "../constants/axios-instance";

export interface ICartItemState {
    id: number;
    title: string;
    description: string;
    src: string;
    cost: number;
    promoCost: number;
    bestSeller: boolean;
    kit: boolean;
    weight: string;
    farmacState: string;
    presentation: string;
    category: string;
    subCategory: string;
    color: string;
    quantity: number;
}

interface CartStore {
    cartItems: ICartItemState[],
    addCart: (
        currentUser: SafeUser | null | undefined,
        item: IProductFormatted,
        locale: string
    ) => Promise<void>,

    removeCart: (
        currentUser: SafeUser | null | undefined,
        itemId: number,
        locale: string
    ) => Promise<void>,
    incrementCart: (
        currentUser: SafeUser | null | undefined,
        itemId: number,
        locale: string
    ) => Promise<void>,
    decrementCart: (
        currentUser: SafeUser | null | undefined,
        itemId: number,
        locale: string
    ) => Promise<void>,
    totalCart: () => number,
    mergeLocalandDB: (currentUser?: SafeUser | null, cartsServer?: IProductFormatted[] | null, locale?: string) => Promise<void>,
    currentCarts: () => ICartItemState[]
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => (
                {
                    cartItems: [],
                    incrementCart: async (currentUser, itemId, locale) => {
                        if (currentUser) {
                            toast.promise(apix(locale).put("carts/reducers/", itemId), {
                                loading: 'Loading...',
                                success: ({ data }) => {
                                    // console.log("data increment", data)
                                    set(produce((draft) => ({
                                        ...draft, cartItems: data.data
                                    })))
                                    return `Item added`;
                                },
                                error: (error: any) => {
                                    return `Failed to add item: ${error.message}`;
                                }
                            })
                        } else {
                            const currentCarts = get().cartItems
                            const addedItem = currentCarts.map((it) => {
                                if (it.id === itemId) {
                                    return {
                                        ...it,
                                        quantity: it.quantity + 1
                                    }
                                } else {
                                    return it
                                }
                            })
                            set(produce(draft => {
                                draft.cartItems = addedItem
                            }))
                        }
                    },
                    decrementCart: async (currentUser, itemId, locale) => {
                        if (currentUser) {
                            toast.promise(apix(locale).delete(`carts/reducers/${itemId}`,), {
                                loading: 'Loading...',
                                success: ({ data }) => {
                                    console.log("date decrement", data)
                                    // set(produce((draft) => ({
                                    //     ...draft, cartItems: data.data
                                    // })))
                                    return `Item deleted`;
                                },
                                error: (error: any) => {
                                    return `Failed to add item: ${error.message}`;
                                }
                            })
                        } else {
                            const currentCarts = get().cartItems
                            const minusItem = currentCarts.map((it) => {
                                if (it.id === itemId) {
                                    return {
                                        ...it,
                                        quantity: Math.max(it.quantity - 1, 1)
                                    }
                                } else {
                                    return it
                                }
                            })
                            set(produce(draft => {
                                draft.cartItems = minusItem
                            }))
                        }
                    },
                    addCart: async (currentUser, item, locale) => {
                        console.log("you call me", item)
                        if (currentUser) {
                            toast.promise(apix(locale).put(`carts/${item.id}`), {
                                loading: 'Loading...',
                                success: ({ data }) => {
                                    set(produce((draft) => ({
                                        ...draft, cartItems: data
                                    })))
                                    return `Item added`;
                                },
                                error: (error: any) => {
                                    return `Failed to add item: ${error.message}`;
                                }
                            })
                        } else {
                            const currentCart = get().cartItems
                            const isPresent = currentCart.some((it: IProductFormatted) => it.id === item.id);
                            if (!isPresent) {
                                set(produce(draft => {
                                    const withQty = { ...item, quantity: 1 };
                                    draft.cartItems.push(withQty);
                                }))
                            }
                        }
                    },
                    removeCart: async (currentUser, itemId, locale) => {
                        if (currentUser) {
                            toast.promise(apix(locale).delete(`carts/${itemId}`), {
                                loading: 'Loading...',
                                success: ({ data }) => {
                                    console.log("removed item", data)
                                    set(produce((draft) => ({
                                        ...draft, cartItems: data
                                    })))
                                    return `Item added`;
                                },
                                error: (error: any) => {
                                    return `Failed to add item: ${error.message}`;
                                }
                            })
                        } else {
                            const currentCarts = get().cartItems
                            const deletedItem = currentCarts.filter((it: IProductFormatted) => it.id !== itemId)
                            set(produce(draft => {
                                draft.cartItems = deletedItem
                            }))
                        }
                    },
                    totalCart: () => get().cartItems.length,
                    mergeLocalandDB: async (currentUser, cartsServer, locale) => {
                        if (currentUser && cartsServer && locale) {

                            const cartsLocal = get().cartItems

                            if (cartsLocal.length !== 0) {
                                // merge both to find differences between db and localStorage
                                const both = [...cartsLocal, ...cartsServer]

                                // ids which are not in server
                                const mergeToServer = both.filter(all => cartsServer.every(cserver => cserver.id !== all.id))

                                const uniqueIds = mergeToServer.map(c => c.id)

                                // if existe ids to update then update them
                                if (uniqueIds.length > 0) {
                                    toast.promise(apix(locale).put("carts/merging", mergeToServer), {
                                        loading: 'Loading...',
                                        success: ({ data }) => {

                                            console.log("sync data", data)
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
                    currentCarts: () => get().cartItems,
                }
            ),
            {
                name: 'cart-storage',
                // partialize: (state) => ({ cartItems: state.cartItems.map(({ id, title, cost }) => ({ id, title, })) }),
            }
        )
    )
)

interface IUseCart {
    listing: IProductFormatted;
    currentUser?: SafeUser | null;
    locale: string;
}

export const useCarouselCart = ({ listing, currentUser, locale }: IUseCart) => {
    const router = useRouter();

    const { addCart, removeCart, currentCarts } = useCartStore()

    const hasCarted = useMemo(() => {
        const val = currentCarts().some((it) => it.id === listing.id);
        return val
    }, [currentCarts()]);

    const toggleCart = useCallback(async () => {

        try {
            if (hasCarted) {
                removeCart(currentUser, listing.id, locale);
            } else {
                addCart(currentUser, listing, locale)
            }
            // router.refresh();
        } catch (error) {
            toast.error('Something went wrong.');
        }
    },
        [
            currentUser,
            hasCarted,
            listing,
            addCart,
            removeCart,
            locale,
            router,
        ]);

    return {
        hasCarted,
        toggleCart,
    }
}

const useCart = ({ listing, currentUser, locale }: IUseCart) => {
    const router = useRouter();

    const { addCart, removeCart, currentCarts } = useCartStore()

    const hasCarted = useMemo(() => {
        const val = currentCarts().some((it) => it.id === listing.id);
        return val
    }, [currentCarts()]);

    const toggleCart = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        try {
            if (hasCarted) {
                // request = () => axios.delete(`/${locale}/api/carts/${listingId}`);
                removeCart(currentUser, listing.id, locale);
            } else {
                addCart(currentUser, listing, locale)
                // request = () => axios.post(`/${locale}/api/carts/${listingId}`);
            }
            // router.refresh();
        } catch (error) {
            toast.error('Something went wrong.');
        }
    },
        [
            currentUser,
            hasCarted,
            listing,
            addCart,
            removeCart,
            locale,
            router,
        ]);

    return {
        hasCarted,
        toggleCart,
    }
}

export default useCart;



