import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// import Custom Components
import Link from "next/link";

function BannerSection(props) {
  return (
    <section className="banner-section">
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
                      src="https://d-themes.com/react/riode/demo-sport/images/home/banners/1.jpg"
                      alt="category"
                      width="880"
                      height="290"
                      effect="opacity"
                    />
                  </figure>
                  <div className="banner-content text-center y-50">
                    <h4 className="banner-subtitle text-white text-uppercase mt-1 mb-2">
                      Best Sellers Store
                    </h4>
                    <h3 className="banner-title text-white font-weight-bold mb-2">
                      Men’s Fashion{" "}
                    </h3>
                    <p className="banner-info text-white mb-6">
                      Starting at $24.00
                    </p>
                    <Link
                      href={{ pathname: "/shop", query: { category: "men" } }}
                    >
                      <button className="btn btn-md btn-outline btn-white">
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
                    href={{ pathname: "/shop", query: { category: "women" } }}
                  >
                    <a>
                      <figure className="category-media">
                        <LazyLoadImage
                          src="https://d-themes.com/react/riode/demo-sport/images/home/banners/3.jpg"
                          alt="category"
                          width="430"
                          height="290"
                          effect="opacity"
                        />
                      </figure>
                    </a>
                  </Link>
                  <div className="category-content y-50 x-50">
                    <h4 className="category-name">Electronics</h4>
                    <Link
                      href={{ pathname: "/shop", query: { category: "women" } }}
                    >
                      <button className="btn btn-primary btn-block">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="banner banner2 banner-fixed mb-4">
                  <div className="banner-content text-center y-50 x-50">
                    <h4 className="banner-subtitle text-white text-uppercase mt-1 mb-3">
                      Get 40% Off Your Entire Order!
                    </h4>
                    <h3 className="banner-title text-white font-weight-bold mb-3">
                      Black Friday
                    </h3>
                    <p className="banner-info mb-6">
                      Use code{" "}
                      <span className="font-weight-bold text-white">
                        BLKFR140
                      </span>{" "}
                      at checkout.
                    </p>
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { category: "fashion" },
                      }}
                    >
                      <button className="btn btn-md btn-outline btn-primary">
                        Shop Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="category category-winter category-badge category-absolute mb-4"
              style={{ backgroundColor: "#f3f3f3" }}
            >
              <Link href={{ pathname: "/shop", query: { category: "winter" } }}>
                <a>
                  <figure className="category-media">
                    <LazyLoadImage
                      src="https://d-themes.com/react/riode/demo-sport/images/home/banners/2.jpg"
                      alt="category"
                      width="280"
                      height="600"
                      effect="opacity"
                    />
                  </figure>
                </a>
              </Link>
              <div className="category-content y-50 x-50">
                <h4 className="category-name">Winter</h4>
                <Link
                  href={{ pathname: "/shop", query: { category: "winter" } }}
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
    </section>
  );
}

export default BannerSection;
