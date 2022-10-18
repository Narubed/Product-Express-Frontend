import { useRouter } from "next/router";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
// import SidebarFilterThree from "~/components/partials/shop/sidebar/sidebar-filter-three";

export default function ToolBox(props) {
  const { type = "left" } = props;
  const router = useRouter();
  const query = router.query;
  const language = useSelector((state) => state.language.language);
  const gridType = query.type ? query.type : "grid";
  const sortBy = query.sortby ? query.sortby : "default";
  const perPage = query.per_page ? query.per_page : 3;
  let tmp = 0;

  useEffect(() => {
    window.addEventListener("scroll", stickyToolboxHandler);

    return () => {
      window.removeEventListener("scroll", stickyToolboxHandler);
    };
  }, []);

  const onChangeAttri = (e, attri) => {
    e.preventDefault();
    let url = router.pathname.replace("[grid]", query.grid);
    let arr = [`${attri}=${e.target.value}`, "page=1"];
    for (let key in query) {
      if (key !== attri && key !== "page" && key !== "grid")
        arr.push(key + "=" + query[key]);
    }
    url = url + "?" + arr.join("&");
    router.push(url);
  };

  const showSidebar = () => {
    if (type === "navigation" && window.innerWidth > 991) {
      document.querySelector(".navigation-toggle-btn").click();
    } else {
      document
        .querySelector("body")
        .classList.add(
          `${
            type === "left" ||
            type === "off-canvas" ||
            type === "navigation" ||
            type === "horizontal"
              ? "sidebar-active"
              : "right-sidebar-active"
          }`
        );
    }
  };

  const stickyToolboxHandler = (e) => {
    let top = document.querySelector(".page-content")
      ? document.querySelector(".page-content").offsetTop +
        document.querySelector("header").offsetHeight +
        100
      : 600;
    let stickyToolbox = document.querySelector(".sticky-toolbox");
    let height = 0;

    if (stickyToolbox) {
      height = stickyToolbox.offsetHeight;
    }

    if (
      window.pageYOffset >= top &&
      window.innerWidth < 768 &&
      e.currentTarget.scrollY < tmp
    ) {
      if (stickyToolbox) {
        stickyToolbox.classList.add("fixed");
        if (!document.querySelector(".sticky-toolbox-wrapper")) {
          let newNode = document.createElement("div");
          newNode.className = "sticky-toolbox-wrapper";
          stickyToolbox.parentNode.insertBefore(newNode, stickyToolbox);
          document
            .querySelector(".sticky-toolbox-wrapper")
            .insertAdjacentElement("beforeend", stickyToolbox);
          document
            .querySelector(".sticky-toolbox-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }

        if (
          !document
            .querySelector(".sticky-toolbox-wrapper")
            .getAttribute("style")
        ) {
          document
            .querySelector(".sticky-toolbox-wrapper")
            .setAttribute("style", "height: " + height + "px");
        }
      }
    } else {
      if (stickyToolbox) {
        stickyToolbox.classList.remove("fixed");
      }

      if (document.querySelector(".sticky-toolbox-wrapper")) {
        document
          .querySelector(".sticky-toolbox-wrapper")
          .removeAttribute("style");
      }
    }

    if (
      window.outerWidth > 767 &&
      document.querySelector(".sticky-toolbox-wrapper")
    ) {
      document.querySelector(".sticky-toolbox-wrapper").style.height = "auto";
    }

    tmp = e.currentTarget.scrollY;
  };

  return (
    <nav
      className={`toolbox sticky-toolbox sticky-content fix-top ${
        type === "horizontal" ? "toolbox-horizontal" : ""
      } ${type === "boxed" ? "pt-4" : ""}`}
    >
      {type === "horizontal" ? "<SidebarFilterThree />" : ""}
      <div className="toolbox-left">
        {type === "left" ||
        type === "off-canvas" ||
        type === "navigation" ||
        type === "horizontal" ? (
          <Link href="#">
            <button
              className={`toolbox-item left-sidebar-toggle btn btn-outline btn-rounded btn-sm ${
                type === "navigation"
                  ? "btn-dark btn-icon-left font-primary"
                  : "btn-icon-right btn-primary"
              } ${
                type === "off-canvas" || type === "navigation"
                  ? ""
                  : "d-lg-none"
              }`}
              onClick={showSidebar}
            >
              {type === "navigation" ? (
                <i className="d-icon-filter-2">456</i>
              ) : (
                ""
              )}
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
              {type === "navigation" ? (
                ""
              ) : (
                <i className="d-icon-arrow-right">
                  <Icon icon="bi:arrow-up" rotate={1} />
                </i>
              )}
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>

      <div className="toolbox-right">
        <div
          className={`toolbox-item toolbox-layout ${
            type === "right" ? "mr-lg-0" : ""
          }`}
        >
          {/* <Link
            href={{
              pathname: router.pathname,
              query: { ...query, type: "list" },
            }}
          >
            <IconButton
              scroll={false}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <Icon icon="bi:grid-1x2-fill" width="24px" />
            </IconButton>
          </Link> */}
          <Link
            href={{
              pathname: router.pathname,
              query: { ...query, type: "grid" },
            }}
          >
            <IconButton
              scroll={false}
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <Icon icon="fa-solid:th-list" width="24px" />
            </IconButton>
          </Link>
        </div>

        {type === "right" ? (
          <Link href="#">
            <button
              className="toolbox-item right-sidebar-toggle btn btn-sm btn-outline btn-primary btn-rounded btn-icon-right d-lg-none"
              onClick={showSidebar}
            >
              Filter<i className="d-icon-arrow-left"></i>
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}
