import React from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
// import Custom Components
import {
  fadeIn,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
} from "~/utils/data/keyframes";

export default function componentName() {
  return (
    <div className="intro-banners gutter-sm row">
      <div className="col-lg-4 col-sm-6 mb-2">
        <Reveal
          keyframes={fadeInLeftShorter}
          delay={500}
          duration={1200}
          triggerOnce
        >
          <div className="banner banner-1 banner-fixed content-middle overlay-zoom">
            <figure>
              <LazyLoadImage
                src="https://www.d-themes.com/react/riode/demo-19/images/home/banner/1.jpg"
                alt="Banner Image"
                effect="opacity, transform"
                width={100}
                height={207}
                style={{ backgroundColor: "#e9e9e9" }}
              />
            </figure>
            <div className="banner-content">
              <div style={{ paddingLeft: "40px" }}>
                <h3 style={{ forntWidth: "bold" }}>For Men’s</h3>
                <h4 className="banner-subtitle text-uppercase text-body mb-0">
                  Starting at $29
                </h4>
                <hr className="bg-grey" />
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: "for-men-s" },
                  }}
                >
                  <button className="btn btn-link btn-underline p-0">
                    Shop Now<i className="d-icon-arrow-right"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="col-lg-4 order-lg-auto order-sm-last mb-2">
        <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
          <div className="banner banner-2 banner-fixed content-middle content-center overlay-effect-four">
            <figure>
              <LazyLoadImage
                src="https://www.d-themes.com/react/riode/demo-19/images/home/banner/2.jpg"
                alt="Banner Image"
                effect="opacity"
                width={100}
                height={207}
                style={{ backgroundColor: "#1d1d1d" }}
              />
            </figure>
            <div className="banner-content">
              <h4 className="mb-2 text-uppercase text-primary font-weight-normal">
                GEt 40% Off Your Entire Order!
              </h4>
              <h3 className="banner-title font-weight-bold text-white">
                Black Friday Sale
              </h3>
              <p className="mt-1">
                Use code <strong className="text-white">BLKFRI40</strong> at
                checkout.
              </p>
              <Link href="/shop">
                <button className="btn btn-primary btn-outline text-white">
                  Shop Now <i className="d-icon-arrow-right ml-1"></i>
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="col-lg-4 col-sm-6 mb-2">
        <Reveal
          keyframes={fadeInRightShorter}
          delay={500}
          duration={1200}
          triggerOnce
        >
          <div className="banner banner-5 banner-fixed content-middle overlay-zoom">
            <figure>
              <LazyLoadImage
                src="https://www.d-themes.com/react/riode/demo-19/images/home/banner/3.jpg"
                alt="Banner Image"
                effect="opacity, transform"
                width={100}
                height={207}
                style={{ backgroundColor: "#e9e9e9" }}
              />
            </figure>
            <div className="banner-content">
              <h3 className="banner-title font-weight-bold">For Women’s</h3>

              <h4 className="banner-subtitle text-uppercase text-body mb-0">
                Starting at $29
              </h4>
              <hr className="bg-grey" />
              <Link
                href={{
                  pathname: "/shop",
                  query: { category: "for-women-s" },
                }}
              >
                <button className="btn btn-link btn-underline p-0">
                  Shop Now<i className="d-icon-arrow-right"></i>
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
