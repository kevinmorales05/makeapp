// useful command to run this
// npm i - D tsx.
// in package.json prisma.seed: tsx prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import products from "../public/data/productsKorean.json";
const prisma = new PrismaClient()

const formattedProductsToDB = products.map((p: any) => ({
    title: p.title,
    description: p.description,
    category: p.category,
    subCategory: p.subcategory,
    cost: parseFloat(p.cost),
    promoCost: "promoCost" in p ? parseFloat(p.promoCost) : 12344321,
    bestSeller: p.bestSeller || p.bestSeller === "0" ? false : true,
    kit: p.kit || p.kit === "0" ? false : true,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    color: p.color,
    imageSrc: p.imgUrl,
    createdAt: new Date(),
    updatedAt: new Date(),
}))

const load = async () => {
    try {
        await prisma.product.createMany({
            data: formattedProductsToDB
        })
        // await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`
        console.log('Added category data')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()