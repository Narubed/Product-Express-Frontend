import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { brandSlider } from "~/utils/data/carousel";
import Image from "next/image";

function BrandSection() {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={responsive}>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/1.png"
          alt="brand"
          width="125"
          height="53"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/2.png"
          alt="brand"
          width="104"
          height="56"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/3.png"
          alt="brand"
          width="117"
          height="31"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/4.png"
          alt="brand"
          width="139"
          height="58"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/5.png"
          alt="brand"
          width="123"
          height="36"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/6.png"
          alt="brand"
          width="113"
          height="36"
        />
      </figure>
      <figure className="brand">
        <Image
          src="https://d-themes.com/react/riode/demo-sport/images/home/brands/7.png"
          alt="brand"
          width="144"
          height="43"
        />
      </figure>
    </Carousel>
  );
}

export default React.memo(BrandSection);
