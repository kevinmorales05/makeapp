// only works in server side
export const getPriceApp = (price: number): number => {
    const p_wones = Number(process.env.P_WONES as string);
    const p_sum_const = Number(process.env.P_SUM_CONSTANT as string);
    const p_mult_const = Number(process.env.P_MULT_CONSTANT?.replace(',', '.') as string);

    const finalPrice = ((price / p_wones) * p_mult_const) + p_sum_const;
    const roundedFinalPrice = Number(finalPrice.toFixed(2));
    // console.log("in", price, "out", roundedFinalPrice)
    return roundedFinalPrice;
}

export enum SERVER_LOCALES {
    ES = "es",
    EN = "en",
    KO = "ko",
}

export enum ORDER_STATUS {
    PENDING = 'PENDING', // Pedido pendiente de procesamiento
    PROCESSING = 'PROCESSING', // Pedido en proceso de preparación/envío
    DELIVERED = 'DELIVERED', // Pedido entregado
    CANCELED = 'CANCELED', // Pedido cancelado por el usuario o administrador
    SHIPPED = 'SHIPPED', // Pedido enviado
    REFUNDED = 'REFUNDED', // Pedido reembolsado
    COMPLETED = 'COMPLETED' // Pedido completado exitosamente
}

export enum DELIVERY_MODE {
    PICKUP = "PICKUP",
    SHIP = "SHIP",
  }