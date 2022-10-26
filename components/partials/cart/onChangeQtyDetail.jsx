import React from "react";

import { setCartShopping } from "~/lib/store/cartshopping";

export default async function onChangeQtyDetail(props) {
  const {
    item,
    name,
    qty,
    itemSelect,
    cartItems,
    isShopping,
    dispatch,
    fetcherWithToken,
    setLoading,
  } = props;
  dispatch(setLoading(true));

  const newShopping = [];
  isShopping.forEach((element) => {
    if (element._id === item._id) {
      const newDetail = [];
      element.product_select_detail.map((item) => {
        if (item.Thai === name) {
          newDetail.push({ ...item, amount: qty });
        } else {
          newDetail.push(item);
        }
      });
      newShopping.push({ ...element, product_select_detail: newDetail });
    } else {
      newShopping.push(element);
    }
  });
  dispatch(setCartShopping(newShopping));
  const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
  await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
    const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
    await fetcherWithToken(urlCart, {
      method: "PUT",
      body: JSON.stringify({ shopping_detail: newShopping }),
    });
  });
  dispatch(setLoading(false));
}
