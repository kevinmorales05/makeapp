'use client'

import React, { useEffect, useState } from "react";

import { Tabs, Tab, Image, Chip, Card, Button, Avatar, Badge, Tooltip } from "@nextui-org/react";
import { AnimationTab } from "../shop/[shopId]/AnimationTab";
import { DELIVERY_MODE, ORDER_STATUS } from "../constants/server_constants";
import { MdCancelScheduleSend, MdOutlinePendingActions } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { useTranslations } from "next-intl";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaTruckLoading } from "react-icons/fa";
import Heading from "../components/Heading";
import { Order } from "../types";
import image_product from '@/public/mocking/creams.jpg'
import EmptyState from "../components/EmptyState";
import { format } from 'date-fns';
import OrderDetail from "./OrderDetail";

type Contact = {
    email: string;
    phone: string;
    last_name: string;
    first_name: string;
};

type Item = {
    id: number;
    kit: boolean;
    src: string;
    cost: number;
    color: string;
    title: string;
    weight: string;
    category: string;
    quantity: number;
    promoCost: number;
    bestSeller: boolean;
    description: string;
    farmacState: string;
    subCategory: string;
    presentation: string;
};

export type DetailOrder = {
    id: number;
    hasUser: boolean;
    userId: string | null;
    contact: Contact;
    deliveryMethods: string;
    deliveryShip: Record<string, any>;
    deliveryPickup: string | null;
    items: Item[];
    orderNumber: string;
    orderStatus: string;
    orderTotal: number;
    changeHistory: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
};

type OrdersProps = {
    orders: Order[] | null
}

const columns = [
    { icon: MdOutlinePendingActions, uid: ORDER_STATUS.PENDING, iconChip: "bg-yellow-500 text-gray-800" },
    { icon: FaTruckLoading, uid: ORDER_STATUS.PROCESSING, iconChip: "bg-blue-500 text-white" },
    { icon: TbTruckDelivery, uid: ORDER_STATUS.DELIVERED, iconChip: "bg-green-500 text-white" },
    { icon: MdCancelScheduleSend, uid: ORDER_STATUS.CANCELED, iconChip: "bg-red-500 text-white" },
]

export default function ClientOrders({ orders }: OrdersProps) {
    const t = useTranslations("orderpage")

    const [activeTab, setActiveTab] = useState(ORDER_STATUS.PENDING);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    const filterOrdersByTab = (tab: string) => {
        console.log(tab);
        const filtered = orders ? orders.filter((order) => order.orderStatus === tab) : [];
        setFilteredOrders(filtered);
    };

    useEffect(() => {
        filterOrdersByTab(activeTab);
    }, [activeTab]);

    const [showDetail, setShowDetail] = useState(false)
    const [detailOrder, setDetailOrder] = useState<DetailOrder>()


    function showRightSide(order: Order) {
        const contact: Contact = (order.contact as Contact) || {
            email: "",
            phone: "",
            last_name: "",
            first_name: "",
        };
        const items: Item[] = (order.items as Item[]) || [];
        const deliveryShip: Record<string, any> = (order.deliveryShip as Record<string, any>) || {};
        const changeHistory: Record<string, any> | null = (order.changeHistory as Record<string, any> | null) || null;

        const _detailOrder: DetailOrder = {
            ...order,
            contact,
            items,
            deliveryShip,
            changeHistory,
        };

        setShowDetail(() => true);
        setDetailOrder(_detailOrder);
    }

    return (
        <>
            {orders && orders.length > 0 ?
                <>
                    <Heading
                        title={t("heading.title")}
                        subtitle={t("heading.subtitle")}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 py-8">
                        <div>
                            <Tabs aria-label="Options" color="primary" variant="underlined" disabledKeys={[ORDER_STATUS.CANCELED]}
                                onSelectionChange={(e: any) => setActiveTab(e)}>
                                {columns.map(({ uid, icon: Icon, iconChip }) => (
                                    <Tab
                                        key={uid}
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <Icon size={"24px"} />
                                                <span>{t("tabs", { tab: uid })}</span>
                                            </div>
                                        }

                                    >

                                        <AnimationTab key={uid} id={uid} className="!justify-start flex-col gap-2">
                                            {filteredOrders.length > 0 ?
                                                filteredOrders.map(order =>
                                                    <Card key={order.id} shadow="none" isPressable onPress={() => showRightSide(order)} className="flex flex-row max-w-md w-full items-center justify-between p-4 gap-3 bg-neutral-100 rounded-lg">
                                                        <div className="flex flex-row gap-2">
                                                            <Image
                                                                shadow="sm"
                                                                radius="lg"
                                                                height="90px"
                                                                width="90px"
                                                                // @ts-ignore
                                                                alt={`Make App ${order.items[0]?.title}`}
                                                                className="object-cover w-full h-full"
                                                                // @ts-ignore
                                                                src={order.items && Array.isArray(order.items) ? order.items[0]?.src : image_product.src}
                                                            />
                                                        </div>
                                                        <div className="w-full flex flex-col justify-center text-start  gap-2">
                                                            <div className="flex justify-between">
                                                                <p className="font-medium">{t("delivery_method", { method: order.deliveryMethods })}</p>
                                                                <p className="font-medium">{format(order.createdAt, "dd-MMM h:mma")}</p>
                                                            </div>

                                                            <div className="flex justify-between">
                                                                <p className="font-medium flex">{t("total")}<span className="text-neutral-500"> {` $${order.orderTotal}`}
                                                                </span> </p>
                                                                <Chip
                                                                    startContent={<Icon size={18} />}
                                                                    variant="shadow"
                                                                    className={iconChip}
                                                                >
                                                                    {t("tabs", { tab: order.orderStatus })}
                                                                </Chip>
                                                            </div>
                                                        </div>

                                                    </Card>
                                                ) : <Heading
                                                    title={t("empty_tab.title")}
                                                    subtitle={t("empty_tab.subtitle")}
                                                    center
                                                />}

                                        </AnimationTab>

                                    </Tab>))}
                            </Tabs>
                        </div>

                        {showDetail && detailOrder && typeof detailOrder !== "undefined" &&
                            <OrderDetail
                                detailOrder={detailOrder}
                                setShowDetail={setShowDetail}

                            />
                        }

                    </div >
                </>
                :
                <EmptyState
                    title={t("heading.title")}
                    subtitle={t("heading.empty.subtitle")}
                />
            }

        </>

    );
}


