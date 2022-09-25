import Link from "next/link";
// import CartMenu from "~/components/common/partials/cart-menu";
import MainMenu from "~/components/common/partials/main-menu";
// import SearchBox from "~/components/common/partials/search-box";
// import LoginModal from '~/components/features/modals/login-modal';
import LanguagePopover from "~/components/common/menuLanguage/LanguagePopover";
import Image from "next/image";
import Logo from "~/public/images/home/logo.png";
export default function Header(props) {
  const showMobileMenu = () => {
    document.querySelector("body").classList.add("mmenu-active");
  };

  return (
    <header className="header">
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container-fluid">
          <div className="header-left">
            <Link href="#">
              <a className="mobile-menu-toggle" onClick={showMobileMenu}>
                <i className="d-icon-bars2"></i>
              </a>
            </Link>

            <Link href="/">
              <a style={{paddingRight: '10px'}}>
                <Image
                  className="logo"
                  src={Logo.src}
                  alt="logo"
                  width="153"
                  height="44"
                />
              </a>
            </Link>

            <MainMenu />
          </div>

          <div className="header-center"></div>

          <div className="header-right">
            {/* <SearchBox /> */}

            {/* <LoginModal /> */}
            <LanguagePopover />
            <Link href="/pages/wishlist">
              <div className="wishlist mr-4 d-lg-show">
                <i className="d-icon-heart"></i>
              </div>
            </Link>

            {/* <CartMenu /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
