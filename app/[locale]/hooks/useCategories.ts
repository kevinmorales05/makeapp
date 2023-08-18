import products from "@/public/data/productsKorean.json"
import { create } from "zustand";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiCeremonialMask,
    GiDelicatePerfume,
    GiFingernail,
    GiForestCamp,
    GiHealthPotion,
    GiIsland,
    GiLips,
    GiPerfumeBottle,
    GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsEmojiSunglasses, BsEyedropper, BsFillBagHeartFill, BsSnow } from 'react-icons/bs';
import { IoBodySharp, IoDiamond } from 'react-icons/io5';
import { MdCleanHands, MdFace2, MdFace3, MdOutlineVilla } from 'react-icons/md';

import { Products } from "../types/products";
import { useCallback, useMemo } from "react";

import { useLocale, useTranslations } from 'next-intl';


import { AiOutlineHighlight } from "react-icons/ai";
import { TbHandThreeFingers } from "react-icons/tb";

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


export const useCategories = () => {

    const cate = formattedProducts.reduce((accumulator: any, current) => {

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

    const getAll = () => {
        const t = useTranslations("navbar.categories")
        return [
            {
                label: t("derma-plan.label"),
                icon: GiLips,
                description: t("derma-plan.description"),
            },
            {
                label: t("skin-care.label"),
                icon: AiOutlineHighlight,
                description: t("skin-care.description"),
            },
            {
                label: t("sun-care.label"),
                icon: BsEmojiSunglasses,
                description: t("sun-care.description"),
            },
            {
                label: t("toner-skin.label"),
                icon: MdCleanHands,
                description: t("toner-skin.description"),
            },
            {
                label: t("wrinkle-solution-toner.label"),
                icon: GiHealthPotion,
                description: t("wrinkle-solution-toner.description"),
            },
            {
                label: t("lotion.label"),
                icon: GiPerfumeBottle,
                description: t("lotion.description"),
            },
            {
                label: t("skin.label"),
                icon: MdFace2,
                description: t("skin.description"),
            },
            {
                label: t("body-care.label"),
                icon: IoBodySharp,
                description: t("body-care.description"),
            },
            {
                label: t("mask-pack.label"),
                icon: GiCeremonialMask,
                description: t("mask-pack.description"),
            },
            {
                label: t("make-up.label"),
                icon: BsEyedropper,
                description: t("make-up.description"),
            },
            {
                label: t("all-in-one.label"),
                icon: BsFillBagHeartFill,
                description: t("all-in-one.description"),
            },
            {
                label: t("perfume.label"),
                icon: GiDelicatePerfume,
                description: t("perfume.description"),
            },
            {
                label: t("nail-care.label"),
                icon: TbHandThreeFingers,
                description: t("nail-care.description"),
            },
        ]
    }







    return { categories, getAll }
}

// export default {useProducts};