import getProductById from "@/app/actions/getProductById";
import { formattedProductById, formattedProducts } from "@/app/hooks/useProducts";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeProducts } from "@/app/types";
import ShopClient from "./ShopClient";
import { Suspense } from "react";
import Await from "@/app/await";
import Movies from "@/app/movies";
import Skeleton from "@/app/skeleton";

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
    // const product: SafeProducts | null = await getProductById(shopId);
    const currentUser = await getCurrentUser();
    return (
            <Suspense fallback={<Skeleton />}>
                <Await promise={getProductById(shopId)}>
                    {(product) => <ShopClient product={formattedProductById(product)} locale={locale} currentUser={currentUser} />}
                </Await>
            </Suspense>
    )
}

export default pageShop