import React, { useState, useEffect } from "react";
import Reveal from "react-awesome-reveal";
import { Icon } from "@iconify/react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { serviceSlider } from "~/utils/data/carousel";
import { fadeInUpShorter } from "~/utils/data/keyframes";

import { useSelector, useDispatch } from "react-redux";
import UseLanguage from "~/lib/hook/useLanguage";

import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/components/partials/home/service-section";

function ServiceBox(props) {
  const language = useSelector((state) => state.language.language);
  const [storeLanguage, setLanguage] = useState({});

  useEffect(() => {
    const checkLanguage = UseLanguage({
      Thai,
      Eng,
      Cambodia,
      Myanmar,
      Laos,
      language,
      China,
    });
    setLanguage(checkLanguage);
  }, [language]);

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
                    {storeLanguage?.FreeShipping}
                    {/* Free Shipping &amp; Return */}
                  </h4>
                  <p className="font-primary text-grey">
                    {storeLanguage?.FreeShippingDetail}
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
                    {storeLanguage?.Customer}
                  </h4>
                  <p className="font-primary text-grey">
                    {storeLanguage?.CustomerDetail}
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
                    {storeLanguage?.Moneyback}
                  </h4>
                  <p className="font-primary text-grey">
                    {storeLanguage?.MoneybackDetail}
                  </p>
                </div>
              </div>
              <div
                className="icon-box icon-box-side icon-box-side-1 flex-column"
                style={{ margin: 6 }}
              >
                <Icon
                  icon="ps:sale-tag"
                  color="#8A2BE2"
                  width="52"
                  height="52"
                />
                <div className="icon-box-content mb-1 text-center">
                  <h4 className="icon-box-title mb-1 text-normal">
                    {storeLanguage?.GifPoint}
                  </h4>
                  <p className="font-primary text-grey">
                    {storeLanguage?.GifPointDetail}
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
