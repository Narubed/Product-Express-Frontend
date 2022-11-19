import React from "react";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
// import Custom Components
import OwlCarousel from "~/components/features/owl-carousel";
import Slide1 from "~/public/images/pages/banner/slide/รูปปก1-1920x945px-01.jpg"
import Slide2 from "~/public/images/pages/banner/slide/รูปปก2-1920x945px-01.jpg"
import { introSlider } from "~/utils/data/carousel";
import {
  fadeInUpShorter,
  fadeInRightShorter,
  blurIn,
  zoomInShorter,
} from "~/utils/data/keyframes";

function IntroSection(props) {
  return (
    <section className="intro-section" style={{ backgroundColor: "#FFFF" }}>
      <OwlCarousel
        adClass="owl-theme owl-nav-fade intro-slider animation-slider"
        options={introSlider}
      >
        <div
          className="intro-slide1 banner banner-fixed"
          style={{ backgroundColor: "#222" }}
        >
          <div className="background-effect-wrapper">
            <div className="background-effect kenBurnsToRight">
              <div className="particle-effect snowfall"></div>
            </div>
          </div>
       
          <figure>
            <LazyLoadImage
              // src="https://d-themes.com/react/riode/demo-sport/images/home/slides/1.jpg"
              src={Slide1.src}
              alt="banner"
              width="1903"
              height="896"
              effect="opacity"
            />
          </figure>
          {/* <div className="container">
            <div className="banner-content y-50">
              <div className="row">
                <div className="col-md-6">
                  <Reveal
                    keyframes={fadeInUpShorter}
                    delay={300}
                    duration={1200}
                  >
                    <h4 className="banner-subtitle mb-2">New Arrivals</h4>
                  </Reveal>
                  <Reveal keyframes={blurIn} delay={500} duration={1000}>
                    <h3 className="banner-title font-weight-bold text-uppercase mb-2">
                      A Pair Of Skis Sale
                    </h3>
                  </Reveal>
                  <Reveal
                    keyframes={fadeInRightShorter}
                    delay={700}
                    duration={1000}
                  >
                    <p className="text-uppercase mb-7">
                      <span>For - Women</span>
                      <br /> Product Identifier: DD1160
                    </p>
                  </Reveal>
                  <Reveal
                    keyframes={fadeInRightShorter}
                    delay={900}
                    duration={1000}
                  >
                    <Link href="/shop">
                      <button className="btn btn-rounded btn-outline btn-white mb-1">
                        Shop now<i className="d-icon-arrow-right"></i>
                      </button>
                    </Link>
                  </Reveal>
                  <div className="banner-info">
                    <Reveal
                      keyframes={zoomInShorter}
                      delay={110}
                      duration={1000}
                    >
                      <h6 className="text-white font-weight-bold mb-2">
                        Hot <br /> Deal
                      </h6>
                    </Reveal>
                  </div>
                </div>
                <div className="col-md-6">
                  <Reveal
                    keyframes={fadeInRightShorter}
                    delay={100}
                    duration={1000}
                  >
                    <div
                      className="banner-image-wrapper"
                      style={{ transform: "scale(1.1)" }}
                    >
                      <LazyLoadImage
                        src="https://d-themes.com/react/riode/demo-sport/images/home/slides/ski.png"
                        className="banner-image"
                        alt="Ski"
                        width="652"
                        height="386"
                        effect="opacity"
                      />
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div
          className="intro-slide2 banner banner-fixed"
          style={{ backgroundColor: "#222" }}
        >
           <div className="background-effect-wrapper">
              <div className="background-effect kenBurnsToLeft">
                <div className="particle-effect sparkle"></div>
              </div>
            </div>
          <figure>
            <LazyLoadImage
              // src="https://d-themes.com/react/riode/demo-sport/images/home/slides/2.jpg"
              src={Slide2.src}
              alt="banner"
              width="1903"
              height="896"
              effect="opacity"
            />
          </figure>
          {/* <div className="container">
            <div className="banner-content y-50">
              <div className="row">
                <div className="col-md-6 banner-image-wrapper">
                  <Reveal
                    keyframes={fadeInRightShorter}
                    delay={100}
                    duration={1000}
                  >
                    <LazyLoadImage
                      src="https://d-themes.com/react/riode/demo-sport/images/home/slides/mat.png"
                      className="banner-image pr-lg-6"
                      alt="Ski"
                      width="652"
                      height="386"
                      effect="opacity"
                    />
                  </Reveal>
                </div>
                <div className="col-md-6">
                  <div className="pl-lg-10" style={{ marginLeft: "1px" }}>
                    <Reveal
                      keyframes={fadeInUpShorter}
                      delay={300}
                      duration={1000}
                    >
                      <h4 className="banner-subtitle mb-4">Hurry!</h4>
                    </Reveal>
                    <Reveal keyframes={blurIn} delay={500} duration={1000}>
                      <h3 className="banner-title mb-10">
                        From Healthy Sporting <br /> Necessities
                      </h3>
                    </Reveal>
                    <Reveal
                      keyframes={fadeInRightShorter}
                      delay={900}
                      duration={1000}
                    >
                      <Link href="/shop">
                        <button className="btn btn-rounded btn-outline btn-white mb-1">
                          Shop now<i className="d-icon-arrow-right"></i>
                        </button>
                      </Link>
                    </Reveal>
                    <div className="banner-info">
                      <Reveal
                        keyframes={zoomInShorter}
                        delay={110}
                        duration={1000}
                      >
                        <h6 className="text-white font-weight-bold mb-0">
                          Hot <br /> Deal
                        </h6>
                      </Reveal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </OwlCarousel>

      <div className="shape-divider">
        <div className="shape shape1">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 39.666 100 3.584"
            enableBackground="new 0 39.666 100 3.584"
          >
            <path
              fill="#fff"
              d="M100,39.942c-10.732,1.907-29.073,3.163-49.896,3.163c-20.958,0-39.401-1.272-50.104-3.2v17.007l100-0.037V39.942z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
}

export default React.memo(IntroSection);
