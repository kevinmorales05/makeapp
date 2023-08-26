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


// const formattedProducts = products.map((p) => ({
//     title: p.title,
//     description: p.description,
//     category: p.category,
//     subCategory: p.subcategory,
//     cost: parseFloat(p.cost),
//     promoCost: parseFloat(p.promoCost),
//     bestSeller: p.bestSeller || p.bestSeller === "0" ? false : true,
//     kit: p.kit === "1" || p.kit.toUpperCase() === "KIT".toUpperCase() ? true : false,
//     weight: p.weight,
//     farmacState: p.farmacState,
//     presentation: p.presentation,
//     color: p.color,
//     src: p.imgUrl,
// }))

export interface IProductProps {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
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
    createdAt: Date;
    updatedAt: Date;
}


export const formattedProducts = (products: IProductProps[]) => products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    subCategory: p.subCategory,
    cost: p.cost,
    promoCost: p.promoCost,
    bestSeller: p.bestSeller,
    kit: p.kit,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    color: p.color,
    src: p.imageSrc,
}))

export const useProducts = () => {



    const getByPagination = (from: number, to: number, data: any) => data.slice(from, to);
    const getCount = () => formattedProducts.length;

    const currentProducts = create<currentProductsStore>((set) => ({
        products: [],
        setProducts: () => set({ products })

    }));

    return { getByPagination, getCount }
}

// export default {useProducts};