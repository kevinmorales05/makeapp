import { motion } from "framer-motion"

import React, {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from 'react'

import Autoplay from 'embla-carousel-autoplay'


import useEmblaCarousel, {
    EmblaOptionsType,
    EmblaCarouselType
} from 'embla-carousel-react'

import imageByIndex from './imageByIndex'

import './embla-carousel.css'
import { Button, Divider, cn } from '@nextui-org/react'
import { AiOutlineApple } from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import { BiSolidArrowToRight } from 'react-icons/bi'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import Heading from "../Heading"
import DividerCarousel from "./DividerCarousel"

type UsePrevNextButtonsType = {
    prevBtnDisabled: boolean
    nextBtnDisabled: boolean
    onPrevButtonClick: () => void
    onNextButtonClick: () => void
}

export const usePrevNextButtons = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev()
        if (onButtonClick) onButtonClick(emblaApi)
    }, [emblaApi, onButtonClick])

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext()
        if (onButtonClick) onButtonClick(emblaApi)
    }, [emblaApi, onButtonClick])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect(emblaApi)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    }
}

type PropType = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const PrevButton: React.FC<PropType> = (props) => {
    const { onClick, disabled } = props

    return (
        <motion.button
            className="embla__button"
            type="button"
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <RiArrowLeftSLine size={"2rem"} />

        </motion.button>
    )
}

export const NextButton: React.FC<PropType> = (props) => {
    const { onClick, disabled } = props

    return (
        <motion.button
            className="embla__button"
            type="button"
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <RiArrowRightSLine size={"2rem"} />
        </motion.button>
    )
}


type UseDotButtonType = {
    selectedIndex: number
    scrollSnaps: number[]
    onDotButtonClick: (index: number) => void
}

export const useDotButton = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return
            emblaApi.scrollTo(index)
            if (onButtonClick) onButtonClick(emblaApi)
        },
        [emblaApi, onButtonClick]
    )

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList())
    }, [])

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onInit(emblaApi)
        onSelect(emblaApi)
        emblaApi.on('reInit', onInit)
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onInit, onSelect])

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick
    }
}

type PropTypeDotButton = PropsWithChildren<
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >
>

export const DotButton: React.FC<PropTypeDotButton> = (props) => {
    const { key, onClick, className } = props

    return (
        <motion.button
            key={key}
            onClick={onClick}
            className={cn(className,)}
            whileHover={{ scale: 1.1, width: "2.5rem" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            type="button"
        />
    )
}
// {/* </motion.button> */}
// {/* {children} */}


const OPTIONS: EmblaOptionsType = { align: 'start', loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const EmblaCarousel: React.FC<PropType> = (props) => {
    const slides = SLIDES
    const options = OPTIONS
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

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
        <div className="embla theme-mix">
            <DividerCarousel title="List of products you shopping!" />
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className={cn("embla__slide", "!shrink-0 !grow-0 !basis-1/3")} key={index}>
                            <img
                                className="embla__slide__img"
                                src={imageByIndex(index)}
                                alt="Your alt text"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__buttons">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>

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
        </div>
    )
}

export default EmblaCarousel