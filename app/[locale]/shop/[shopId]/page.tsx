import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import dynamic from "next/dynamic";
import { formattedProductById } from "@/app/hooks/useProducts";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IPageProps {
    locale: string
    shopId: string
}

const DynamicProductDetails = dynamic(() => import("./ProductDetail"),
    {
        ssr: true,
        loading: () => <div>Loading...</div>
    }
)

async function pageShop({ params }: { params: IPageProps }) {
    const { locale, shopId } = params

    const product = await getProductById(shopId);
    const currentUser = await getCurrentUser();

    if (!product || Object.keys(product).length === 0 || JSON.stringify(product) === '{}'
    ) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }


    return (
        <ClientOnly>
            <DynamicProductDetails product={product} locale={locale} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default pageShop