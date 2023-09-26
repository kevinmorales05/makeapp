import React from 'react'
import { AnimationTab } from '../shop/[shopId]/AnimationTab'
import { Avatar, Badge, Button, Card, Tooltip } from '@nextui-org/react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { DetailOrder } from './ClientOrders'
import { format } from 'date-fns';
import { DELIVERY_MODE } from '../constants/server_constants'
import { useTranslations } from 'next-intl'

type Props = {
    detailOrder: DetailOrder,
    setShowDetail: React.Dispatch<React.SetStateAction<boolean>>

}

const OrderDetail = ({ detailOrder, setShowDetail }: Props) => {
    const t = useTranslations("orderpage")

    return (
        <AnimationTab key={"uid"} id={"uid"} className="!justify-start flex flex-col max-w-lg w-full gap-4">
            <div className="flex justify-end">
                <Tooltip
                    key={"close_btn"}
                    placement="bottom"
                    content={t("details.btn_close")}>
                    <Button onPress={() => setShowDetail(() => false)} isIconOnly variant="bordered" > <AiOutlineCloseCircle size={24} /></Button>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("details.detail_order.title")}</p>
                <p className="text-neutral-500">{t("details.detail_order.code")} {detailOrder.orderNumber}</p>
                <p className="text-neutral-500">{t("details.detail_order.date")} {format(detailOrder.createdAt, "dd-MMM h:mma")}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-semibold flex justify-between"><span>{t("details.description.title")}</span><span>{t("details.description.total")}</span></p>

                <p className="text-neutral-500 flex justify-between"><span>{t("delivery_method", { method: detailOrder.deliveryMethods })}</span><span>$ {detailOrder.orderTotal}</span></p>
                {detailOrder.deliveryMethods === DELIVERY_MODE.PICKUP &&
                    <p className="text-neutral-500">{detailOrder.deliveryPickup}</p>
                }
                {detailOrder.deliveryMethods === DELIVERY_MODE.SHIP &&
                    <p className="text-neutral-500 w-full max-w-sm">{Object.values(detailOrder.deliveryShip).join(', ')}</p>
                }
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("details.contact.title")}</p>
                <p className="text-neutral-500">{t("details.contact.email")} {detailOrder?.contact?.email}</p>
                <p className="text-neutral-500">{t("details.contact.phone")} {detailOrder?.contact?.phone}</p>
                <p className="text-neutral-500">{t("details.contact.full_name")} {detailOrder.contact.first_name} {detailOrder.contact.last_name}</p>
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-semibold">{t("details.items.title")}</p>
                <div className="flex flex-col gap-2">
                    {detailOrder.items.length > 0 && detailOrder && detailOrder.items.map(item => (
                        <Card key={item.title} shadow="none" className="flex flex-row max-w-md w-full items-center justify-between p-4 gap-3 
                                                        border-1 border-gray-300
                                                        "
                        >
                            <div className="flex flex-row gap-2">
                                <Badge content={item.quantity} color="primary">
                                    <Avatar
                                        radius="md"
                                        size="lg"
                                        src={item.src}
                                        alt={`Make App ${item.title}`}
                                    />
                                </Badge>
                            </div>
                            <div className="w-full flex justify-between gap-2">
                                <div className="w-full flex flex-col justify-between items-start">
                                    <p className="font-medium">{item.title} </p>
                                    <div className="text-neutral-500 flex justify-between w-full">
                                        <span>
                                            {`$ ${item.promoCost}`}
                                        </span>
                                        <span className="font-medium">{`$ ${item.promoCost * item.quantity}`}</span></div>
                                </div>
                            </div>
                        </Card>)
                    )}
                </div>
                <div className="max-w-md w-full flex justify-end mt-8 gap-8">
                    <span className="font-semibold">{t("details.items.total")}</span>
                    <span className="font-medium">$ {detailOrder.orderTotal}</span>
                </div>
            </div>
        </AnimationTab>
    )
}

export default OrderDetail