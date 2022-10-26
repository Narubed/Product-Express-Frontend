/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Alert from "@mui/material/Alert";
import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import Quantity from "~/components/features/quantity";
import { useSelector, useDispatch } from "react-redux";
import { toDecimal, getTotalPrice } from "~/utils";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setLoading } from "@/lib/store/loading";
import onChangeQtyDetail from "@/components/partials/cart/onChangeQtyDetail";
import IconButton from "@mui/material/IconButton";
import { setCartShopping } from "~/lib/store/cartshopping";
import { fadeInRightShorter } from "~/utils/data/keyframes";
import axios from "axios";
import CartTotals from "@/components/partials/cart/cartTotals";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/pages/cart";

export default function cart() {
  const router = useRouter();
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const dispatch = useDispatch();
  const shopping = useSelector((state) => state.cartShopping.shopping);
  const [cartItems, setCartItems] = useState([]);
  const [isShopping, setShopping] = useState([]);
  useEffect(() => {
    findProductNow();
  }, [shopping]);

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

  const findProductNow = async () => {
    try {
      const products = await axios(
        `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`
      );
      const { data } = products.data;
      const newCart = [];
      shopping.forEach((element) => {
        const findData = data.find((item) => item._id === element._id);
        if (findData) {
          const findItem = [];
          element.product_select_detail.map((item) => {
            const idxDetail = findData.product_size_detail.find(
              (detail) => detail.Thai === item.Thai
            );
            if (idxDetail) {
              findItem.push({ ...idxDetail, amount: item.amount });
            }
          });
          newCart.push({ ...element, product_select_detail: findItem });
        }
      });
      setShopping(newCart);
    } catch (error) {
      setShopping(shopping);
    }
  };

  const onChangeQty = async (name, qty, itemSelect, item) => {
    await onChangeQtyDetail({
      item,
      name,
      qty,
      itemSelect,
      cartItems,
      isShopping,
      dispatch,
      fetcherWithToken,
      setLoading,
    });
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
    const { itemSelect, item } = props;
    const newSelectDetail = [];
    shopping.forEach((element) => {
      const data = [];
      if (element._id === item._id) {
        element.product_select_detail.forEach((element2) => {
          if (element2.Thai !== itemSelect.Thai) {
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
    <div>
      {" "}
      <div className="main cart">
        <div className="main cart">
          <div className="page-content pt-0 pb-10">
            <div
              className="step-by pr-0 pl-0"
              style={{
                backgroundImage: `url(https://acegif.com/wp-content/uploads/gif/confetti-4.gif)`,
                backgroundColor: "white",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderTop: "3px solid purple",
                borderBottom: "3px solid purple",
              }}
            >
              <h3
                className="title title-simple title-step active"
                //   style={{ borderRight: "1px solid red" }}
              >
                <Link href="#">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Shopping}</a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step ">
                <Link href="/pages/checkout">
                  <a style={{ fontSize: "12px" }}> {storeLanguage.Checkout} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Pending} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}> {storeLanguage.Waiting} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.ToReceive}</a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Succeed}</a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Canceled}</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
        <div className="container mt-7 mb-2">
          <div className="row">
            {isShopping.length > 0 ? (
              <>
                <div className="col-lg-8 col-md-12 pr-lg-4">
                  <table className="shop-table cart-table">
                    <thead>
                      <tr>
                        <Reveal
                          keyframes={fadeInRightShorter}
                          delay={500}
                          duration={1200}
                        >
                          <th>
                            <span>{storeLanguage.Product} </span>
                          </th>
                        </Reveal>
                        <th></th>
                        <Reveal
                          keyframes={fadeInRightShorter}
                          delay={500}
                          duration={1200}
                        >
                          <th>
                            <span>{storeLanguage.Price} </span>
                          </th>
                        </Reveal>

                        <th>
                          <Reveal
                            keyframes={fadeInRightShorter}
                            delay={500}
                            duration={1200}
                          >
                            <span>{storeLanguage.Quantity} </span>
                          </Reveal>
                        </th>

                        <th>
                          <Reveal
                            keyframes={fadeInRightShorter}
                            delay={500}
                            duration={1200}
                          >
                            {storeLanguage.Subtotal}
                          </Reveal>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isShopping.map((item) => {
                        return (
                          <>
                            {item.product_select_detail.map((itemSelect) => (
                              <tr key={"cart" + itemSelect.Thai}>
                                <td
                                  className="product-thumbnail"
                                  key={itemSelect.Thai}
                                >
                                  <figure>
                                    <Reveal
                                      keyframes={fadeInRightShorter}
                                      delay={500}
                                      duration={1200}
                                    >
                                      <Link
                                        href={"/product/default/" + item._id}
                                      >
                                        <LazyLoadImage
                                          src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item.product_images[0]}`}
                                          alt="product"
                                          width="80"
                                          height="88"
                                        />
                                      </Link>
                                    </Reveal>
                                  </figure>
                                </td>
                                <td className="product-name">
                                  <div className="product-name-section">
                                    <figure>
                                      <Reveal
                                        keyframes={fadeInRightShorter}
                                        delay={500}
                                        duration={1200}
                                      >
                                        <Link
                                          href={"/product/default/" + item._id}
                                        >
                                          <a>
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
                                      </Reveal>
                                    </figure>
                                  </div>
                                  <div className="product-name-section">
                                    <figure>
                                      <Reveal
                                        keyframes={fadeInRightShorter}
                                        delay={500}
                                        duration={1200}
                                      >
                                        <Link
                                          href={"/product/default/" + item._id}
                                        >
                                          <a>
                                            {item.product_size_name.Thai !==
                                              "ไม่มี" &&
                                              (language === "Thai"
                                                ? item.product_size_name.Thai
                                                : language === "Eng"
                                                ? item.product_size_name.Eng
                                                : language === "China"
                                                ? item.product_size_name.China
                                                : language === "Cambodia"
                                                ? item.product_size_name
                                                    .Cambodia
                                                : language === "Myanmar"
                                                ? item.product_size_name.Myanmar
                                                : item.product_size_name.Laos)}
                                            :{" "}
                                            {language === "Thai"
                                              ? itemSelect.Thai
                                              : language === "Eng"
                                              ? itemSelect.Eng
                                              : language === "China"
                                              ? itemSelect.China
                                              : language === "Cambodia"
                                              ? itemSelect.Cambodia
                                              : language === "Myanmar"
                                              ? itemSelect.Myanmar
                                              : itemSelect.Laos}
                                          </a>
                                        </Link>
                                      </Reveal>
                                    </figure>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  <figure>
                                    <Reveal
                                      keyframes={fadeInRightShorter}
                                      delay={500}
                                      duration={1200}
                                    >
                                      <span className="amount">
                                        ฿ {toDecimal(itemSelect.Price)}{" "}
                                      </span>
                                    </Reveal>
                                  </figure>
                                </td>
                                <td className="product-quantity">
                                  {itemSelect.amount >
                                    parseInt(itemSelect.Stock) && (
                                    <a>
                                      {" "}
                                      <Alert severity="error">
                                        {storeLanguage.Enough}
                                      </Alert>
                                    </a>
                                  )}
                                  <figure>
                                    <Reveal
                                      keyframes={fadeInRightShorter}
                                      delay={500}
                                      duration={1200}
                                    >
                                      <Quantity
                                        qty={itemSelect.amount}
                                        max={parseInt(itemSelect.Stock)}
                                        onChangeQty={(qty) => {
                                          onChangeQty(
                                            itemSelect.Thai,
                                            qty,
                                            itemSelect,
                                            item
                                          );
                                        }}
                                      />

                                      <br />
                                      <a
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        * {storeLanguage.Remaining}{" "}
                                        {itemSelect.Stock}
                                      </a>
                                    </Reveal>
                                  </figure>
                                </td>
                                <td className="product-price">
                                  <figure>
                                    <Reveal
                                      keyframes={fadeInRightShorter}
                                      delay={500}
                                      duration={1200}
                                    >
                                      <span className="amount">
                                        $
                                        {toDecimal(
                                          itemSelect.Price * itemSelect.amount
                                        )}{" "}
                                      </span>
                                    </Reveal>
                                  </figure>
                                </td>

                                <td className="product-close">
                                  <figure>
                                    <Reveal
                                      keyframes={fadeInRightShorter}
                                      delay={500}
                                      duration={1200}
                                    >
                                      {item.product_select_detail.length ===
                                      1 ? (
                                        <IconButton
                                          color="secondary"
                                          aria-label="upload picture"
                                          component="label"
                                          onClick={() => removeCart(item)}
                                        >
                                          <Icon
                                            icon="ic:round-delete-forever"
                                            width="36px"
                                          />
                                        </IconButton>
                                      ) : (
                                        <IconButton
                                          color="secondary"
                                          aria-label="upload picture"
                                          component="label"
                                          onClick={() =>
                                            removeCardDetail({
                                              itemSelect,
                                              item,
                                            })
                                          }
                                        >
                                          <Icon
                                            icon="ic:round-delete-forever"
                                            width="36px"
                                          />
                                        </IconButton>
                                      )}
                                    </Reveal>
                                  </figure>
                                </td>
                              </tr>
                            ))}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className="cart-actions mb-6 pt-4">
                    <Reveal
                      keyframes={fadeInRightShorter}
                      delay={500}
                      duration={1200}
                    >
                      <Link href="/shop">
                        <button className="btn btn-dark btn-md btn-rounded btn-icon-left mr-4 mb-4">
                          <i className="d-icon-arrow-left">
                            <Icon icon="bi:arrow-down-square" rotate={1} />
                          </i>
                          {storeLanguage.Continue}
                        </button>
                      </Link>
                    </Reveal>
                  </div>
                </div>

                <CartTotals
                  router={router}
                  isShopping={isShopping}
                  fetcherWithToken={fetcherWithToken}
                  dispatch={dispatch}
                  currentUser={currentUser}
                />
              </>
            ) : (
              <div className="empty-cart text-center">
                <p> {storeLanguage.Currently}</p>
                <i className="cart-empty d-icon-bag"></i>
                <p className="return-to-shop mb-0">
                  <Link href="/shop">
                    <button className="button wc-backward btn btn-dark btn-md">
                      {storeLanguage.Return}
                    </button>
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
