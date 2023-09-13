import { EmblaOptionsType } from "embla-carousel-react";
export const PRODUCTS_PEER_PAGE = 15;

export const LOCALE_ES = 'es'
export const LOCALE_EN = 'en'
export const LOCALE_KO = 'ko'

export const ICON_CLASES_DROPDOWN: string = "text-xl text-default-500 pointer-events-none flex-shrink-0";


export const OPTIONS_CAROUSEL: EmblaOptionsType = {}

export const getColorProduct = (color: string): string => {
    switch (color.toLowerCase()) {
        case "null":
            return "text-black";
        case "green":
            return "text-green-500";
        case "pink":
            return "text-pink-500";
        case "gold":
            return "text-gold-500";
        case "white":
            return "text-white";
        case "brown":
            return "text-brown-500";
        case "red":
            return "text-red-500";
        case "white/brown":
            return "text-white bg-brown-500";
        case "blue":
            return "text-blue-500";
        case "white/blue":
            return "text-white bg-blue-500";
        case "sky blue":
            return "text-sky-500";
        case "grey":
            return "text-grey-500";
        case "yellow":
            return "text-yellow-500";
        case "orange":
            return "text-orange-500";
        case "transparent":
            return "text-black";
        case "cherry":
            return "text-cherry-500";
        case "white/green":
            return "text-white bg-green-500";
        case "olive":
            return "text-olive-500";
        case "fuchsia":
            return "text-fuchsia-500";
        case "purple":
            return "text-purple-500";
        case "silver":
            return "text-silver";
        case "white/pink":
            return "text-white bg-pink-500";
        case "white/violet":
            return "text-white bg-violet-500";
        case "white/gold":
            return "text-white bg-gold-500";
        case "black":
            return "text-black";
        case "black/white":
            return "text-black bg-white";
        case "white/black":
            return "text-white bg-black";
        case "violet":
            return "text-violet-500";
        case "cream":
            return "text-cream-500";
        case "pumpkin":
            return "text-pumpkin";
        case "indigo blue":
            return "text-indigo-500";
        case "maple red":
            return "text-maple-red-500";
        case "dusk purple":
            return "text-dusk-purple";
        case "glint pink":
            return "text-glint-pink-500";
        default:
            return "text-black";
    }
}
