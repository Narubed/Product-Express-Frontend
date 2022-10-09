/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import MobileMenu from "~/components/common/partials/mobile-menu";

import {
  showScrollTopHandler,
  scrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
} from "~/utils";

export default function componentName({ children, closeQuickview }) {
  const router = useRouter();

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
        <Footer />
      </div>
      <button
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="scroll-top"
        onClick={() => scrollTopHandler(false)}
      >
        <i className="d-icon-arrow-up"></i>
        11
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
    </>
  );
}
