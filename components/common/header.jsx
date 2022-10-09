import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Box, MenuItem, Stack, IconButton } from "@mui/material";
import LanguagePopover from "~/components/common/menuLanguage/LanguagePopover";

import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
// import SearchBox from '~/components/common/partials/search-box';
// import LoginModal from "~/components/features/modals/login-modal";

import { headerBorderRemoveList } from "~/utils/data/menu";

export default function Header(props) {
  const router = useRouter();

  useEffect(() => {
    let header = document.querySelector("header");
    if (header) {
      if (headerBorderRemoveList.includes(router.pathname))
        header.classList.add("header-transparent");
      else if (
        !headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains("header-transparent")
      )
        document.querySelector("header").classList.remove("header-transparent");
    }
  }, [router.pathname]);

  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header">
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <Link href="#">
              <a className="mobile-menu-toggle" onClick={showMobileMenu}>
                <Icon icon="fontisto:nav-icon-list-a" />
              </a>
            </Link>

            <Link href="/">
              <a className="logo">
                <Image
                  src="https://d-themes.com/react/riode/demo-sport/images/home/logo-footer.png"
                  alt="logo"
                  width="154"
                  height="43"
                />
              </a>
            </Link>

            <MainMenu />

            <span className="divider d-lg-show"></span>

            {/* <SearchBox adClass="d-lg-show" /> */}
          </div>

          <div className="header-right">
            {/* <SearchBox adClass="d-lg-none mr-4" /> */}

            <a href="tel:0800000000" className="call d-lg-show mr-4">
              <div className="icon-box-icon">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content">
                <span>(083) 080-0000</span>
              </div>
            </a>

            <span className="divider"></span>

            {/* <LoginModal /> */}
           
            <Link href="/pages/wishlist">
              <a className="wishlist mr-4">
                <i className="d-icon-heart"></i>
              </a>
            </Link>

            <CartMenu />
            <LanguagePopover />
          </div>
        </div>
      </div>
    </header>
  );
}
