import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toDecimal } from "~/utils";
import Quickview from "~/components/features/product/common/quickview-modal";
import { useSelector, useDispatch } from "react-redux";
import { setQuickview } from "~/lib/store/model";
import AddCart from "./features/add-cart";

function ProductTwo(props) {
  const dispatch = useDispatch();
  const {
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
  } = props;
  const language = useSelector((state) => state.language.language);

  const [over, setOver] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // decide if the product is wishlisted
  //   let isWishlisted;
  //   isWishlisted =
  //     wishlist.findIndex((item) => item.slug === product.slug) > -1
  //       ? true
  //       : false;

  const showQuickviewHandler = () => {
    dispatch(setQuickview(true));
    setOpen(true);
  };

  const wishlistHandler = (e) => {
    if (toggleWishlist) {
      toggleWishlist(product);
    }

    e.preventDefault();
    let currentTarget = e.currentTarget;
    currentTarget.classList.add("load-more-overlay", "loading");

    setTimeout(() => {
      currentTarget.classList.remove("load-more-overlay", "loading");
    }, 1000);
  };

  return (
    <div className={`product text-left ${adClass}`}>
      <Quickview isOpen={isOpen} product={product} setOpen={setOpen} />
      <figure className="product-media">
        {/* <Link href={`/product/default/${product._id}`}> */}
        <div
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          <LazyLoadImage
            alt="product"
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product.product_images[0]}`}
            threshold={500}
            effect="opacity"
            width="300"
            height="338"
          />

          {product.product_images.length > 1 && (
            <LazyLoadImage
              alt="product"
              src={
                over
                  ? `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product.product_images[0]}`
                  : `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product.product_images[1]}`
              }
              threshold={500}
              width="300"
              height="338"
              effect="opacity"
              wrapperClassName="product-image-hover"
            />
          )}
          {/* </Link> */}

          <div className="product-label-group">
            {product.product_tag === "New" && (
              <label className="product-label label-new">New</label>
            )}
          </div>
          <div className="product-label-group">
            {product.product_tag === "Hot" && (
              <label className="product-label label-new">Hot</label>
            )}
          </div>
          <div className="product-action-vertical">
            {/* {product.variants.length > 0 ? (
            <Link href={`/product/default/${product.slug}`}>
              <button
                className="btn-product-icon btn-cart"
                title="Go to product"
              >
                <i className="d-icon-arrow-right"></i>
              </button>
            </Link>
          ) : (
            <a href="#">
              <button
                className="btn-product-icon btn-cart"
                title="Add to cart"
                onClick={addToCartHandler}
              >
                <i className="d-icon-bag"></i>
              </button>
            </a>
          )} */}
            <a>
              <AddCart product={product} />

              <button
                className="btn-product-icon btn-wishlist"
                title="Add to wishlist"
                style={{ cursor: "pointer" }}
              >
                <Icon icon="ant-design:heart-outlined" />
              </button>
            </a>
          </div>

          <div className="product-action">
            {/* <Link href="#"> */}
            <button
              style={{ cursor: "pointer" }}
              className="btn-product btn-quickview"
              title="Quick View"
              onClick={showQuickviewHandler}
            >
              <a>{language === "Thai" && <a>ดูรายละเอียด</a>}</a>
              <a>{language === "Eng" && <a>View Detail</a>}</a>
              <a>{language === "Cambodia" && <a>មើលព័ត៌មានលម្អិត</a>}</a>
              <a>{language === "Myanmar" && <a>အသေးစိတ်ကြည့်ရှုပါ။</a>}</a>
              <a>{language === "Laos" && <a>ເບິ່ງ​ລາຍ​ລະ​ອຽດ</a>}</a>
              <a>{language === "China" && <a>查看詳細</a>}</a>
            </button>
            {/* </Link> */}
          </div>
        </div>
      </figure>

      <div className="product-details">
        {/* {isCategory ? (
          <div className="product-cat">
            {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.name + "-" + index}>
                    <Link
                      href={{
                        pathname: "/shop",
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                      {index < product.categories.length - 1 ? ", " : ""}
                    </Link>
                  </React.Fragment>
                ))
              : ""}
          </div>
        ) : (
          ""
        )} */}

        <h3 className="product-name">
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "Thai" && product.product_name.Thai}</a>
          </Link>
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "Eng" && product.product_name.Eng}</a>
          </Link>
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "Cambodia" && product.product_name.Cambodia}</a>
          </Link>
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "Myanmar" && product.product_name.Myanmar}</a>
          </Link>
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "Laos" && product.product_name.Laos}</a>
          </Link>
          <Link href={`/product/default/${product._id}`}>
            <a>{language === "China" && product.product_name.China}</a>
          </Link>
        </h3>

        <div className="product-price">
          {product.product_size_detail[0].Price !==
          product.product_size_detail[product.product_size_detail.length - 1]
            .Price ? (
            product.product_size_detail.length === 0 ? (
              <>
                123
                {/* <ins className="new-price">${toDecimal(product.price[0])}</ins> */}
                {/* <del className="old-price">${toDecimal(product.price[1])}</del> */}
              </>
            ) : (
              <del className="new-price">
                ฿ {toDecimal(product.product_size_detail[0].Price)} – ฿
                {toDecimal(
                  product.product_size_detail[
                    product.product_size_detail.length - 1
                  ].Price
                )}
              </del>
            )
          ) : (
            <ins className="new-price">
              ฿ {toDecimal(product.product_size_detail[0].Price)}
            </ins>
          )}
        </div>

        {/* <div className="ratings-container">
          <div className="ratings-full">
            <span
              className="ratings"
              style={{ width: 20 * product.ratings + "%" }}
            ></span>
            <span className="tooltiptext tooltip-top">
              {toDecimal(product.ratings)}
            </span>
          </div>

          <ALink
            href={`/product/default/${product.slug}`}
            className="rating-reviews"
          >
            ( {product.reviews} reviews )
          </ALink>
        </div> */}
      </div>
    </div>
  );
}

export default ProductTwo;
