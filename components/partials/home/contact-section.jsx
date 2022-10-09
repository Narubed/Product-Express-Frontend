import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import OwlCarousel from "~/components/features/owl-carousel";
import Link from "next/link";

import { instagramSlider } from "~/utils/data/carousel";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function InstagramSection() {
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
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="instagram-section">
      <Carousel responsive={responsive}>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/1.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/2.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/3.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/4.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/5.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
        <figure className="instagram">
          <Link href="#">
            <LazyLoadImage
              src="https://d-themes.com/react/riode/demo-sport/images/home/instagram/6.jpg"
              alt="Instagram"
              width="280"
              height="280"
              effect="opacity"
            />
          </Link>
        </figure>
      </Carousel>
    </div>
  );
}

export default React.memo(InstagramSection);
