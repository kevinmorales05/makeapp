import products from "@/public/data/products.json"
import { create } from "zustand";
import { Products } from "../types/products";
import { useCallback, useMemo } from "react";


interface formattedProductsProps {
    id?: Number;
    price?: String;
    title?: String;
    category?: String;
    src?: String;
}
interface currentProductsStore {
    products?: formattedProductsProps | any;
    setProducts: () => void;

}


const formattedProducts = products.map((p) => ({
    id: p.id,
    price: p.price,
    title: p.title,
    category: p.category,
    src: p.image
}))

// export const currentProducts = create<currentProductsStore>((set) => ({
//     products: []
// }));

export const useProducts = () => {


    const getAll = () => formattedProducts;
    const getByPagination = (from: number, to: number) => formattedProducts.slice(from, to);
    const getCount = () => formattedProducts.length;

    const currentProducts = create<currentProductsStore>((set) => ({
        products: [],
        setProducts: () => set({ products })

    }));

    return { getByPagination, getCount, getAll }
}

// export default {useProducts};