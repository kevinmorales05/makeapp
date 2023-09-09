import {
    GiCeremonialMask,
    GiDelicatePerfume,
    GiHealthPotion,
    GiLips,
    GiPerfumeBottle,
    GiStarFormation,
} from 'react-icons/gi';
import { BsEmojiSunglasses, BsEyedropper, BsFillBagHeartFill, BsSnow } from 'react-icons/bs';
import { IoBodySharp } from 'react-icons/io5';
import { MdCleanHands, MdFace2 } from 'react-icons/md';

import { AiOutlineHighlight } from "react-icons/ai";
import { TbHandThreeFingers } from "react-icons/tb";
import { IconType } from 'react-icons';




export type CategoryKey =
    | "all"
    | "derma-plan"
    | "nail-care"
    | "mask-pack"
    | "body-care"
    | "skin"
    | "perfume"
    | "make-up"
    | "wrinkle-solution-toner"
    | "sun-care"
    | "skin-care";

export type CategoryItem = {
    label: CategoryKey;
    icon: IconType;
};

export const useCategories = () => {

    const keysCategories: CategoryKey[] = [
        "all",
        "derma-plan",
        "nail-care",
        "mask-pack",
        "body-care",
        "skin",
        "perfume",
        "make-up",
        "wrinkle-solution-toner",
        "sun-care",
        "skin-care",

    ] as const;

    const allCategories: CategoryItem[] = [
        {
            label: "all",
            icon: GiStarFormation,
        },
        {
            label: "derma-plan",
            icon: GiLips,
        },
        {
            label: "skin-care",
            icon: GiPerfumeBottle,
        },
        {
            label: "sun-care",
            icon: BsEmojiSunglasses,
        },
        {
            label: "wrinkle-solution-toner",
            icon: GiHealthPotion,
        },

        {
            label: "skin",
            icon: MdCleanHands,
        },
        {
            label: "body-care",
            icon: IoBodySharp,
        },
        {
            label: "mask-pack",
            icon: GiCeremonialMask,
        },
        {
            label: "make-up",
            icon: BsEyedropper,
        },
        {
            label: "perfume",
            icon: GiDelicatePerfume,
        },
        {
            label: "nail-care",
            icon: TbHandThreeFingers,
        },
    ]
    return { allCategories, keysCategories }
}
