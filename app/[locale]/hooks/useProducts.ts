import { ICartItemState } from "./useCart";
import { SafeCart, SafeProducts } from "../types";
import { getPriceApp } from "../constants/server_constants";

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
}

export interface IProductFormatted {
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
}

export const formattedCarts = (products: SafeCart[] | []) => products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    subCategory: p.subCategory,
    cost: getPriceApp(p.cost),
    promoCost: getPriceApp(p.promoCost),
    bestSeller: p.bestSeller,
    kit: p.kit,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    color: p.color,
    src: p.imageSrc,
    quantity: p.quantity
})) as ICartItemState[];


export const formattedProducts = (products: SafeProducts[] | [] ) => products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    subCategory: p.subCategory,
    cost: getPriceApp(p.cost),
    promoCost: getPriceApp(p.promoCost),
    bestSeller: p.bestSeller,
    kit: p.kit,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    color: p.color,
    src: p.imageSrc,
})) as IProductFormatted[];


export const formattedProductById = (product: SafeProducts | null): IProductFormatted | null => {
    if (!product) return null
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        subCategory: product.subCategory,
        cost: getPriceApp(product.cost),
        promoCost: getPriceApp(product.promoCost),
        bestSeller: product.bestSeller,
        kit: product.kit,
        weight: product.weight,
        farmacState: product.farmacState,
        presentation: product.presentation,
        color: product.color,
        src: product.imageSrc
    }
}

export const useProducts = () => {

    const getByPagination = (from: number, to: number, data: any) => data.slice(from, to);
    const getCount = () => formattedProducts.length;

    return { getByPagination, getCount }
}

// export default {useProducts};