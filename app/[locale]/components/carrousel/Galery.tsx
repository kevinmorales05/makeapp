'use client'

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import "./next.css";

const images = [
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo6.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/insta-photo1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/info-item-img2.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img3.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
    { url: "https://beshop-demo.vercel.app/assets/img/top-categories-img1.jpg", header: "New Korean Philosophy and its beauty traditional habits to keep young and shining.", paragraph: "Koreans gave many importance to beauty ritual habit every morning and night to care their face and skin. Over there put a set of products following a strict order to keep more younger. In that daily routine has never forget putting a double clean about on their eyes through serum, hydrant and solar cream. South Korean keeps trends and innovations. Applying about many technology packs with high ingredients specialized to care the skin without use con-servants and anti age peptides inside of their formula." },
];

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const Galery = () => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    // src={images[imageIndex].url}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    // className="aspect-[3/2] object-cover "
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            paginate(-1);
                        }
                    }}
                >
                    <div className="grid grid-flow-row-dense grid-cols-3 transition-all bg-slate-600 h-[34rem] w-full">
                        <div className="col-span-2 px-10">
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, deleniti dolores! Perferendis culpa at excepturi maxime, earum error a, molestias illum ipsum ullam exercitationem maiores ratione! Magni placeat ipsum vero.</p>
                            <button>CLICK BUTTON</button>
                        </div>

                        <img src={images[imageIndex].url} alt="exactly" draggable="false" className=" relative w-full h-full" />
                    </div>
                    {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi magni, aperiam quis nobis quasi cumque, commodi corrupti nesciunt assumenda, illum earum atque pariatur voluptas. Velit corrupti nemo non facilis quas?</p>
                        
                        <img src={images[imageIndex].url} alt="some text" /> */}
                </motion.div>
                
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
        </>
    );
};

export default Galery;