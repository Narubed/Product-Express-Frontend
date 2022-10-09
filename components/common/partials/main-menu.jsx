import { useRouter } from "next/router";

import Link from "next/link";

import { mainMenu } from "~/utils/data/menu";
import { Icon } from "@iconify/react";

function MainMenu() {
  const pathname = useRouter().pathname;

  return (
    <nav className="main-nav mr-4">
      <ul className="menu menu-active-underline">
        <li id="menu-home" className={pathname === "/" ? "active" : ""}>
          <Link href="/">Home</Link>
        </li>

        <li className={`  ${pathname.includes("/shop") ? "active" : ""}`}>
          <Link href="/shop">
            <a style={{ display: "flex", alignItems: "center" }}>
              shop
              <Icon icon="dashicons:arrow-down-alt2" width="14" height="14" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
