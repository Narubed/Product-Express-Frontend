import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import OwlCarousel from "~/components/features/owl-carousel";
import Link from "next/link";

import { instagramSlider } from "~/utils/data/carousel";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import banner1 from "~/public/images/pages/banner/footer/รูป2-png-01.png";
import banner2 from "~/public/images/pages/banner/footer/รูป2-png-02.png";
import banner3 from "~/public/images/pages/banner/footer/รูป2-png-03.png";
import banner4 from "~/public/images/pages/banner/footer/รูป2-png-04.png";
import banner5 from "~/public/images/pages/banner/footer/รูป2-png-05.png";
import banner6 from "~/public/images/pages/banner/footer/รูป2-png-06.png";

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
              src={banner1.src}
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
              src={banner2.src}
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
              src={banner3.src}
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
              src={banner4.src}
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
              src={banner5.src}
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
              src={banner6.src}
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

export default InstagramSection;
