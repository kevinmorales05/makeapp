'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ClientOnly from "../ClientOnly";
import Button from "../Button";

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
        <div className="mt-24 h-96">
            <Carousel
                autoPlay={false}
                interval={4000}
                stopOnHover={true}
                infiniteLoop={autoplay}
                showIndicators={indicators}
                showThumbs={thumbs}
                

            >
                {images.map(({ url, header }, index) => (
                    <div className="max-h-96 md:grid md:grid-cols-2 md:gap-2 bg-black/10 text-start" key={index}>
                        <div className="p-8 h-full w-full">
                            <p className="font-light font-gandhi text-4xl text-start">New Korean Philosophy and its beauty traditional habits to keep young and shining.</p>
                            <p className="font-gandhi font-medium antialiased text-ellipsis md:py-6   text-start">{"Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula.".slice(0, 110)}...</p>
                            <div className="h-24 w-24 items-start">
                                <Button label="Read more" onClick={() => { }} disabled={true} />
                            </div>

                        </div>
                        <div className="hidden md:flex">
                            <img
                                src={url}
                                alt={header + index}
                                className="group-hover:scale-110 transition             
                    object-cover 
                    h-full 
                    w-full "
                            /></div>
                    </div>

                ))}
            </Carousel>
        </div>
    )
}
