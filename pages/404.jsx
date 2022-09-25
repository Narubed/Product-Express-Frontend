import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import Image from "next/image";
import Link from "next/link";
import image404 from "../public/images/subpages/404.png";
import { parallaxHandler } from "~/utils";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "@/lib/language-pages/404";
import UseLanguage from "~/lib/hook/useLanguage";
import { useSelector, useDispatch } from "react-redux";

function Error404() {
  const language = useSelector((state) => state.language.language);
  const [storeLanguage, setLanguage] = useState({});

  useEffect(() => {
    window.addEventListener("scroll", parallaxHandler, true);
    return () => {
      window.removeEventListener("scroll", parallaxHandler, true);
    };
  }, []);

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
    <main className="main">
      <Helmet>
        <title>Error | 404</title>
      </Helmet>

      <h1 className="d-none">Error - 404</h1>

      <div className="page-content">
        <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
          <h1 className="mb-2 ls-m">Error 404</h1>
          <Image src={image404.src} alt="error 404" width="609" height="131" />
          <h4 className="mt-7 mb-0 ls-m text-uppercase">
            {storeLanguage?.pages_found}
          </h4>
          <p className="text-grey font-primary ls-m">
            {storeLanguage?.pages_found_detail}
          </p>
          <Link href="/">
            <button className="btn btn-primary btn-rounded mb-4">
              <a>{storeLanguage?.button_back}</a>
            </button>
          </Link>
        </section>
      </div>
    </main>
  );
}

export default React.memo(Error404);
