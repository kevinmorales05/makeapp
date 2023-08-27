import getProductById from "@/app/actions/getProductById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import dynamic from "next/dynamic";
import { formattedProductById } from "@/app/hooks/useProducts";

interface IPageProps {
    locale: string
    productParams: string
}

const DynamicProductDetails = dynamic(() => import("./ProductDetail"),
    {
        ssr: true,
        loading: () => <div>Loading...</div>
    }
)

async function pageShop({ params }: { params: IPageProps }) {
    const { locale, productParams } = params

    const product = await getProductById(productParams);
    // const product = await getCurrentUser(productParams);

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
            <DynamicProductDetails product={product} locale={locale} />
        </ClientOnly>
    )
}

export default pageShop