'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ClientOnly from "../ClientOnly";
import Button from "../Button";
import Image from "next/image";

const images = [
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo6.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/info-item-img2.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
];

interface CarrouselInfoProps {
    thumbs: boolean,
    indicators: boolean,
    autoplay: boolean,
};

export default function CarrouselInfo({ thumbs, indicators, autoplay }: CarrouselInfoProps) {
    return (
        <div className="mt-16 max-h-[830px]">
            <Carousel
                autoPlay={false}
                interval={4000}
                stopOnHover={true}
                infiniteLoop={autoplay}
                showIndicators={indicators}
                showThumbs={thumbs}
            >
                {images.map(({ url, header }, index) => (
                    <div className="
                    flex flex-row
                    bg-black/10 text-start
                    max-h-[830px]
                    "
                        key={index}>
                        <div className="p-8 basis-full sm:basis-3/5 group">
                            <p className="font-light font-gandhi text-4xl text-start">New Korean Philosophy and its beauty traditional habits to keep young and shining.</p>
                            <p className="font-gandhi font-medium antialiased text-ellipsis py-6 text-start">{"Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula.".slice(0, 120)}...</p>
                            <div className="h-24 w-24 items-start group-hover:scale-105 transition">
                                <Button label="Read more" onClick={() => { }} disabled={true} />
                            </div>

                        </div>
                        <div className="hidden sm:basis-2/5 sm:flex">
                            <Image
                                fill={true}
                                src={url}
                                alt={header + index}
                                className="
                                object-contain
                                "
                            /></div>
                    </div>

                ))}
            </Carousel>

        </div>
    )
}
