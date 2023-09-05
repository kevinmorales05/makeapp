import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Radio, RadioGroup, ChipProps, Tooltip, Chip, User, Button, ButtonGroup, Image, cn } from "@nextui-org/react";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineRest, AiOutlineShopping } from 'react-icons/ai';
import { TbMoodEmpty, TbTruckDelivery } from 'react-icons/tb';
import useCheckoutModal from '../hooks/useCheckoutModal';
import { IProductFormatted } from '../hooks/useProducts';
import { ICartItemState, useCartStore } from '../hooks/useCart';
import { SafeUser } from '../types';
import { BsTrash3 } from 'react-icons/bs';

interface ICartProduct {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    cost: number;
    promoCost: number;
    bestSeller: boolean;
    kit: boolean;
    weight: string;
    farmacState: string;
    presentation: string;
    category: string;
    subCategory: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
}
type Props = {
    data: ICartItemState[],
    currentUser?: SafeUser | null;
    locale: string;
}

const columns = [
    { name: "PRODUCT", uid: "product" },
    { name: "COUNT", uid: "count" },
    { name: "UNIT PRICE", uid: "unit_price" },
    { name: "TOTAL", uid: "total" },
];

// type Cart = typeof data[0];


const TableCart = (props: Props) => {

    const checkoutModal = useCheckoutModal();

    const { incrementCart, decrementCart, removeCart } = useCartStore()

    const { data, currentUser, locale } = props;
    const dataParse = data.map(it => {
        return {
            id: it.id,
            src: it.src,
            product: it.title,
            unit_price: it.cost,
            count: it.quantity,
            total: it.cost * it.quantity,
        }
    }) as any[]

    type Cart = typeof dataParse[0];

    const renderCell = React.useCallback((cart: Cart, columnKey: React.Key) => {
        const cellValue = cart["product" as keyof Cart];
        const idValue = cart["id" as keyof Cart];

        switch (columnKey) {
            case "product":
                return (
                    <div className='flex justify-start items-start md:items-center gap-2 md:gap-5 flex-col md:flex-row '>
                        <Image
                            isBlurred
                            width={100}
                            src={cart.src}
                            alt="NextUI Album Cover"
                            className='border-2 rounded-xl border-neutral-400'
                        />
                        <span className='font-bold truncate'>
                            {cart.product.toUpperCase()}
                        </span>
                    </div>
                );
            case "count":
                return (
                    <div className="flex flex-col justify-center items-center">
                        <ButtonGroup>
                            <Tooltip content="Minus" closeDelay={200}>
                                <Button isIconOnly aria-label="remove" className='bg-white border border-r-0 border-neutral-500' onPress={() => handlerMinus(idValue)}>
                                    <AiOutlineMinus />
                                </Button>
                            </Tooltip>
                            <Button disabled isIconOnly aria-label="count" className='bg-white border border-x-0 border-neutral-500'>
                                {cart.count}
                            </Button>
                            <Tooltip content="Plus" closeDelay={200}>
                                <Button isIconOnly aria-label="add" className='bg-white border border-l-0 border-neutral-500' onPress={() => handlerPlus(idValue)}>
                                    <AiOutlinePlus />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button startContent={<BsTrash3/>} aria-label="delete" className='bg-white underline decoration-1' disableAnimation onPress={() => handlerRemove(idValue)}>
                                Delete
                            </Button>
                        </ButtonGroup>

                    </div>
                );
            case "unit_price":
                return (
                    <p className='text-start lg:text-center'>
                        $ {cart.unit_price}
                    </p>
                );
            case "total":
                return (
                    <p className="text-start lg:text-center break-keep">
                        $ {cart.total}
                    </p>
                );
            default:
                return cellValue;
        }
    }, []);

    const handlerMinus = (keyId: number) => {
        decrementCart(currentUser, keyId, locale)

    }

    const handlerPlus = (keyId: number) => {
        incrementCart(currentUser, keyId, locale)
    }

    const handlerRemove = (keyId: number) => {
        removeCart(currentUser, keyId, locale)

    }

    const total = dataParse.reduce((acc, curr) => acc + curr.total, 0)

    return (
        <div className='flex flex-col items-end'>
            <Table aria-label="Cart Make App" className='py-2'>
                <TableHeader columns={columns} className=''>
                    {(column) => (
                        <TableColumn key={column.uid} className={cn(`${column.uid === 'product' ? 'text-start' : 'text-start lg:text-center'}`,
                            column.uid === 'count' && 'text-center', 'bg-transparent text-base font-bold text-black '
                        )} >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={dataParse} emptyContent={<div className='flex justify-center items-center'>No products to display. <TbMoodEmpty /> </div>}>
                    {(item) => (
                        <TableRow key={item.id} >
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {dataParse.length !== 0 &&
                <div className='max-w-full w-full sm:max-w-lg md:max-w-md  flex justify-end flex-col items-end py-4 gap-1'>
                    <div className='flex justify-between w-full'>
                        <span>Subtotal: </span>
                        <span>$ {total}</span>
                    </div>
                    <div className='flex justify-between w-full'>
                        <span>{`Shipping :(default)`}</span>
                        <span>Free</span>
                    </div>
                    <div className='flex justify-between w-full'>
                        <span className='font-bold'>Total</span>
                        <span>$ {total}</span>
                    </div>
                    <div className='flex flex-col w-full gap-2 py-4 '>
                        <Button onPress={checkoutModal.onOpen} fullWidth color="primary" radius="none" startContent={<TbTruckDelivery />}>PROCEED TO CHECKOUT</Button>
                        <Button onPress={() => { }} fullWidth color="danger" radius="none" startContent={<AiOutlineShopping />}>CONTINUE TO SHOPPING</Button>
                    </div>
                </div>
            }

        </div>

    );
}

export default TableCart