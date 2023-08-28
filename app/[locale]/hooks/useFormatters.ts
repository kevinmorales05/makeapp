interface IProductsFormatted {
    category: string,
    values: string[],
}


export const categoriesFormattedShop = (products: IProductsFormatted[]) => products.map(p => {

    const slashCategory = p?.category?.split(' ').join('-');
    return {
        category: slashCategory,
        values: p.values,
    }
})