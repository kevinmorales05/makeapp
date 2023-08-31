import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import { SafeUser } from "@/app/types";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { useLocale } from "next-intl";
import { IProductFormatted } from "./useProducts";
import { toast } from "sonner";
import { apix } from "../constants/axios-instance";

interface CartStore {
    CartItems: IProductFormatted[] | never,
    addCart: (
        item: IProductFormatted,
        currentUser: SafeUser | null | undefined,
        locale: string
    ) => Promise<void>,
    removeCart: (
        item: IProductFormatted,
        currentUser: SafeUser | null | undefined,
        locale: string
    ) => Promise<void>,
    totalCart: () => number,
    mergeLocalandDB: (localObjIds: IProductFormatted[], userIds: number[], locale: string) => Promise<void>,
    currentCarts: () => IProductFormatted[]
    clear: () => void
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => (
                {
                    cartItems: [],
                    addCart: async (item, currentUser, locale) => {
                        if (currentUser) {
                            toast.promise(apix(locale).put("carts", item), {
                                loading: 'Loading...',
                                success: (data) => {
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
                            set(produce(draft => {
                                const isPresentAdded = draft?.cartItems.map((it: IProductFormatted) => {
                                    if (it.id === item.id) {
                                        return {
                                            ...it,
                                            quantity: it.quantity + 1
                                        }
                                    } else {
                                        return it
                                    }
                                })
                                draft.cartItems = isPresentAdded ? isPresentAdded : []
                            }))
                        }
                    },
                    removeCart: async (item, currentUser, locale) => {
                        if (currentUser) {
                            toast.promise(apix(locale).delete(`carts/${item.id}`,), {
                                loading: 'Loading...',
                                success: (data) => {
                                    // console.log("data", data)
                                    set(produce((draft) => ({
                                        ...draft, cartItems: data.data
                                    })))
                                    return `Item deleted`;
                                },
                                error: (error: any) => {
                                    return `Failed to add item: ${error.message}`;
                                }
                            })
                        } else {
                            set(state => {
                                const isPresent = state.cart.findIndex(it => it.id === item.id);

                                if (isPresent === -1) {
                                    return {
                                        ...state
                                    };
                                }

                                const updatedCart = state.cart
                                    .map(it => (it.id === item.id ? { ...it, count: Math.max(it.quantity - 1, 0) } : it))
                                    .filter(it => it.quantity);

                                return {
                                    ...state,
                                    cartItems: updatedCart
                                };
                            })
                        }
                    },
                    totalCart: () => get().cartItems.length,
                    mergeLocalandDB: async (localObjIds, userIds, locale) => {
                        const localIds = localObjIds.map(it => it.id);
                        const uniqueIds = Array.from(([...localIds, ...userIds]));
                        // console.log("uniqueIds: ", uniqueIds)
                        toast.promise(apix(locale).post(`carts`, uniqueIds), {
                            loading: 'Loading...',
                            success: (data) => {
                                console.log("data", data)
                                set(produce((draft) => ({
                                    ...draft, cartItems: data.data
                                })))
                                return `Carts synchronized`;
                            },
                            error: (error: any) => {
                                return `Failed to synchronize carts: ${error.message}`;
                            }
                        })

                    },
                    currentCarts: () => get().cartItems,
                    clear: () => set(produce((draft) => { draft.cartItems = [] })),
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
    currentUser?: SafeUser | null
}

const useCart = ({ listing, currentUser }: IUseCart) => {
    const router = useRouter();

    const { addCart, removeCart, currentCarts, mergeLocalandDB } = useCartStore()
    const locale = useLocale()

    const hasCarted = useMemo(() => {
        // const list = currentUser?.cartIds || [];

        // if (list.length > 0) {
        //   mergeLocalandDB(currentCarts(), list, locale)
        // }
        // list.forEach(item => {addCart(item)});
        // return list.includes(listingId);

        // if (currentCarts().length === 0) {
        //   console.log("why number times")
        //   if (currentUser?.email) {
        //     mergeLocalandDB(currentCarts(), currentUser?.cartIds, locale)
        //   }
        //   return false;
        // }
        return currentCarts().some((it) => it.id === listing.id);
    }, [currentCarts()]);

    const toggleCart = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        try {
            let request;
            if (hasCarted) {
                // request = () => axios.delete(`/${locale}/api/carts/${listingId}`);
                removeCart(listing, currentUser, locale);
            } else {
                addCart(listing, currentUser, locale)
                // request = () => axios.post(`/${locale}/api/carts/${listingId}`);
            }
            // await request();
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

