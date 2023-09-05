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
import { cn } from '@nextui-org/react'
import Button from '../buttons/Button'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { RiShoppingBasketLine } from "react-icons/ri"
import DividerCarousel from "./DividerCarousel"
import { DotButton, NextButton, PrevButton, PropType, useDotButton, usePrevNextButtons } from "./ButtonsCarousel"

import Autoplay from 'embla-carousel-autoplay'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'


interface ProductCarouselProps {
  title?: string
}

const OPTIONS: EmblaOptionsType = { align: 'start', loop: true, }
const SLIDE_COUNT = 6
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Carousel: React.FC<PropType> = (props: ProductCarouselProps) => {
  const { title } = props

  const t = useTranslations("carousel")
  const locale = useLocale();


  const slides = SLIDES
  const options = OPTIONS
  const [emblaRef, emblaApi] = useEmblaCarousel(options,
    [Autoplay()]
  )

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins()
    if (!autoplay) return
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
      <div className="relative">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {SLIDES.map((index) => (
              <div className="embla__slide justify-center items-start " key={index}>
                <div className={cn("embla__slide__number")}>
                  <span>{index + 1}</span>
                </div>
                <div className="
                    flex flex-row
                    bg-black/10 text-start
                    max-h-[830px]
                    "
                  key={index}>
                  <div className="p-8 mt-8 basis-full sm:basis-3/5">
                    <p className="font-light font-gandhi text-4xl text-start">{t("title", { data: index + 1 })}</p>
                    <div className='mt-8'>
                      <p className="font-gandhi font-medium antialiased text-ellipsis py-6 text-start">{t("subtitle", { data: index + 1 })}</p>
                      <div className="w-[8rem] items-start group">
                        <Button label={t("button", { locale })} onClick={() => { }} className='group-hover:scale-105 transition' />
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:basis-2/5 sm:flex">
                    <Image
                      fill={true}
                      src={imageByIndex(index)}
                      alt={t("title", { data: index + 1 })}
                      className="object-cover !relative"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              id={index.toString()}
              key={index.toString()}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected !w-11' : ''
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel