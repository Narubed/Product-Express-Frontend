import React from "react";
import { Carousel } from "@trendyol-js/react-carousel";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
function DisCar(props) {
  return (
    <Carousel
      show={props.show}
      slide={4}
      rightArrow={false}
      leftArrow={false}
      swiping={"true"}
      useArrowKeys={"true"}
    >
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/1.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/2.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/3.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/4.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/5.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
      <figure className="instagram">
        <Link href="/">
          <LazyLoadImage
            src="https://www.d-themes.com/react/riode/demo-19/images/home/instagram/6.jpg"
            alt="instagram"
            effect="opacity; transform"
            width="auto"
            height="auto"
          />
        </Link>
      </figure>
    </Carousel>
  );
}

export default DisCar;
