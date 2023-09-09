export interface Product {
    title: string;
    description: string;
    category: Category;
    subcategory: string;
    cost: string;
    promoCost: string;
    bestSeller: string;
    kit: string;
    weight: string;
    farmacState: FarmacState;
    presentation: Presentation;
    color: string;
    imgUrl: string;
    urlProduct: string;
}

export enum Category {
    BodyCare = "body care",
    DermaPlan = "derma plan",
    MakeUp = "make up",
    MaskPack = "mask pack",
    NailCare = "nail care",
    Perfume = "perfume",
    Skin = "skin",
    SkinCare = "skin care",
    SunCare = "sun care",
    WrinkleSolutionToner = "wrinkle solution toner",
}

export enum FarmacState {
    G = "g",
    Gr = "gr",
    Liquid = "liquid",
    LiquidAndSolid = "liquid and solid",
    Liquuid = "liquuid",
    M = "m",
    Ml = "ml",
    Solid = "solid",
}

export enum Presentation {
    Ampoule = "ampoule",
    Bar = "bar",
    Cream = "cream",
    Emulsion = "emulsion",
    Essence = "essence",
    FoamCleanser = "foam cleanser",
    Liquid = "liquid",
    MaskSheet = "mask sheet",
    Mix = "mix",
    Sheets = "sheets",
    Solid = "solid",
    Toner = "toner",
    Tonic = "tonic",
}

export interface FormattedProduct {
    title: string;
    description: string;
    category: string;
    subCategory: string;
    cost: number;
    promoCost: number;
    bestSeller: boolean;
    kit: boolean;
    weight: string;
    farmacState: string;
    presentation: string;
    color: string;
    imageSrc: string;
    createdAt: Date;
    updatedAt: Date;
}