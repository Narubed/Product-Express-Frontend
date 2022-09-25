import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import Reveal from "react-awesome-reveal";

// import Custom Components

import {
  fadeIn,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
} from "~/utils/data/keyframes";

export default function CarouselComponent() {
  return (
    <section className="intro-section" style={{ overflow: "hidden" }}>
      <div className="carousel-wrapper">
        <Carousel
          infiniteLoop
          useKeyboardArrows
          autoPlay
          preventMovementUntilSwipeScrollTolerance
          interval={8000}
          showArrows
        >
          <div className="banner banner-fixed intro-slide1">
            <img
              src="https://d-themes.com/react/riode/demo-19/images/home/slides/1.jpg"
              alt="5"
            />

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
                <Link href="/shop">
                  <button className="btn btn-dark ml-1">
                    Shop Now <i className="d-icon-arrow-right"></i>
                  </button>
                </Link>
              </Reveal>
            </div>
          </div>
          <div className="banner banner-fixed intro-slide2">
            <img
              src="https://d-themes.com/react/riode/demo-19/images/home/slides/2.jpg"
              alt="5"
            />

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
                <Link href="/shop">
                  <button className="btn btn-dark ml-1">
                    Shop Now <i className="d-icon-arrow-right"></i>
                  </button>
                </Link>
              </Reveal>
            </div>
          </div>

          <div className="banner banner-fixed intro-slide2">
            <img
              src="https://d-themes.com/react/riode/demo-7/images/home/slides/1.jpg"
              alt="5"
            />

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
                <Link href="/shop">
                  <button className="btn btn-dark ml-1">
                    Shop Now <i className="d-icon-arrow-right"></i>
                  </button>
                </Link>
              </Reveal>
            </div>
          </div>
          {/* 4--------------------------------------------------------------------- */}
          <div className="banner banner-fixed intro-slide1">
            <img
              src="https://d-themes.com/react/riode/demo-7/images/home/slides/2.jpg"
              alt="5"
            />

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
                <Link href="/shop">
                  <button className="btn btn-dark ml-1">
                    Shop Now <i className="d-icon-arrow-right"></i>
                  </button>
                </Link>
              </Reveal>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
