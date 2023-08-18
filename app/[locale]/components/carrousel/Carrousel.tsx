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


const images = [
  { url: "https://beshop-demo.vercel.app/assets/img/insta-photo6.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
  { url: "https://beshop-demo.vercel.app/assets/img/insta-photo3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
  { url: "https://beshop-demo.vercel.app/assets/img/insta-photo1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
  { url: "https://beshop-demo.vercel.app/assets/img/info-item-img2.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
  { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
  { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
];


type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {

  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

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



  return (
    <section className="sandbox__carousel">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <div className="
                    flex flex-row
                    bg-black/10 text-start
                    max-h-[830px]
                    mt-10
                    "
                  key={index}>
                  <div className="p-8 mt-8 basis-full sm:basis-3/5 group">
                    <p className="font-light font-gandhi text-4xl text-start">New Korean Philosophy and its beauty traditional habits to keep young and shining.</p>
                    <div className='mt-8'>
                      <p className="font-gandhi font-medium antialiased text-ellipsis py-6 text-start">{"Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula.".slice(0, 120)}...</p>
                      <div className="h-24 w-[8rem] items-start group-hover:scale-105 transition">
                        <Button label="Read more" onClick={() => { }} />
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

        <div className="embla__buttons">
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
