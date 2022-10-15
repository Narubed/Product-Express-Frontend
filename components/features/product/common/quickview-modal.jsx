/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import Modal from "react-modal";
import imagesLoaded from "imagesloaded";
import { useSelector, useDispatch } from "react-redux";
import { setQuickview } from "~/lib/store/model";
import OwlCarousel from "~/components/features/owl-carousel";
import { introSlider } from "~/utils/data/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";

import DetailOne from "~/components/partials/product/detail/detail-one";

const customStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    zIndex: "10000",
    overflowX: "hidden",
    overflowY: "auto",
  },
};

Modal.setAppElement("#__next");

function Quickview(props) {
  const dispatch = useDispatch();
  const quickview = useSelector((state) => state.model.quickview);
  const { slug, closeQuickview, isOpen, setOpen } = props;
  const [loaded, setLoadingState] = useState(false);

  const product = props.product;

  useEffect(() => {
    setTimeout(() => {
      if (product && isOpen && document.querySelector(".quickview-modal"))
        imagesLoaded(".quickview-modal")
          .on("done", function () {
            setLoadingState(true);
          })
          .on("progress", function () {
            setLoadingState(false);
          });
    }, 200);
  }, [product, isOpen]);

  const closeQuick = () => {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document.querySelector(".quickview-modal").classList.add("removed");
    setLoadingState(false);
    setTimeout(() => {
      setOpen(false);
      dispatch(setQuickview(false));
      //   closeQuickview();
    }, 330);
  };

  if (!isOpen) return <div></div>;

  return (
    <Modal
      isOpen={quickview}
      contentLabel="QuickView"
      onRequestClose={closeQuick}
      shouldFocusAfterRender={false}
      style={customStyles}
      className="product product-single row product-popup quickview-modal"
      id="product-quickview"
    >
      <>
        <div className={`row p-0 m-0 ${loaded ? "" : "d-none"}`}>
          <div className="col-md-6">
            <div className="product-gallery mb-md-0 pb-0">
              <div className="product-label-group">
                {product.product_tag === "New" ? (
                  <label className="product-label label-new">New</label>
                ) : (
                  ""
                )}
                {product.product_tag === "Hot" ? (
                  <label className="product-label label-top">Hot</label>
                ) : (
                  ""
                )}
              </div>

              <OwlCarousel
                adClass="owl-theme owl-nav-fade intro-slider animation-slider"
                options={introSlider}
              >
                {product?.product_images.map((item) => (
                  <LazyLoadImage
                    key={item}
                    src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item}`}
                    alt="banner"
                    width="100%"
                    height="100%"
                    effect="opacity"
                  />
                ))}
              </OwlCarousel>
            </div>
          </div>

          <div className="col-md-6">
            <DetailOne data={product} adClass="scrollable pr-3" isNav={false} />
          </div>
        </div>

        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close p-0"
          onClick={closeQuick}
        >
          <span>×</span>
        </button>
      </>
      {loaded ? (
        ""
      ) : (
        <div className="product row p-0 m-0 skeleton-body mfp-product">
          <div className="col-md-6">
            <div className="skel-pro-gallery"></div>
          </div>

          <div className="col-md-6">
            <div className="skel-pro-summary"></div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default Quickview;
