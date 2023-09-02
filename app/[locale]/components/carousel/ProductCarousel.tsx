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
import { Button, cn } from '@nextui-org/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { RiShoppingBasketLine } from "react-icons/ri"
import DividerCarousel from "./DividerCarousel"
import { DotButton, NextButton, PrevButton, PropType, useDotButton, usePrevNextButtons } from "./ButtonsCarousel"

import Autoplay from 'embla-carousel-autoplay'


interface ProductCarouselProps {
    title?: string,
    dots?: boolean,
    autoPlayProp?: boolean,
}
const OPTIONS: EmblaOptionsType = { align: 'start', loop: true, }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const ProductCarousel
    // : React.FC<PropType>
    = (props: ProductCarouselProps) => {
        const { title, dots, autoPlayProp } = props

        const slides = SLIDES
        const options = OPTIONS
        const [emblaRef, emblaApi] = useEmblaCarousel(options,
            [Autoplay()]
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

        return (
            <div className="embla theme-mix mt-8 lg:mt-10">
                <DividerCarousel title={title ? title.toLocaleUpperCase() : ""} />
                <div className="relative">
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {slides.map((index) => (
                                <div className={cn("embla__slide", "!shrink-0 !grow-0", "!basis-full sm:!basis-1/2 md:!basis-1/3 xl:!basis-1/5 relative")} key={index}>
                                    <div className="sm:h-[435px] w-full relative group">
                                        <img
                                            src={imageByIndex(index)}
                                            alt="Your alt text"
                                            className="w-full h-auto transition-transform transform scale-100 group-hover:scale-102"
                                        />
                                        <div onClick={() => alert("send this product")} className="flex flex-col gap-8 lg:gap-14 opacity-0 absolute top-0 left-0 w-full h-full transition-opacity bg-[#222] bg-opacity-10 p-30 flex items-center justify-center opacity-0 transition-all duration-300 ease-linear group-hover:opacity-100 cursor-pointer">
                                            <BsSearch className="text-white/90 h-[250px] w-full flex justify-center items-center opacity-100 z-400 p-20 md:py-10 xl:py-0" />
                                            <div className="flex gap-8">
                                                <Button onPress={() => alert("send this favorite")} isIconOnly radius="full" className="w-16 h-16 md:w-14 md:h-14 shadow-md text-white cursor-pointer transition-all duration-300 ease-linear group-hover:text-white bg-red-dark hover:opacity-80 transition-opacity">
                                                    {false ? <AiFillHeart className="w-8 h-8 md:w-6 md:h-6 text-white" /> : <AiOutlineHeart className="w-8 h-8 md:w-6 md:h-6 text-white" />}

                                                </Button>
                                                <Button onPress={() => alert("send this cart")} isIconOnly radius="full" className="w-16 h-16 md:w-14 md:h-14 relative shadow-md text-[#222] cursor-pointer transition-all duration-300 ease-linear group-hover:text-black bg-white hover:opacity-80 transition-opacity">
                                                    <RiShoppingBasketLine className="w-8 h-8 md:w-6 md:h-6 text-[#222]" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <p onClick={() => alert("send this category")} className="cursor-pointer hover:text-black/80">Mascarillas</p>
                                        <p onClick={() => alert("send this product")} className="font-bold cursor-pointer hover:text-black/80">SKEDERM PEPTIDE LIFTING BAND {"(1 UNIDAD)"}</p>
                                        <div className="flex-grow border-t border-neutral-500"></div>
                                        <div className="flex justify-between gap-6 items-end">
                                            <p className="text-base border-neutral-500">25,80€</p>
                                            <p className="line-through text-lg font-semibold">22,80€</p>
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