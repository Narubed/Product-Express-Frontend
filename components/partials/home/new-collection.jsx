import axios from "axios";
import React, { useState, useEffect } from "react";

import ProductTwo from "~/components/features/product/product-two";
import { useSelector, useDispatch } from "react-redux";
import UseLanguage from "~/lib/hook/useLanguage";

import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/components/partials/home/new-collection";

function BestCollection(props) {
  const [loading, setLoading] = useState(true);
  const [isProducts, setProducts] = useState([]);
  const { products } = props;

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

  console.log(loading);

  useEffect(() => {
    searchProduct();
  }, []);

  const searchProduct = async () => {
    const products = await axios(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`
    );
    const filterNew = products.data.data.filter(
      (item) => item.product_tag === "New"
    );
    setProducts(filterNew);
    setLoading(false);
  };

  return (
    <section className="products-wrapper mt-2 pt-2 mb-4 pb-2">
      <div className="container">
        <h2 className="title title-bg mb-4">
          <b>{storeLanguage.NewArrivals}</b>
          <em>{storeLanguage.NewArrivals}</em>
        </h2>

        <div className="row cols-2 cols-lg-4 cols-md-3 cols-sm-2">
          {loading
            ? [1, 2, 3, 4].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={"best-selling-skel-" + item}
                ></div>
              ))
            : isProducts &&
              isProducts
                .slice(0, 4)
                .map((item, index) => (
                  <ProductTwo
                    product={item}
                    isCategory={false}
                    key={`top-selling-product ${index}`}
                  />
                ))}
        </div>
      </div>
    </section>
  );
}

export default BestCollection;
