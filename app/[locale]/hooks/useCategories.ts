import {
    GiCeremonialMask,
    GiDelicatePerfume,
    GiHealthPotion,
    GiLips,
    GiPerfumeBottle,
} from 'react-icons/gi';
import { BsEmojiSunglasses, BsEyedropper, BsFillBagHeartFill, BsSnow } from 'react-icons/bs';
import { IoBodySharp } from 'react-icons/io5';
import { MdCleanHands, MdFace2 } from 'react-icons/md';

import { AiOutlineHighlight } from "react-icons/ai";
import { TbHandThreeFingers } from "react-icons/tb";
import { IconType } from 'react-icons';


export type CategoryKey =
    | "derma-plan"
    | "skin-care"
    | "sun-care"
    | "toner-skin"
    | "wrinkle-solution-toner"
    | "lotion"
    | "skin"
    | "body-care"
    | "mask-pack"
    | "make-up"
    | "all-in-one"
    | "perfume"
    | "nail-care";

export type CategoryItem = {
    label: CategoryKey;
    icon: IconType;
};

export const useCategories = () => {

    const allCategories: CategoryItem[] = [
        {
            label: "derma-plan",
            icon: GiLips,
        },
        {
            label: "skin-care",
            icon: AiOutlineHighlight,
        },
        {
            label: "sun-care",
            icon: BsEmojiSunglasses,
        },
        {
            label: "toner-skin",
            icon: MdCleanHands,
        },
        {
            label: "wrinkle-solution-toner",
            icon: GiHealthPotion,
        },
        {
            label: "lotion",
            icon: GiPerfumeBottle,
        },
        {
            label: "skin",
            icon: MdFace2,
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
            label: "all-in-one",
            icon: BsFillBagHeartFill,
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

    return { allCategories }
}
