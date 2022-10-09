/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { getTotalPrice, getCartCount, toDecimal } from "~/utils";
import { Box, MenuItem, Stack, IconButton, Badge } from "@mui/material";

export default function componentName(props) {
  const { cartList, removeFromCart } = props;
  const router = useRouter();

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

  const removeCart = (item) => {
    removeFromCart(item);
  };

  return (
    <>
      <IconButton>
        <Icon icon="bxs:user" width="32" height="32" color="#FFFFFF" />
      </IconButton>
      <IconButton>
        <Badge badgeContent={20} color="warning">
          <Icon
            icon="akar-icons:heart"
            width="32"
            height="32"
            color="#FFFFFF"
          />
        </Badge>
      </IconButton>
      <div className="dropdown cart-dropdown type2 cart-offcanvas mr-0">
        <a href="#" className="cart-toggle link" onClick={showCartMenu}>
          <i className="d-icon-bag">
            {/* <span className="cart-count">{getCartCount(cartList)}</span> */}

            <IconButton sx={{ textAlign: "center" }}>
              <Badge badgeContent={100} color="secondary">
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
            <h4 className="cart-title">Shopping Cart</h4>
            <Link href="#">
              <button
                className="btn btn-dark btn-link btn-icon-right btn-close"
                onClick={hideCartMenu}
              >
                close<i className="d-icon-arrow-right"></i>
                <span className="sr-only">Cart</span>
              </button>
            </Link>
          </div>

          <p className="mt-4 text-center font-weight-semi-bold ls-normal text-body">
            No products in the cart.
          </p>
        </div>
      </div>
    </>
  );
}
