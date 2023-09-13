// useful command to run this
// npm i - D tsx.
// in package.json prisma.seed: tsx prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import products from "../public/data/productsKorean.json";
import { FormattedProduct, Product } from './helpers/productTypes';
const prisma = new PrismaClient()


const formattedProductsToDB: FormattedProduct[] = products.map((p) => ({
    title: p.title,
    description: p.description,
    imageSrc: p.imgUrl,
    cost: parseFloat(p.cost),
    promoCost: "promoCost" in p ? parseFloat(p.promoCost) : 12344321,
    bestSeller: p.bestSeller === "1" ? true : false,
    kit: p.kit === "1" ? true : false,
    weight: p.weight,
    farmacState: p.farmacState,
    presentation: p.presentation,
    category: p.category.toLowerCase(),
    subCategory: p.subcategory.toLowerCase(),
    color: p.color,
    createdAt: new Date(),
    updatedAt: new Date(),
}))

const load = async () => {
    try {
        await prisma.product.createMany({
            data: formattedProductsToDB
        })
        console.log('🌱  Added category data')
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()
// await prisma.$queryRaw`ALTER TABLE Product AUTO_INCREMENT = 1`