/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import MobileMenu from "~/components/common/partials/mobile-menu";
import Quickview from "~/components/features/product/common/quickview-modal";
import Loading from "@/components/common/loading";

import { setQuickview } from "~/lib/store/model";
import { Icon } from "@iconify/react";
import {
  showScrollTopHandler,
  scrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
} from "~/utils";

import { setToken } from "@/lib/store/session";
import useCurrentUser from "@/lib/hook/useCurrentUser";

export default function componentName({ children, closeQuickview }) {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(setToken(jwt));
  }, []);

  //   useLayoutEffect(() => {
  //     document.querySelector("body").classList.remove("loaded");
  //   }, [router.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", showScrollTopHandler, true);
    window.addEventListener("scroll", stickyHeaderHandler, true);
    window.addEventListener("scroll", stickyFooterHandler, true);
    window.addEventListener("resize", stickyHeaderHandler, true);
    window.addEventListener("resize", stickyFooterHandler, true);

    return () => {
      window.removeEventListener("scroll", showScrollTopHandler, true);
      window.removeEventListener("scroll", stickyHeaderHandler, true);
      window.removeEventListener("scroll", stickyFooterHandler, true);
      window.removeEventListener("resize", stickyHeaderHandler, true);
      window.removeEventListener("resize", stickyFooterHandler, true);
    };
  }, []);

  useEffect(() => {
    // closeQuickview();

    let bodyClasses = [...document.querySelector("body").classList];
    for (let i = 0; i < bodyClasses.length; i++) {
      document.querySelector("body").classList.remove(bodyClasses[i]);
    }

    setTimeout(() => {
      document
        .querySelector("body")
        .classList.add("loaded", "riode-rounded-skin");
    }, 50);
  }, [router.pathname]);

  return (
    <>
      <div className="page-wrapper">
    
        <Header />
   
        {children}
        <Loading />
        <Footer />
      </div>
      <button
        style={{
          background: "purple",
          cursor: "pointer",
          borderRadius: "15px",
        }}
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="scroll-top"
        onClick={() => scrollTopHandler(false)}
      >
        <Icon icon="el:arrow-up" color="#FFFFFF" />
      </button>

      <MobileMenu />

      <ToastContainer
        autoClose={3000}
        duration={300}
        newestOnTo={true}
        className="toast-container"
        position="bottom-left"
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <Quickview />
    </>
  );
}
