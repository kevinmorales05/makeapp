import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
// import dynamic from "next/dynamic";
import { formattedProductById, formattedProducts } from "@/app/hooks/useProducts";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeProducts } from "@/app/types";
import ShopClient from "./ShopClient";

interface IPageProps {
    locale: string
    shopId: string
}

// const DynamicShopClient = dynamic(() => import("./ShopClient"),
//     {
//         ssr: false,
//         loading: () => <div>Loading...</div>
//     }
// )
export const dynamic = "force-dynamic";


async function pageShop({ params }: { params: IPageProps }) {
    const { locale, shopId } = params

    const product: SafeProducts | null = await getProductById(shopId);
    const currentUser = await getCurrentUser();

    return (
            <ShopClient product={formattedProductById(product)} locale={locale} currentUser={currentUser} />
    )
}

export default pageShop