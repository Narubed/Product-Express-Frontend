import React, { useEffect } from "react";
import Helmet from "react-helmet";
import Image from "next/image";
import ALink from '~/components/features/custom-link';
import image404 from "../public/images/subpages/404.png";
import { parallaxHandler } from "~/utils";

function Error404() {
  useEffect(() => {
    window.addEventListener("scroll", parallaxHandler, true);

    return () => {
      window.removeEventListener("scroll", parallaxHandler, true);
    };
  }, []);

  return (
    <main className="main">
      <Helmet>
        <title>Riode React eCommerce Template | 404</title>
      </Helmet>

      <h1 className="d-none">Riode React eCommerce Template - 404</h1>

      <div className="page-content">
        <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
          <h1 className="mb-2 ls-m">Error 404</h1>
          <Image src={image404.src} alt="error 404" width="609" height="131" />
          <h4 className="mt-7 mb-0 ls-m text-uppercase">
            ไม่มีหน้าที่ต้องการค้นหา.
          </h4>
          <p className="text-grey font-primary ls-m">
            It looks like nothing was found at this location.
          </p>
          <ALink href="/" className="btn btn-primary btn-rounded mb-4">Go home</ALink>
        </section>
      </div>
    </main>
  );
}

export default React.memo(Error404);
