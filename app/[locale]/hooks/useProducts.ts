import products from "@/public/data/productsKorean.json"
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
    title: p.title,
    description: p.description,
    category: p.category,
    subCategory: p.subcategory,
    cost: parseFloat(p.cost),
    promoCost: parseFloat(p.promoCost),
    bestSeller: p.bestSeller || p.bestSeller === "0" ? false : true,
    kit: p.kit === "1" || p.kit.toUpperCase() === "KIT".toUpperCase() ? true : false,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    color: p.color,
    src: p.imgUrl,
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