import React from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import Custom Components
import ALink from "~/components/features/custom-link";
import OwlCarousel from "~/components/features/owl-carousel";

import { introSlider } from "~/utils/data/carousel";
import {
  fadeIn,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
} from "~/utils/data/keyframes";

function IntroSection() {
  return (
    <section className="intro-section" style={{ overflow: "hidden" }}>
      <OwlCarousel
        adClass="owl-theme intro-slider owl-nav-fade animation-slider mb-2 show-nav-hover"
        options={introSlider}
      >
        {/* <div className="banner banner-fixed intro-slide1" style={ { backgroundImage: "url('./images/home/slides/1.jpg')", backgroundColor: "#2e2e31" } }> */}
        <div
          className="banner banner-fixed intro-slide1"
          style={{
            backgroundImage:
              "url('https://nbadigitalservice.com/static/media/main4.d200c246.png')",
            backgroundColor: "#2e2e31",
          }}
        >
          <div className="background-effect-wrapper">
            <div className="background-effect kenBurnsToRight">
              <div className="particle-effect snowfall"></div>
            </div>
          </div>

          <div className="banner-content y-50">
            <Reveal keyframes={fadeInUpShorter} delay={200} duration={1200}>
              <h4 className="banner-subtitle d-flex align-items-center text-primary text-uppercase font-weight-bold">
                Christmastide
              </h4>
            </Reveal>

            <Reveal keyframes={fadeInUpShorter} delay={300} duration={1200}>
              <h3 className="banner-title ls-m font-weight-bolder">
                Fashion Collection
              </h3>
            </Reveal>

            <Reveal keyframes={fadeInUpShorter} delay={400} duration={1200}>
              <span className="h-divider ml-1 bg-primary"></span>
            </Reveal>

            <Reveal keyframes={fadeInUpShorter} delay={400} duration={1200}>
              <p className="font-primary ls-s text-dark ml-1">
                Get Free Shipping on all orders over $75
              </p>
            </Reveal>

            <Reveal keyframes={fadeInUpShorter} delay={500} duration={1200}>
              <ALink href="/shop" className="btn btn-dark ml-1">
                Shop Now <i className="d-icon-arrow-right"></i>
              </ALink>
            </Reveal>
          </div>
        </div>

        <div
          className="banner banner-fixed intro-slide2"
          style={{
            // backgroundImage: "url('./images/home/slides/2.jpg')",
            backgroundImage:
              "url('https://nbadigitalservice.com/static/media/main5.318a9b9e.jpg')",
            backgroundColor: "#3f5354",
          }}
        >
          <div className="background-effect-wrapper">
            <div className="background-effect kenBurnsToLeft">
              <div className="particle-effect sparkle"></div>
            </div>
          </div>

          <div className="banner-content y-50">
            <Reveal keyframes={fadeInLeftShorter} delay={200} duration={1200}>
              <h4 className="banner-subtitle d-flex align-items-center text-white text-uppercase font-weight-bold">
                Summer Season’s
              </h4>
            </Reveal>

            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1200}>
              <h3 className="banner-title ls-m font-weight-bolder">
                Fashion Collection
              </h3>
            </Reveal>

            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1200}>
              <span className="h-divider ml-1 bg-white"></span>
            </Reveal>

            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1200}>
              <p className="font-primary ls-s ml-1 text-dark">
                Get Free Shipping on all orders over $75
              </p>
            </Reveal>

            <Reveal keyframes={fadeInLeftShorter} delay={400} duration={1200}>
              <ALink href="/shop" className="btn btn-dark ml-1">
                Shop Now <i className="d-icon-arrow-right"></i>
              </ALink>
            </Reveal>
          </div>
        </div>
      </OwlCarousel>

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
                  src="./images/home/banner/1.jpg"
                  alt="Banner Image"
                  effect="opacity, transform"
                  width={100}
                  height={207}
                  style={{ backgroundColor: "#e9e9e9" }}
                />
              </figure>
              <div className="banner-content">
                <h3 className="banner-title font-weight-bold">For Men’s</h3>
                <h4 className="banner-subtitle text-uppercase text-body mb-0">
                  Starting at $29
                </h4>
                <hr className="bg-grey" />
                <ALink
                  href={{ pathname: "/shop", query: { category: "for-men-s" } }}
                  className="btn btn-link btn-underline p-0"
                >
                  Shop Now<i className="d-icon-arrow-right"></i>
                </ALink>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="col-lg-4 order-lg-auto order-sm-last mb-2">
          <Reveal keyframes={fadeIn} delay={300} duration={1200} triggerOnce>
            <div className="banner banner-2 banner-fixed content-middle content-center overlay-effect-four">
              <figure>
                <LazyLoadImage
                  src="./images/home/banner/2.jpg"
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
                <ALink
                  href="/shop"
                  className="btn btn-primary btn-outline text-white"
                >
                  Shop Now <i className="d-icon-arrow-right ml-1"></i>
                </ALink>
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
            <div className="banner banner-3 banner-fixed content-middle overlay-zoom">
              <figure>
                <LazyLoadImage
                  src="./images/home/banner/3.jpg"
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
                <ALink
                  href={{
                    pathname: "/shop",
                    query: { category: "for-women-s" },
                  }}
                  className="btn btn-link btn-underline p-0"
                >
                  Shop Now<i className="d-icon-arrow-right"></i>
                </ALink>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default React.memo(IntroSection);
