/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";

import { setQuickview } from "~/lib/store/model";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import Quickview from "~/components/features/product/common/quickview-modal";

export default function addcart({ product }) {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const showQuickviewHandler = () => {
    dispatch(setQuickview(true));
    setOpen(true);
  };

  return (
    <div>
      <Quickview isOpen={isOpen} product={product} setOpen={setOpen} />
      <button
        className="btn-product-icon btn-cart"
        title="Add to cart"
        style={{ cursor: "pointer" }}
        onClick={showQuickviewHandler}
      >
        <Icon icon="akar-icons:shopping-bag" />
      </button>
    </div>
  );
}
