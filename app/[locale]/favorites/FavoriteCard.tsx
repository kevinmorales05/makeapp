import React from 'react'
import CartButton from '../components/buttons/CartButton';
import HeartButton from '../components/buttons/HeartButton';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';
import { IProductFormatted } from '../hooks/useProducts';
import { SafeUser } from '../types';
import { IconType } from 'react-icons';
import { ICartItemState } from '../hooks/useCart';

type Props = {
    item: ICartItemState;
    currentUser?: SafeUser | null,
    locale: string,
    allCategories: {
        label: string;
        icon: IconType;
    }[],
    actionCard: () => void;

}

const FavoriteCard = (props: Props) => {
    const { item, currentUser, locale, allCategories, actionCard } = props
    return (
        <div className="flex flex-col col-span-1 gap-2 cursor-pointer group">
            <Card onPress={actionCard} isPressable shadow="none" radius="none" className="flex flex-col gap-2 w-full bg-transparent">
                <CardBody className="overflow-visible p-0">

                    <div className="flex flex-col gap-2 w-full">
                        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                            <Image
                                fill
                                className="object-cover h-full w-full group-hover:scale-110 transition"
                                src={item.src}
                                alt="Listing"
                            />
                            <div className="
          absolute
          top-3
          right-3
          ">
                                <HeartButton
                                    listing={item}
                                    currentUser={currentUser}
                                />
                            </div>
                        </div>
                        <div className="flex justify-start gap-1 items-center font-light text-neutral-500">
                            {allCategories.map(c => {
                                const cat_slash = item.category.split(' ').join('-');
                                if (cat_slash === c.label) {
                                    return <div key={c.label}>{<c.icon />}</div>
                                }

                            })}

                            <span>
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                        </div>
                        <p className="font-bold">{item.title}</p>
                        <div className="flex flex-row items-center gap-1">

                            <div className="font-semibold">
                                $ {item.promoCost}
                            </div>
                            {item.promoCost !== item.cost && <div className="font-light line-through">$ {item.cost}</div>}

                        </div>
                    </div>
                </CardBody>
            </Card>
            <div >
                <CartButton
                    locale={locale}
                    listing={item}
                    currentUser={currentUser}
                    key={item.id}
                />
            </div>
        </div>
    )
}

export default FavoriteCard