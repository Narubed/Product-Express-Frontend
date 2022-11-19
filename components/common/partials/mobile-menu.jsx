/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// import Card from "~/components/features/accordion/card";
import { mainMenu } from "~/utils/data/menu";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import UseLanguage from "~/lib/hook/useLanguage";

import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/menu";

export default function componentName(props) {
  const language = useSelector((state) => state.language.language);
  const [storeLanguage, setLanguage] = useState({});
  const [search, setSearch] = useState("");
  const [timer, setTimer] = useState(null);
  const router = useRouter();

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
    window.addEventListener("resize", hideMobileMenuHandler);
    document.querySelector("body").addEventListener("click", onBodyClick);

    return () => {
      window.removeEventListener("resize", hideMobileMenuHandler);
      document.querySelector("body").removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    setSearch("");
  }, [router.query.slug]);

  const hideMobileMenuHandler = () => {
    if (window.innerWidth > 991) {
      document.querySelector("body").classList.remove("mmenu-active");
    }
  };

  const hideMobileMenu = () => {
    document.querySelector("body").classList.remove("mmenu-active");
  };

  function onSearchChange(e) {
    setSearch(e.target.value);
  }

  function onBodyClick(e) {
    if (e.target.closest(".header-search"))
      return (
        e.target.closest(".header-search").classList.contains("show-results") ||
        e.target.closest(".header-search").classList.add("show-results")
      );

    document.querySelector(".header-search.show") &&
      document.querySelector(".header-search.show").classList.remove("show");
    document.querySelector(".header-search.show-results") &&
      document
        .querySelector(".header-search.show-results")
        .classList.remove("show-results");
  }

  function onSubmitSearchForm(e) {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: {
        search: search,
      },
    });
  }
  return (
    <>
      <div className="mobile-menu-wrapper">
        <div className="mobile-menu-overlay" onClick={hideMobileMenu}></div>

        <Link href="#">
          <a className="mobile-menu-close" onClick={hideMobileMenu}>
            <Icon icon="akar-icons:circle-x-fill" width="26" height="26" />
          </a>
        </Link>

        <div className="mobile-menu-container scrollable">
          {/* <form
            action="#"
            className="input-wrapper"
            onSubmit={onSubmitSearchForm}
          >
            <input
              type="text"
              className="form-control"
              name="search"
              autoComplete="off"
              value={search}
              onChange={onSearchChange}
              placeholder="Search your keyword..."
              required
            />
            <button className="btn btn-search" type="submit">
              <i className="d-icon-search">1111</i>
              1111
            </button>
          </form> */}
          <ul className="mobile-menu mmenu-anim">
            <li>
              <Link href="/">
                <a> {storeLanguage?.Home}</a>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <a>{storeLanguage?.Products}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
