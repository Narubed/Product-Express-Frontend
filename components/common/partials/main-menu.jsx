import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import { mainMenu } from "~/utils/data/menu";
import { Icon } from "@iconify/react";

import { useSelector, useDispatch } from "react-redux";
import UseLanguage from "~/lib/hook/useLanguage";

import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/menu";

function MainMenu() {
  const pathname = useRouter().pathname;
  const language = useSelector((state) => state.language.language);

  const [storeLanguage, setLanguage] = useState({});

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

  return (
    <nav className="main-nav mr-4">
      <ul className="menu menu-active-underline">
        <li id="menu-home" className={pathname === "/" ? "active" : ""}>
          <Link href="/">
            <a>{storeLanguage?.Home}</a>
          </Link>
        </li>

        <li className={`${pathname.includes("/shop") ? "active" : ""}`}>
          <Link href="/shop">
            <a style={{ display: "flex", alignItems: "center" }}>
              {storeLanguage?.Products}
              <Icon icon="dashicons:arrow-down-alt2" width="14" height="14" />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainMenu;
