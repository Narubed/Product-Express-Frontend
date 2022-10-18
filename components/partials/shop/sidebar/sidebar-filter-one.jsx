import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { scrollTopHandler } from "~/utils";
import Link from "next/link";
import Card from "@mui/material/Card";
import { Tree } from "primereact/tree";
import TreeSelectionDemo from "./partials/treeSelection";
import { Icon } from "@iconify/react";
import { setFilterPrice } from "@/lib/store/filterPrice";
export default function SidebarFilterOne(props) {
  const language = useSelector((state) => state.language.language);
  const dispatch = useDispatch();
  const router = useRouter();
  const { type = "left", isFeatured = false, isType, isBrand } = props;

  const query = router.query;
  let timerId;
  let tmpPrice = {
    max: query.max_price ? parseInt(query.max_price) : 1000,
    min: query.min_price ? parseInt(query.min_price) : 0,
  };
  const [filterPrice, setPrice] = useState(tmpPrice);
  const [isFirst, setFirst] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", hideSidebar);

    return () => {
      window.removeEventListener("resize", hideSidebar);
    };
  }, []);

  useEffect(() => {
    setPrice({
      max: query.max_price ? parseInt(query.max_price) : 1000,
      min: query.min_price ? parseInt(query.min_price) : 0,
    });
    if (isFirst) {
      setFirst(false);
    } else {
      scrollTopHandler();
    }
  }, [query]);

  const showSidebar = (e) => {
    e.preventDefault();
    document.querySelector("body").classList.add("sidebar-active");
  };

  const hideSidebar = () => {
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" ||
          type === "off-canvas" ||
          type === "boxed" ||
          type === "banner"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );
  };
  const toggleSidebar = (e) => {
    e.preventDefault();
    document
      .querySelector("body")
      .classList.remove(
        `${
          type === "left" || type === "off-canvas"
            ? "sidebar-active"
            : "right-sidebar-active"
        }`
      );

    let stickyWraper = e.currentTarget.closest(".sticky-sidebar-wrapper");

    let mainContent = e.currentTarget.closest(".main-content-wrap");
    if (mainContent && type !== "off-canvas" && query.grid !== "4cols")
      mainContent.querySelector(".row.product-wrapper") &&
        mainContent
          .querySelector(".row.product-wrapper")
          .classList.toggle("cols-md-4");

    if (mainContent && stickyWraper) {
      stickyWraper.classList.toggle("closed");

      if (stickyWraper.classList.contains("closed")) {
        mainContent.classList.add("overflow-hidden");
        clearTimeout(timerId);
      } else {
        timerId = setTimeout(() => {
          mainContent.classList.remove("overflow-hidden");
        }, 500);
      }
    }
  };

  const cleanAllButton = () => {
    router.push(router.pathname);

    dispatch(setFilterPrice([10, 50000]));
  };

  return (
    <aside
      className={`col-lg-3 shop-sidebar skeleton-body ${
        type === "off-canvas" ? "" : "sidebar-fixed sticky-sidebar-wrapper"
      } ${
        type === "off-canvas" || type === "boxed" ? "" : "sidebar-toggle-remain"
      } ${
        type === "left" ||
        type === "off-canvas" ||
        type === "boxed" ||
        type === "banner"
          ? "sidebar"
          : "right-sidebar"
      }`}
    >
      <div className="sidebar-overlay">
        <a onClick={hideSidebar}>
          <Icon icon="bi:arrow-up" rotate={1} />
        </a>
      </div>
      {type === "boxed" || type === "banner" ? (
        <a href="#" className="sidebar-toggle" onClick={showSidebar}>
          <i className="fas fa-chevron-right"></i>
        </a>
      ) : (
        ""
      )}
      <Link href="#">
        <a onClick={hideSidebar} className="sidebar-close"></a>
      </Link>
      <div className="sidebar-content">
        {!loading ? (
          <div className="sticky-sidebar">
            {type === "boxed" || type === "banner" ? (
              ""
            ) : (
              <div className="filter-actions mb-4">
                <a
                  href="#"
                  className="sidebar-toggle-btn toggle-remain btn btn-outline btn-primary btn-icon-right btn-rounded"
                  onClick={toggleSidebar}
                >
                  {language === "Thai"
                    ? "ตัวกรอง"
                    : language === "Eng"
                    ? "Filter"
                    : language === "China"
                    ? "篩選"
                    : language === "Cambodia"
                    ? "តម្រង"
                    : language === "Myanmar"
                    ? "ဇကာ"
                    : "ການກັ່ນຕອງ"}
                  {type === "left" || type === "off-canvas" ? (
                    <i className="d-icon-arrow-left">
                      <Icon icon="bi:arrow-up" rotate={3} />
                    </i>
                  ) : (
                    <i className="d-icon-arrow-right">
                      <Icon icon="bi:arrow-up" rotate={3} />
                    </i>
                  )}
                </a>
                {/* <Link
                  href={{
                    pathname: router.pathname,
                  }}
                > */}
                <button
                  scroll={false}
                  className="filter-clean"
                  onClick={cleanAllButton}
                >
                  {language === "Thai"
                    ? "ล้างทั้งหมด"
                    : language === "Eng"
                    ? "Clear All"
                    : language === "China"
                    ? "清除所有"
                    : language === "Cambodia"
                    ? "លុបចេញ​ទាំងអស់"
                    : language === "Myanmar"
                    ? "အားလုံးကိုရှင်း"
                    : "ລຶບລ້າງທັງໝົດ"}
                </button>
                {/* </Link> */}
              </div>
            )}
            <div className="widget widget-collapsible">
              <TreeSelectionDemo isType={isType} isBrand={isBrand} />
            </div>
          </div>
        ) : (
          <div className="widget-2 mt-10 pt-5"></div>
        )}
      </div>
    </aside>
  );
}
