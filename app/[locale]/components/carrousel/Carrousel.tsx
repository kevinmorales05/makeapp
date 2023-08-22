'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton,
} from './EmblaCarouselArrowsDotsButtons'
import imageByIndex from './imageByIndex'
import './embla-carousel.css'
import Image from 'next/image'
import Button from '../Button'
import { useTranslations } from 'next-intl'
import { OPTIONS_CAROUSEL } from '@/app/constants/constants'




type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}



const EmblaCarousel: React.FC = () => {



  // const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS_CAROUSEL)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const t = useTranslations("carousel")

  const SLIDE_COUNT = parseFloat(t("slide_count"));
  console.log("SLIDE_COUNT", SLIDE_COUNT)
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])


  const images = [
    {
      url: "https://beshop-demo.vercel.app/assets/img/insta-photo6.jpg",
      header: parseFloat(t("title")),
      paragraph: t("")
    },

  ];



  return (
    <section className="sandbox__carousel">
      <div className="embla mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {SLIDES.map((index) => (
              <div className="embla__slide justify-center items-start " key={index}>
                <div className="embla__slide__number">
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
                        <Button label="Read more" onClick={() => { }} className='group-hover:scale-105 transition'/>
                      </div>
                    </div>

                  </div>

                  <div className="hidden sm:basis-2/5 sm:flex">
                    <Image
                      fill={true}
                      src={imageByIndex(index)}
                      alt="Your alt text" className="object-cover !relative"

                    />
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="embla__buttons scale-[1.14] sm:scale-[1.04]">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>

    </section>
  )
}

export default EmblaCarousel
