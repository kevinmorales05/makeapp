import prisma from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

export default async function getCarts() {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return [];
        }

        const carts = await prisma.cart.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                product: true
            }
        });

        const safeCarts = carts.map((cart) => ({
            ...cart.product,
            createdAt: cart.product.createdAt.toString(),
            updatedAt: cart.product.createdAt.toString(),
            quantity: cart.quantity
        }));

        return safeCarts;
    } catch (error: any) {
        throw new Error(error);
    }
}
