/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

// import { setQuickview } from "~/lib/store/model";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setWhiteList } from "~/lib/store/whitelist";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { setModelLogin } from "~/lib/store/model.login";

export default function addcart({ product }) {
  const dispatch = useDispatch();
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const whitelist = useSelector((state) => state.whitelist.whitelist);

  const checkLogin = () => {
    if (currentUser) {
      addWhiteList();
    } else {
      // dispatch(setQuickview(false));
      dispatch(setModelLogin(true));
    }
  };

  const addWhiteList = async () => {
    const newWhiteList = [];
    if (whitelist.length === 0) {
      newWhiteList.push(product._id);
    } else {
      whitelist.map((value) => {
        newWhiteList.push(value);
      });
      const findWhiteList = newWhiteList.find((item) => item === product._id);
      if (!findWhiteList) {
        newWhiteList.push(product._id);
      }
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
    <div>
      <button
        className="btn-product-icon btn-wishlist"
        title="Add to wishlist"
        style={{ cursor: "pointer" }}
        onClick={checkLogin}
      >
        <Icon icon="ant-design:heart-outlined" />
      </button>
    </div>
  );
}
