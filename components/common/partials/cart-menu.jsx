/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Reveal from "react-awesome-reveal";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setCartShopping } from "~/lib/store/cartshopping";
import { setWhiteList } from "~/lib/store/whitelist";
import { getTotalPrice, getCartCount, toDecimal } from "~/utils";
import { Box, MenuItem, Stack, IconButton, Badge } from "@mui/material";
import { Button } from "primereact/button";
import Image from "next/image";
import {
  fadeIn,
  fadeInUpShorter,
  fadeInLeftShorter,
  fadeInRightShorter,
  fadeInDownShorter,
} from "~/utils/data/keyframes";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/components/common/partials/cart-menu";

export default function componentName(props) {
  const dispatch = useDispatch();
  const { cartList, removeFromCart } = props;
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const router = useRouter();
  const shopping = useSelector((state) => state.cartShopping.shopping);
  const whitelist = useSelector((state) => state.whitelist.whitelist);
  //
  const [storeAmountNumber, setAmountNumber] = useState(0);
  const [isTotal, setTotal] = useState(0);
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

  useEffect(() => {
    cartMember();
    cartWhiteList();
  }, []);
  useEffect(() => {
    const Amountnumber = shopping.map((item) => {
      const number = item.product_select_detail.reduce(
        (sum, value) => sum + value.amount,
        0
      );
      return number;
    });
    const Amount = Amountnumber.reduce((sum, item) => sum + item, 0);
    setAmountNumber(Amount);
    totalPrice();
  }, [shopping]);

  const totalPrice = () => {
    const valueSummary = shopping.map((item) => {
      const summary = item.product_select_detail.reduce(
        (sum, value) =>
          sum + parseInt(value.amount, 10) * parseInt(value.Price, 10),
        0
      );
      return summary;
    });
    const reduceTotal = valueSummary.reduce((sum, value) => sum + value, 0);
    setTotal(reduceTotal);
  };

  const cartWhiteList = async () => {
    if (currentUser) {
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/whitelist/member`;
      await fetcherWithToken(url)
        .then((json) => {
          dispatch(setWhiteList(json.data.whitelist_detail));
        })
        .catch(() => dispatch(setWhiteList([])));
    }
  };

  const cartMember = async () => {
    if (currentUser) {
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
      await fetcherWithToken(url)
        .then((json) => {
          dispatch(setCartShopping(json.data.shopping_detail));
        })
        .catch(() => dispatch(setCartShopping([])));
    }
  };

  useEffect(() => {
    hideCartMenu();
  }, [router.asPath]);

  const showCartMenu = (e) => {
    e.preventDefault();
    e.currentTarget.closest(".cart-dropdown").classList.add("opened");
  };

  const hideCartMenu = () => {
    if (document.querySelector(".cart-dropdown").classList.contains("opened"))
      document.querySelector(".cart-dropdown").classList.remove("opened");
  };

  const removeCart = async (item) => {
    const newSelectDetail = [];
    shopping.forEach((element) => {
      if (element._id !== item._id) {
        newSelectDetail.push(element);
      }
    });
    dispatch(setCartShopping(newSelectDetail));
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
    await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
      const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
      await fetcherWithToken(urlCart, {
        method: "PUT",
        body: JSON.stringify({ shopping_detail: newSelectDetail }),
      });
    });
  };

  const removeCardDetail = async (props) => {
    const { value, item } = props;
    const newSelectDetail = [];
    shopping.forEach((element) => {
      const data = [];
      if (element._id === item._id) {
        element.product_select_detail.forEach((element2) => {
          if (element2.Thai !== value.Thai) {
            data.push(element2);
          }
        });
      } else {
        element.product_select_detail.map((m) => data.push(m));
      }
      newSelectDetail.push({ ...element, product_select_detail: data });
    });
    dispatch(setCartShopping(newSelectDetail));
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
    await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
      const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
      await fetcherWithToken(urlCart, {
        method: "PUT",
        body: JSON.stringify({ shopping_detail: newSelectDetail }),
      });
    });
  };

  return (
    <>
      {/* <IconButton>
        <Icon icon="bxs:user" width="32" height="32" color="#FFFFFF" />

      </IconButton> */}
      <Link href="/pages/wishlist">
        <IconButton>
          <Badge badgeContent={whitelist.length} color="warning">
            <Icon
              icon="akar-icons:heart"
              width="32"
              height="32"
              color="#FFFFFF"
            />
          </Badge>
        </IconButton>
      </Link>

      <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0">
        <a href="#" className="cart-toggle link" onClick={showCartMenu}>
          <i className="d-icon-bag">
            {/* <span className="cart-count">{getCartCount(cartList)}</span> */}

            <IconButton sx={{ textAlign: "center" }}>
              <Badge
                badgeContent={storeAmountNumber}
                max={999}
                color="secondary"
              >
                <Icon
                  icon="akar-icons:shopping-bag"
                  width="32"
                  height="32"
                  color="#FFFFFF"
                />
              </Badge>
            </IconButton>
          </i>
        </a>

        <div className="cart-overlay" onClick={hideCartMenu}></div>
        <div className="dropdown-box">
          <div className="cart-header">
            <Reveal keyframes={fadeInUpShorter} delay={500} duration={1200}>
              <h4 className="cart-title">{storeLanguage.ShoppingCart}</h4>
              <Link href="#">
                <button
                  className="btn btn-dark btn-link btn-icon-right btn-close"
                  onClick={hideCartMenu}
                >
                  {storeLanguage.Close}
                  <i className="d-icon-arrow-right"></i>
                  {/* <span className="sr-only">Cart</span> */}
                </button>
              </Link>
            </Reveal>
          </div>

          {shopping.length !== 0 ? (
            <>
              <div className="products scrollable">
                {shopping.map((item, index) => (
                  <div
                    className="product product-cart"
                    key={"cart-menu-product-" + index}
                  >
                    <figure className="product-media pure-media">
                      <Reveal
                        keyframes={fadeInRightShorter}
                        delay={500}
                        duration={1200}
                      >
                        <Link href={"/product/default/" + item._id}>
                          <LazyLoadImage
                            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item.product_images[0]}`}
                            alt="product"
                            width="80"
                            height="88"
                          />
                        </Link>
                      </Reveal>

                      <button
                        className="btn btn-link btn-close"
                        onClick={() => {
                          removeCart(item);
                        }}
                      >
                        <i className="fas fa-times">
                          <Icon icon="iwwa:delete" />
                        </i>
                        <span className="sr-only">
                          <Icon icon="iwwa:delete" width="18px" />
                        </span>
                      </button>
                    </figure>
                    <Reveal
                      keyframes={fadeInRightShorter}
                      delay={500}
                      duration={1200}
                    >
                      <div className="product-detail">
                        <Link href={"/product/default/" + item._id}>
                          <a className="product-name">
                            {language === "Thai"
                              ? item.product_name.Thai
                              : language === "Eng"
                              ? item.product_name.Eng
                              : language === "China"
                              ? item.product_name.China
                              : language === "Cambodia"
                              ? item.product_name.Cambodia
                              : language === "Myanmar"
                              ? item.product_name.Myanmar
                              : item.product_name.Laos}
                          </a>
                        </Link>
                        {item.product_select_detail.map((value) => (
                          <div className="price-box" key={value.Thai}>
                            <Link href={"/product/default/" + item._id}>
                              <a
                                className="product-price"
                                style={{ fontSize: "12px" }}
                              >
                                {value.Thai}
                              </a>
                            </Link>

                            <span
                              className="product-quantity"
                              style={{ fontSize: "12px" }}
                            >
                              {value.amount}
                            </span>
                            <span
                              className="product-price"
                              style={{ fontSize: "12px" }}
                            >
                              ฿{toDecimal(value.Price)}
                            </span>
                            {item.product_select_detail.length > 1 && (
                              <a className="product-price">
                                <Button
                                  onClick={() =>
                                    removeCardDetail({ value, item })
                                  }
                                  label={<Icon icon="cil:delete" />}
                                  className="p-button-raised p-button-danger p-button-text"
                                />
                              </a>
                            )}
                          </div>
                        ))}
                        <div className="cart-total">
                          <label>{storeLanguage.SubTotal} : </label>
                          <span className="price">
                            ฿
                            {toDecimal(
                              item.product_select_detail.reduce(
                                (sum, reduceValue) =>
                                  sum + reduceValue.amount * reduceValue.Price,
                                0
                              )
                            )}
                          </span>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
              <Reveal keyframes={fadeInDownShorter} delay={500} duration={1200}>
                <div className="cart-total">
                  <label>{storeLanguage.Total} : </label>
                  <span className="price">฿{toDecimal(isTotal)}</span>
                </div>
              </Reveal>
              <Reveal keyframes={fadeInDownShorter} delay={500} duration={1200}>
                <div className="cart-action">
                  <Link href="/pages/cart">
                    <button
                      className="btn btn-dark btn-link"
                      onClick={hideCartMenu}
                    >
                      {storeLanguage.ViewCart}
                    </button>
                  </Link>
                  <Link href="/pages/checkout">
                    <button
                      className="btn btn-dark"
                      onClick={hideCartMenu}
                      style={{ textAlign: "center", margin: "auto" }}
                    >
                      <span> {storeLanguage.GoToCheckOut}</span>
                    </button>
                  </Link>
                </div>
              </Reveal>
            </>
          ) : (
            <p className="mt-4 text-center font-weight-semi-bold ls-normal text-body">
              No products in the cart.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
