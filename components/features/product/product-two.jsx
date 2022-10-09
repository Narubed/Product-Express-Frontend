import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { toDecimal } from "~/utils";

function ProductTwo(props) {
  const {
    product,
    adClass = "text-center",
    toggleWishlist,
    wishlist,
    addToCart,
    openQuickview,
    isCategory = true,
  } = props;
  console.log(props);

  // decide if the product is wishlisted
  //   let isWishlisted;
  //   isWishlisted =
  //     wishlist.findIndex((item) => item.slug === product.slug) > -1
  //       ? true
  //       : false;

  const showQuickviewHandler = () => {
    openQuickview(product.slug);
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

  const addToCartHandler = (e) => {
    e.preventDefault();
    addToCart({ ...product, qty: 1, price: product.price[0] });
  };

  return (
    <div className={`product text-left ${adClass}`}>
      <figure className="product-media">
        {/* <Link href={`/product/default/${product._id}`}> */}
        <LazyLoadImage
          alt="product"
          src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product.product_images[0]}`}
          // src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url}
          threshold={500}
          effect="opacity"
          width="300"
          height="338"
        />

        {product.product_images.length >= 2 ? (
          <LazyLoadImage
            alt="product"
            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product.product_images[1]}`}
            threshold={500}
            width="300"
            height="338"
            effect="opacity"
            wrapperClassName="product-image-hover"
          />
        ) : (
          ""
        )}
        {/* </Link> */}

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
          {product.discount > 0 ? (
            product.variants.length === 0 ? (
              <label className="product-label label-sale">
                {product.discount}% OFF
              </label>
            ) : (
              <label className="product-label label-sale">Sale</label>
            )
          ) : (
            ""
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
          <a href="#">
            <button
              className="btn-product-icon btn-cart"
              title="Add to cart"
              style={{ cursor: "pointer" }}
            >
              <Icon icon="akar-icons:shopping-bag" />
            </button>
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
          <Link href="#">
            <button
              className="btn-product btn-quickview"
              title="Quick View"
              onClick={showQuickviewHandler}
            >
              Quick View
            </button>
          </Link>
        </div>
      </figure>

      {/* <div className="product-details">
        {isCategory ? (
          <div className="product-cat">
            {product.categories
              ? product.categories.map((item, index) => (
                  <React.Fragment key={item.name + "-" + index}>
                    <ALink
                      href={{
                        pathname: "/shop",
                        query: { category: item.slug },
                      }}
                    >
                      {item.name}
                      {index < product.categories.length - 1 ? ", " : ""}
                    </ALink>
                  </React.Fragment>
                ))
              : ""}
          </div>
        ) : (
          ""
        )}

        <h3 className="product-name">
          <ALink href={`/product/default/${product.slug}`}>
            {product.name}
          </ALink>
        </h3>

        <div className="product-price">
          {product.price[0] !== product.price[1] ? (
            product.variants.length === 0 ||
            (product.variants.length > 0 && !product.variants[0].price) ? (
              <>
                <ins className="new-price">${toDecimal(product.price[0])}</ins>
                <del className="old-price">${toDecimal(product.price[1])}</del>
              </>
            ) : (
              <del className="new-price">
                ${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}
              </del>
            )
          ) : (
            <ins className="new-price">${toDecimal(product.price[0])}</ins>
          )}
        </div>

        <div className="ratings-container">
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
        </div>
      </div> */}
    </div>
  );
}

export default ProductTwo;
