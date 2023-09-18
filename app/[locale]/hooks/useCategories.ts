'use client'
import {
    GiCeremonialMask,
    GiDelicatePerfume,
    GiHealthPotion,
    GiLips,
    GiPerfumeBottle,
    GiStarFormation,
} from 'react-icons/gi';
import { BsEmojiSunglasses, BsEyedropper } from 'react-icons/bs';
import { IoBodySharp } from 'react-icons/io5';
import { MdCleanHands, MdFace2 } from 'react-icons/md';

import { TbHandThreeFingers } from "react-icons/tb";
import { IconType } from 'react-icons';

export type SubcategoryRouteKey =
    | "all_catalog"
    | "toner"
    | "emulsion"
    | "cream"
    | "cleansing_bar"
    | "foam_cleanser"
    | "ampoule"
    | "essence"
    | "kit"
    | "balm"
    | "1_1"
    | "sun_cream"
    | "serum"
    | "mask"
    | "cosmetics_kit"
    | "lotion"
    | "cream_oil"
    | "skin_lotion"
    | "eyes"
    | "primer_make_base"
    | "fixer"
    | "lipstick"
    | "sun_stick"
    | "perfume_diffuser"
    | "cleanser"
    | "body_lotion_cream";

export type CategoryKey =
    | "all"
    | "derma_plan"
    | "nail_care"
    | "mask_pack"
    | "body_care"
    | "skin"
    | "perfume"
    | "make_up"
    | "wrinkle_solution_toner"
    | "sun_care"
    | "skin_care";


export type CategoryItem = {
    label: CategoryKey;
    icon: IconType;
};

export const useCategories = () => {
    const keysCategories: CategoryKey[] = [
        "all",
        "derma_plan",
        "nail_care",
        "mask_pack",
        "body_care",
        "skin",
        "perfume",
        "make_up",
        "wrinkle_solution_toner",
        "sun_care",
        "skin_care"
    ] as CategoryKey[];

    const allCategories: CategoryItem[] = [
        {
            label: "all",
            icon: GiStarFormation,
        },
        {
            label: "derma_plan",
            icon: GiLips,
        },
        {
            label: "skin_care",
            icon: GiPerfumeBottle,
        },
        {
            label: "sun_care",
            icon: BsEmojiSunglasses,
        },
        {
            label: "wrinkle_solution_toner",
            icon: GiHealthPotion,
        },
        {
            label: "skin",
            icon: MdCleanHands,
        },
        {
            label: "body_care",
            icon: IoBodySharp,
        },
        {
            label: "mask_pack",
            icon: GiCeremonialMask,
        },
        {
            label: "make_up",
            icon: BsEyedropper,
        },
        {
            label: "perfume",
            icon: GiDelicatePerfume,
        },
        {
            label: "nail_care",
            icon: TbHandThreeFingers,
        },
    ]
    const currentCategory = (category: string) => {
        return allCategories.filter(c => c.label === category)
    }

    function validateSubcategory(subcategory: React.ReactNode): SubcategoryRouteKey {
        const subcategoryStr = subcategory?.toString()

        switch (subcategoryStr) {
            case "all_catalog":
            case "toner":
            case "emulsion":
            case "cream":
            case "cleansing_bar":
            case "foam_cleanser":
            case "ampoule":
            case "essence":
            case "kit":
            case "balm":
            case "1_1":
            case "sun_cream":
            case "serum":
            case "mask":
            case "cosmetics_kit":
            case "lotion":
            case "cream_oil":
            case "skin_lotion":
            case "eyes":
            case "primer_make_base":
            case "fixer":
            case "lipstick":
            case "sun_stick":
            case "perfume_diffuser":
            case "cleanser":
            case "body_lotion_cream":
                return subcategoryStr as SubcategoryRouteKey;
            default:
                return "all_catalog" as SubcategoryRouteKey;
        }
    }

    return { allCategories, currentCategory, keysCategories, validateSubcategory }
}
