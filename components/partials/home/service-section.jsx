import React from "react";
import Reveal from "react-awesome-reveal";
import { Icon } from "@iconify/react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { serviceSlider } from "~/utils/data/carousel";
import { fadeInUpShorter } from "~/utils/data/keyframes";

function ServiceBox(props) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
    <section className="pb-8 service-list-section p-relative overflow-hidden">
      <div className="container">
        <div className="service-list service-list-lg">
          <Reveal
            keyframes={fadeInUpShorter}
            delay={1000}
            duration={2200}
            triggerOnce
          >
            <Carousel responsive={responsive}>
              <div
                className="icon-box icon-box-side icon-box-side-1 flex-column"
                style={{ margin: 6 }}
              >
                <Icon
                  icon="iconoir:delivery-truck"
                  color="#8A2BE2"
                  width="52"
                  height="52"
                />
                <div className="icon-box-content mb-1 text-center">
                  <h4 className="icon-box-title mb-1 text-normal">
                    Free Shipping &amp; Return
                  </h4>
                  <p className="font-primary text-grey">
                    Get free delivery of your orders all over the world.
                  </p>
                </div>
              </div>
              <div
                className="icon-box icon-box-side icon-box-side-1 flex-column"
                style={{ margin: 6 }}
              >
                <Icon
                  icon="simple-icons:timescale"
                  color="#8A2BE2"
                  width="52"
                  height="52"
                />
                <div className="icon-box-content mb-1 text-center">
                  <h4 className="icon-box-title mb-1 text-normal">
                    Customer Support 24/7
                  </h4>
                  <p className="font-primary text-grey">
                    We provide conveninet support of 24/7 for our customers.
                  </p>
                </div>
              </div>
              <div
                className="icon-box icon-box-side icon-box-side-1 flex-column"
                style={{ margin: 6 }}
              >
                <Icon
                  icon="bxs:coin-stack"
                  color="#8A2BE2"
                  width="52"
                  height="52"
                />
                <div className="icon-box-content mb-1 text-center">
                  <h4 className="icon-box-title mb-1 text-normal">
                    Moneyback Guarantee
                  </h4>
                  <p className="font-primary text-grey">
                    We fully guarantee our money back policy with no doubt.
                  </p>
                </div>
              </div>
              <div
                className="icon-box icon-box-side icon-box-side-1 flex-column"
                style={{ margin: 6 }}
              >
                <Icon icon="ps:sale-tag" color="#8A2BE2" width="52" height="52" />
                <div className="icon-box-content mb-1 text-center">
                  <h4 className="icon-box-title mb-1 text-normal">
                    20% Off Your First Order
                  </h4>
                  <p className="font-primary text-grey">
                    Get our first gift - 20% off for your first ordered product.
                  </p>
                </div>
              </div>
            </Carousel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default React.memo(ServiceBox);
