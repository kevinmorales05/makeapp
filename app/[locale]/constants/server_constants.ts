// only works in server side
export const getPriceApp = (price: number): number => {
    const p_wones = Number(process.env.P_WONES as string);
    const p_sum_const = Number(process.env.P_SUM_CONSTANT as string);
    const p_mult_const = Number(process.env.P_MULT_CONSTANT?.replace(',', '.') as string);
    
    const finalPrice = ((price / p_wones) * p_mult_const) + p_sum_const;
    const roundedFinalPrice = Number(finalPrice.toFixed(2));

    return roundedFinalPrice;
}
