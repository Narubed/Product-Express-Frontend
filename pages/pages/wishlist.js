/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Helmet from "react-helmet";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import IconButton from "@mui/material/IconButton";
import { setWhiteList } from "~/lib/store/whitelist";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import numeral from "numeral";
import Quickview from "~/components/features/product/common/quickview-modal";
import { setQuickview } from "~/lib/store/model";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/wishlist";

export default function wishlist() {
  const dispatch = useDispatch();
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const whitelist = useSelector((state) => state.whitelist.whitelist);
  const language = useSelector((state) => state.language.language);
  const [isProducts, setProducts] = useState([]);
  const [isOneProduct, setOneProduct] = useState({});
  const [isOpen, setOpen] = useState(false);
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
    getProducts();
  }, [whitelist]);
  const getProducts = async () => {
    const value = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`
    );
    const brands = await axios(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand`
    );
    const { data } = value.data;
    const productPustBrand = [];
    data.forEach((element) => {
      const idx = brands?.data?.data.find(
        (item) => item._id === element.product_brand_id
      );
      productPustBrand.push({ ...element, brand_name: idx.brand_name });
    });

    if (whitelist.length !== 0) {
      const arrayWhiteList = [];
      whitelist.forEach((element) => {
        const findValue = productPustBrand.find((item) => item._id === element);
        if (findValue) {
          arrayWhiteList.push(findValue);
        }
      });
      setProducts(arrayWhiteList);
    }
  };

  const showQuickviewHandler = (props) => {
    setOneProduct(props);
    dispatch(setQuickview(true));
    setOpen(true);
  };

  const deleteWishList = async (item) => {
    const newWhiteList = [];
    whitelist.forEach((element) => {
      if (element !== item._id) {
        newWhiteList.push(element);
      }
    });
    if (newWhiteList.length <= 0) {
      setProducts([]);
    }
    dispatch(setWhiteList(newWhiteList));
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/whitelist/member`;
    await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
      if (res && res.create) {
        const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/whitelist`;
        await fetcherWithToken(urlCart, {
          method: "POST",
          body: JSON.stringify({ whitelist_detail: newWhiteList }),
        });
      } else {
        const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/whitelist/${res.data._id}`;
        await fetcherWithToken(urlCart, {
          method: "PUT",
          body: JSON.stringify({ whitelist_detail: newWhiteList }),
        });
      }
    });
  };

  return (
    <main className="main">
      <Helmet>
        <title>Wishlist | NBA Digital</title>
      </Helmet>
      <h1 className="d-none">NBADigitalservice - Wishlist</h1>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <Link href="/">
                <a>{/* <Icon icon="bx:home" width="22px" /> */}</a>
              </Link>
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </nav>
      <div className="page-content pt-10 pb-10 mb-2">
        <div className="container">
          <Quickview isOpen={isOpen} product={isOneProduct} setOpen={setOpen} />
          {isProducts.length > 0 ? (
            <table className="shop-table wishlist-table mt-2 mb-4">
              <thead>
                <tr>
                  <th className="product-name">
                    <span> {storeLanguage.PRODUCT}</span>
                  </th>
                  <th></th>
                  <th className="product-price">
                    <span> {storeLanguage.PRICE}</span>
                  </th>
                  <th className="product-stock-status">
                    <span>{storeLanguage.STOCKSTATUS}</span>
                  </th>
                  <th className="product-add-to-cart"></th>
                  <th className="product-remove"></th>
                </tr>
              </thead>
              <tbody className="wishlist-items-wrapper">
                {isProducts.map((item) => (
                  <tr key={"wishlist-" + item._id}>
                    <td className="product-thumbnail">
                      <Link href={"/product/default/" + item.slug}>
                        <figure>
                          <LazyLoadImage
                            alt="product"
                            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${item.product_images[0]}`}
                            threshold={500}
                            effect="opacity"
                            width="300"
                            height="338"
                          />
                        </figure>
                      </Link>
                    </td>
                    <td className="product-name">
                      <Link href={"/product/default/" + item._id}>
                        <a>
                          {" "}
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
                    </td>
                    <td className="product-price">
                      {numeral(item.product_size_detail[0].Price).format(
                        "0,00.00"
                      )}
                      {item.product_size_detail.length >= 2 && (
                        <a>
                          -{" "}
                          {numeral(
                            item.product_size_detail[
                              item.product_size_detail.length - 1
                            ].Price
                          ).format("0,0.00")}
                        </a>
                      )}
                    </td>
                    <td className="product-stock-status">
                      <span
                        className={
                          item.stock > 0
                            ? "wishlist-in-stock"
                            : "wishlist-out-stock"
                        }
                      >
                        {item.product_status
                          ? storeLanguage.InStock
                          : storeLanguage.OutofStock}
                      </span>
                    </td>
                    <td className="product-add-to-cart">
                      {item.product_status ? (
                        <button
                          onClick={() => showQuickviewHandler(item)}
                          className="btn-product btn-primary"
                          style={{ cursor: "pointer" }}
                        >
                          <span>{storeLanguage.SelectOptions}</span>
                        </button>
                      ) : (
                        <a href="#">
                          <button
                            style={{
                              cursor: "pointer",
                              backgroundColor: "red",
                            }}
                            className="btn-product btn-error"
                            onClick={(e) => deleteWishList(item)}
                          >
                            <span>{storeLanguage.RemoveCard}</span>
                          </button>
                        </a>
                      )}
                    </td>
                    <td className="product-remove">
                      <div>
                        <i className="fas fa-times">
                          <IconButton
                            onClick={() => deleteWishList(item)}
                            color="error"
                          >
                            <Icon icon="fluent:delete-dismiss-28-filled" />
                          </IconButton>
                        </i>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-cart text-center">
              <i className="cart-empty d-icon-heart"></i>
              <p>No products added to the wishlist.</p>
              <p className="return-to-shop mb-0">
                <Link href="/shop">
                  <button className="button wc-backward btn btn-dark btn-md">
                    Return to shop
                  </button>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
