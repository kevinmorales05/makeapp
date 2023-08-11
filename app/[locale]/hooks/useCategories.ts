import products from "@/public/data/products.json"
import { create } from "zustand";
import { Products } from "../types/products";
import { useCallback, useMemo } from "react";

import originals from "@/public/data/originals.json"

export interface ICategories {
    label: string;
    sub?: (SubEntity)[] | null;
}
export interface SubEntity {
    label: string;
}



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


const formattedCategories = originals.map((c) => ({
    name: c.name,
    description: c.description,
    category: c.category,
    subCategory: c.subcategory,
    cost: c.cost,
    promoCost: c.promoCost,
    bestSeller: c.bestSeller,
    kit: c.kit,
    weight: c.weight,
    state: c.state,
    presentation: c.presentation,
    color: c.color,
    src: c.imgUrl,
    moreDetails: c.detailsUrl,
}))


export const useCategories = () => {

    const cate = formattedCategories.reduce((accumulator: any, current) => {

        const { category, subCategory } = current;

        if (category.startsWith(subCategory) || subCategory === "" || !accumulator.has(category)) {
            accumulator.set(category,
                // { label: subCategory, sub: [] }
                category
            )
        }


        else {
            // if (accumulator.has(category)) {
            //     const subCate = accumulator.get(category)
            //     try {

            //         if ('sub' in subCate === false) {
            //             debugger
            //         }
            //         if (subCategory === 'cream/oil') {
            //             debugger
            //         }
            //         // console.log('testing',auxSub)
            //         const aux = subCate.sub.concat({ label: subCategory })
            //         const pushNewCat = { label: category, sub: aux }
            //         accumulator.set(category, pushNewCat)
            //     } catch (e) {
            //         console.log('this time is:', subCate)
            //         console.log('first this see', current)
            //         console.log('analyze', e,
            //             'this', category)
            //     }

            // } else {
            //     const newSubCategory = { label: category, sub: [{ label: subCategory }] }
            //     accumulator.set(category, newSubCategory)
            // }
        }
        return accumulator
    }, new Map<string, string>())
    console.log(cate)

    const categories = [
        {
            label: 'news'
        },
        {
            label: 'for men',
        },
        {
            label: 'facial care',
            sub: [
                {
                    label: "masks"
                },
                {
                    label: "hidrogel patches"
                },
                {
                    label: "cleansing oils"
                },
                {
                    label: "facial cleansing"
                },
                {
                    label: "scrubs and peeling"
                },
                {
                    label: "tonic"
                },
                {
                    label: "serum and essence"
                },
                {
                    label: "emulsion"
                },
                {
                    label: "eye contour"
                },
                {
                    label: "creams"
                },
                {
                    label: "oil facial"
                },
                {
                    label: "cosmetic set"
                },
                {
                    label: "solar protection"
                },
                {
                    label: "mist"
                },
            ]
        },
        {
            label: 'body',
            sub: [
                {
                    label: "bb cream"
                },
                {
                    label: "bb cushion"
                },
                {
                    label: "lipstick"
                },
                {
                    label: "concealers"
                },
                {
                    label: "masks"
                },
                {
                    label: "primer"
                },
            ]
        },
        {
            label: 'type of skin',
            sub: [
                {
                    label: "mixed skin"
                },
                {
                    label: "oily skin"
                },
                {
                    label: "dry skin"
                },
                {
                    label: "sensitive skin"
                },
                {
                    label: "normal"
                },
                {
                    label: "acne skin"
                },
                {
                    label: "enlarge pores"
                },
                {
                    label: "blotchy skin"
                },
                {
                    label: "wrinkled skin"
                },
            ]
        },
        {
            label: 'hands and feet',
        },
        {
            label: 'hair',
        },
        {
            label: 'mask bar',
        },
        {
            label: 'accessories',
        },
        {
            label: "complete routines",
        },
        {
            label: 'microneedle patches',
        },
        {
            label: 'brands',
            sub: [
                {
                    label: "ACROPASS"
                },
                {
                    label: "D'ALBA"
                },
                {
                    label: "SKIN 79"
                },
                {
                    label: "KLAIRS"
                },
                {
                    label: "BENTON"
                },
                {
                    label: "ELIZABETH"
                },
                {
                    label: "TONY MOLY"
                },
                {
                    label: "MISSHA"
                },
                {
                    label: "TOO COOL FOR SCHOOL"
                },
                {
                    label: "EXFOLIATION"
                },
                {
                    label: "MEDIHEAL"
                },
                {
                    label: "SECRET KEY"
                },
                {
                    label: "PURITO"
                },
                {
                    label: "IT'S SKIN"
                },
                {
                    label: "ID PLACOSMETICS"
                },
                {
                    label: "SHEATH SKIN"
                },
                {
                    label: "MY NAME IS ACACI"
                },
                {
                    label: "YADAH"
                },
                {
                    label: "MANYO"
                },
                {
                    label: "LA'DOR"
                },
                {
                    label: "CLAVUS"
                },
                {
                    label: "WELCOME"
                },
                {
                    label: "BANILA CO"
                },
                {
                    label: "BEAUTY OF JOSEON"
                },
                {
                    label: "SOME BY MI"
                },
                {
                    label: "MEDI-PEEL"
                },
                {
                    label: "LOOK AT ME"
                },
                {
                    label: "COSRX"
                },
                {
                    label: "NEOGEN"
                },
                {
                    label: "HEIMISH"
                },
            ]
        },
    ]

    return { categories }
}

// export default {useProducts};