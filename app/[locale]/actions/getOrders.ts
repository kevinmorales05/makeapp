import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb";

export default async function getOrders() {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return null;
    }
    const orders = await prisma.checkout.findMany({
        where: {
            userId: currentUser.id,
            hasUser: currentUser && true
        }
    })
    return orders
}