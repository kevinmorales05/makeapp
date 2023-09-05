'use client'
import React, {
    useCallback,
} from 'react'

import useEmblaCarousel, {
    EmblaOptionsType,
    EmblaCarouselType
} from 'embla-carousel-react'

import imageByIndex from './imageByIndex'

import './embla-carousel.css'
import { Button, Card, cn } from '@nextui-org/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsBasket3, BsFillBasket3Fill, BsSearch } from 'react-icons/bs'
import { RiShoppingBasketLine } from "react-icons/ri"
import DividerCarousel from "./DividerCarousel"
import { DotButton, NextButton, PrevButton, PropType, useDotButton, usePrevNextButtons } from "./ButtonsCarousel"

import Autoplay from 'embla-carousel-autoplay'
import { IProductFormatted } from '@/app/hooks/useProducts'
import CarouselHeartButton from '../buttons/CarouselHeartButton '
import { SafeUser } from '@/app/types'
import CarouselCartButton from '../buttons/CarouselCartButton'
import { useLocale } from 'next-intl'
import { useRouter } from 'next-intl/client'
import { ICartItemState } from '@/app/hooks/useCart'


interface ProductCarouselProps {
    title?: string,
    dots?: boolean,
    autoPlayProp?: boolean,
    items: IProductFormatted[],
    currentUser?: SafeUser | null
}
const OPTIONS: EmblaOptionsType = { align: 'start', loop: true, }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const ProductCarousel
    // : React.FC<PropType>
    = (props: ProductCarouselProps) => {
        const { title, dots, autoPlayProp, items, currentUser } = props
        const route = useRouter()
        const locale = useLocale()

        const slides = SLIDES
        const options = OPTIONS
        const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]
        )

        const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
            const { autoplay } = emblaApi.plugins()
            if (!autoplay) return

            if (!autoPlayProp) {
                autoplay.play(false)
                autoplay.stop()
                return
            }

            if (autoplay.options.stopOnInteraction !== false) autoplay.stop()
        }, [])

        const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
            emblaApi,
            onButtonClick
        )

        const {
            prevBtnDisabled,
            nextBtnDisabled,
            onPrevButtonClick,
            onNextButtonClick
        } = usePrevNextButtons(emblaApi, onButtonClick)

        const handleMouseEnter = useCallback((emblaApi: EmblaCarouselType) => {
            const { autoplay } = emblaApi.plugins();
            autoplay?.options.stopOnMouseEnter
            autoplay?.options.stopOnInteraction
            autoplay?.stop()
        }, [])
        const handleMouseLeave = useCallback((emblaApi: EmblaCarouselType) => {
            const { autoplay } = emblaApi.plugins();
            autoplay?.options.playOnInit
            autoplay?.play()
        }, [])


        return (
            <div className="embla theme-mix mt-8 lg:mt-10">
                <DividerCarousel title={title ? title.toLocaleUpperCase() : ""} />
                <div className="relative">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {items && items.length !== 0 && items.map(item => (
                                <div className={cn("embla__slide", "!shrink-0 !grow-0", "!basis-full sm:!basis-1/2 md:!basis-1/3 xl:!basis-1/5 relative")} key={item.title}>
                                    <Card onPress={() => route.push(`/shop/${item.id}`)}
                                        onMouseEnter={() => handleMouseEnter}
                                        onMouseLeave={() => handleMouseLeave}
                                        isPressable radius='none' shadow='none' className="sm:h-[435px] w-full relative group">
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className="w-full h-auto transition-transform transform scale-100 group-hover:scale-102"
                                        />
                                        <div className="flex flex-col gap-8 lg:gap-14 opacity-0 absolute top-0 left-0 w-full h-full transition-opacity bg-[#222] bg-opacity-10 p-30 flex items-center justify-center opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100 cursor-pointer">
                                            <BsSearch className="text-white/90 h-[250px] w-full flex justify-center items-center opacity-100 z-400 p-20 md:py-10 xl:py-0" />
                                            <div className="flex gap-8">
                                                <CarouselHeartButton
                                                    listing={item}
                                                    currentUser={currentUser}
                                                />
                                                <CarouselCartButton
                                                    locale={locale}
                                                    listing={item}
                                                    currentUser={currentUser}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <p onClick={() => alert("send this category")} className="cursor-pointer hover:text-black/80">{item.category.charAt(0).toLocaleUpperCase() + item.category.slice(1)}</p>
                                        <p onClick={() => alert("send this product")} className="font-bold cursor-pointer hover:text-black/80">{item.title.toLocaleUpperCase()} {"(1 UNIDAD)"}</p>
                                        <div className="flex-grow border-t border-neutral-500"></div>
                                        <div className="flex justify-between gap-6 items-end">

                                            {/* this is only for see a discount */}
                                            {item.promoCost === item.cost && <p className="line-through text-base">$ {item.promoCost - 10}</p>}
                                            {item.promoCost !== item.cost && <p className="line-through text-base">$ {item.cost}</p>}

                                            <p className="text-lg font-semibold border-neutral-500">$ {item.promoCost}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                    </div>

                    {dots &&
                        <div className="embla__dots">
                            {scrollSnaps.map((_, index) => (
                                <DotButton
                                    key={index}
                                    onClick={() => onDotButtonClick(index)}
                                    className={'embla__dot'.concat(
                                        index === selectedIndex ? ' embla__dot--selected !w-11' : ''
                                    )}
                                />
                            ))}
                        </div>
                    }

                </div>
            </div>
        )
    }

export default ProductCarousel