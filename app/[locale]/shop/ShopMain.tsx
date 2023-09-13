'use client'

import React, { useEffect, useState } from 'react'
import { IProductFormatted, useProducts } from '../hooks/useProducts';
import { Card, Chip, Pagination } from '@nextui-org/react';
import { useRouter } from 'next-intl/client';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import HeartButton from '../components/buttons/HeartButton';

import { motion } from "framer-motion"
import { PRODUCTS_PEER_PAGE, getColorProduct } from '../constants/client_constants';
import Image from 'next/image';
import { SafeUser } from '../types';
import { useFavoriteStore } from '../hooks/useFavorite';
import qs from 'query-string';
import { MdSell } from 'react-icons/md';
import { IoColorPalette } from 'react-icons/io5';
import { AiFillDropboxCircle } from 'react-icons/ai';
import { TbPigMoney } from 'react-icons/tb';
import CartButton from '../components/buttons/CartButton';
import Button from '../components/buttons/Button';


interface IShopProps {
  id: number;
  title: string
  description: string
  category: string
  subCategory: string
  cost: number
  promoCost: number
  bestSeller: boolean
  kit: boolean
  weight: string
  farmacState: string
  presentation: string
  color: string
  src: string
}
type ShopMainProps = {
  data: IProductFormatted[],
  currentUser?: SafeUser | null,
  params: {
    category: string,
    subCategory: string,
    skip: number,
    limit: number,
    totalCount: number
  }
}

export default function ShopMain({ data, currentUser, params }: ShopMainProps) {

  const { mergeLocalandDB, currentFavorites } = useFavoriteStore()

  const { getByPagination } = useProducts();
  const [products, setProducts] = useState<IShopProps[]>(getByPagination(0, PRODUCTS_PEER_PAGE, data));
  const locale = useLocale()
  const router = useRouter()
  const format = useFormatter();
  const t = useTranslations()
  const [currentPage, setCurrentPage] = useState(1);

  const refMerge = React.useRef<number>(0);

  useEffect(() => {
    if (refMerge?.current === 0 && currentUser) {
      mergeLocalandDB(currentUser, currentFavorites(), locale)
      refMerge.current++;
    }
  }, [currentUser])


  useEffect(() => {
    if (params.skip !== 0) {
      const _currentPage = Math.ceil((params.skip + 1) / params.limit)
      setCurrentPage(_currentPage)
    }
  }, [])


  useEffect(() => {
    setProducts(getByPagination(0, PRODUCTS_PEER_PAGE, data))
  }, [data])

  const handlePagination = (page: number) => {
    setCurrentPage(page);

    const from = (page - 1) * params.limit;
    const to = (page - 1) * params.limit + params.limit;
    // const filteredProducts = getByPagination(from, to, data)
    // setProducts(filteredProducts)

    let currentQuery = {
      category: params.category,
      subCategory: params.subCategory,
      skip: from,
    }

    const url = qs.stringifyUrl({
      url: '/shop/',
      query: currentQuery
    }, { skipNull: true });

    router.push(url);
  }



  return (
    <div className='w-full flex flex-col gap-8'>
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2 
          lg:grid-cols-3
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-4
          md:gap-6
          xl:gap-8
        "
      >
        {products.length > 0 && products.map(item => {
          let color = ''
          if (item.color.split(" ").length > 1) {
            color = `${item.color.split(' ').join('_')}`
          } else {
            if (item.color.split("/").length > 1) {
              color = `${item.color.split('/').join('__')}`
            } else {
              color = item.color
            }
          }
          const colorSpecific = t('products.colors', { spec: color })
          return (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileDrag={{ scale: 0.95 }}
              key={item.title
              } className="flex flex-col justify-between col-span-1 gap-2 rounded-lg border shadow p-4" >
              <div className="flex flex-col gap-2 w-full bg-transparent relative">
                <div className="overflow-visible p-0">

                  <div
                    className="flex flex-col gap-2 w-full">
                    <Card onPress={() => {
                      router.push(`/shop/${item.id}`, { locale })
                    }} isPressable shadow="none" radius="none" className="aspect-square w-full relative overflow-hidden rounded-xl group ">
                      <Image
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover h-full w-full group-hover:scale-108 transition px-1"
                        src={item.src}
                        alt="Listing"
                      />
                    </Card>
                    <div className="flex justify-start gap-3 items-center text-lg font-semibold">

                      {format.number(item.promoCost, {
                        style: 'currency', currency: 'USD'
                      })}

                      {item.promoCost < item.cost && <div className="font-light text-sm	 line-through text-neutral-500">{format.number(item.cost, {
                        style: 'currency', currency: 'USD'
                      })}</div>}
                    </div>

                    <p className="font-semibold">{item.title}</p>
                    <div className='flex flex-wrap gap-1 '>

                      {/* promoCost < cost */}
                      {item.promoCost < item.cost &&
                        <Chip
                          startContent={<TbPigMoney size={18} />}
                          variant="faded"
                          color="warning"
                        >
                          {t("products.promo")}
                        </Chip>
                      }

                      {/* best seller */}
                      {item.bestSeller &&
                        <Chip
                          startContent={<MdSell size={18} />}
                          variant="faded"
                          color="warning"
                        >
                          {t("products.bestSeller")}
                        </Chip>
                      }

                      {/* kit */}

                      {item.kit &&
                        <Chip
                          startContent={<AiFillDropboxCircle size={18} />}
                          variant="faded"
                          // color="danger"
                          classNames={{ base: "text-primary-red" }}
                        >
                          {t("products.kit")}
                        </Chip>
                      }

                      {/* color */}
                      {item.color !== "null" &&
                        <Chip
                          startContent={<IoColorPalette size={18} />}
                          variant="faded"
                          classNames={{ base: getColorProduct(item.color) }}
                        >
                          {colorSpecific}
                        </Chip>
                      }
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <HeartButton
                    listing={item}
                    currentUser={currentUser}
                  />
                </div>
              </div>
              <Button
                label={t("shoppage.main.actionButton")}
                onClick={() =>
                  router.push(`/shop/${item.id}`, { locale })
                }
                small
              />
            </motion.div>
          )
        })}
      </div >
      <div className='flex justify-center items-center -2' >
        <Pagination key={"lg"}
          page={currentPage}
          size='lg'
          total={Math.ceil(params.totalCount / PRODUCTS_PEER_PAGE)}
          onChange={(number) => handlePagination(number)}
          showControls
          color='primary'
        />
      </div>
    </div>
  )
}
export const CheckIcon = ({
  size,
  height,
  width,
  ...props
}: any) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z" fill="currentColor" />
    </svg>
  );
};

export const NotificationIcon = ({ size, height, width, ...props }: any) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill='currentColor'
        fillRule="evenodd"
      />
    </svg>
  );
};