import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Reveal from "react-awesome-reveal";
import bastImage from "~/public/images/pages/banner/รูป1-ภาษาอังกฤษ-png-01.png";
import bastImage2 from "~/public/images/pages/banner/รูป1-ภาษาอังกฤษ-png-02.png";
import bastImage3 from "~/public/images/pages/banner/รูป1-ภาษาอังกฤษ-png-03.png";
import bastImage4 from "~/public/images/pages/banner/รูป1-ภาษาอังกฤษ-png-04.png";

import { fadeInRightShorter } from "~/utils/data/keyframes";

// import Custom Components
import Link from "next/link";

function BannerSection(props) {
  return (
    <section className="banner-section">
      <Reveal keyframes={fadeInRightShorter} delay={500} duration={1500}>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="banner banner1 banner-fixed mb-4"
                    style={{ backgroundColor: "#aab2b8" }}
                  >
                    <figure>
                      <LazyLoadImage
                        src={bastImage.src}
                        alt="category"
                        width="880"
                        height="290"
                        effect="opacity"
                      />
                    </figure>

                    <div
                      style={{
                        position: "absolute",
                        bottom: "30px",
                        left: "27%",
                      }}
                    >
                      {/* <div className="banner-content text-center y-50"> */}
                      {/* <h4 className="banner-subtitle text-white text-uppercase mt-1 mb-2">
                      Best Sellers Store
                    </h4> */}
                      {/* <h3 className="banner-title text-white font-weight-bold mb-2">
                      Men’s Fashion{" "}
                    </h3> */}
                      {/* <p className="banner-info text-white mb-6">
                      Starting at $24.00
                    </p> */}
                      <Link
                        href={{ pathname: "/shop"}}
                      >
                        <button
                          className="btn btn-md btn-outline btn-white"
                          style={{ padding: "12px" }}
                        >
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="category category-electronics category-badge category-absolute mb-4"
                    style={{ backgroundColor: "#f3f3f3" }}
                  >
                    <Link
                      href={{ pathname: "/shop" }}
                    >
                      <a>
                        <figure className="category-media">
                          <LazyLoadImage
                            src={bastImage2.src}
                            alt="category"
                            width="430"
                            height="290"
                            effect="opacity"
                          />
                        </figure>
                      </a>
                    </Link>
                    <div
                      className="category-content y-40 x-50"
                      style={{
                        // position: "absolute",
                        bottom: "0px",
                        padding: "18px 20px",
                      }}
                    >
                      <h4 className="category-name">Shop Now</h4>
                      <Link
                        href={{
                          pathname: "/shop",
                          query: { category: "women" },
                        }}
                      >
                        <button className="btn btn-md btn-primary btn-block">
                          <a style={{ padding: "10px 10px" }}>Shop Now</a>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div
                    className="category category-electronics category-badge category-absolute mb-4"
                    style={{ backgroundColor: "#f3f3f3" }}
                  >
                    <Link
                      href={{ pathname: "/shop" }}
                    >
                      <a>
                        <figure className="category-media">
                          <LazyLoadImage
                            src={bastImage3.src}
                            alt="category"
                            // width="430"
                            // height="290"
                            effect="opacity"
                          />
                        </figure>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="category category-winter category-badge category-absolute mb-4"
                style={{ backgroundColor: "#f3f3f3" }}
              >
                <Link
                  href={{ pathname: "/shop" }}
                >
                  <a>
                    <figure className="category-media">
                      <LazyLoadImage
                        src={bastImage4.src}
                        alt="category"
                        width="280"
                        height="600"
                        effect="opacity"
                      />
                    </figure>
                  </a>
                </Link>
                <div
                  className="category-content  x-50"
                  style={{
                    position: "absolute",
                    bottom: "39.5%",
                  }}
                >
                  <h4 className="category-name">Shop Now</h4>
                  <Link
                    href={{ pathname: "/shop" }}
                  >
                    <button className="btn btn-primary btn-block">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default BannerSection;
