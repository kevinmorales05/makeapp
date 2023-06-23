"use client";

import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const images = [
  { url: "https://picsum.photos/seed/a/1600/900", title: "picsum 1" },
  { url: "https://picsum.photos/seed/b/1920/1080", title: "picsum 2" },
  { url: "https://picsum.photos/seed/c/1366/768", title: "picsum 3" },
  { url: "https://picsum.photos/seed/a/1600/900", title: "picsum 4" },
  { url: "https://picsum.photos/seed/b/1920/1080", title: "picsum 5" },
  { url: "https://picsum.photos/seed/c/1366/768", title: "picsum 6" },
];
export default function Carousels() {
  return (
    <div className="flex flex-items justify-center flex-col">
      <div>
        <TransformWrapper>
          <TransformComponent>
            <img src={images[0].url} alt="test" />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <br />
      <div>
        <Carousel
          autoPlay
          emulateTouch={true}
          onClickThumb={(index) => console.log("was index", index)}
          className="flex"
          showThumbs={true}
          renderThumbs={() =>
            images.map(({ url, title }, index) => (
              <div className="overe-there">
                <img key={index} src={url} alt={title} />
              </div>
            ))
          }
          
        >
            {images.map(({ url, title }, index) => (
                    <img
                      src={url}
                      alt={title}
                      className="group-hover:scale-110 transition             
                    object-cover 
                    h-full 
                    w-full "
                    />
            ))}
        </Carousel>
      </div>
    </div>
  );
}
{
  /* <TransformWrapper key={index}>
<TransformComponent>
  <img src={url} alt={title} />
</TransformComponent>
</TransformWrapper> */
}
