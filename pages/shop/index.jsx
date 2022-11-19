import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Helmet } from "react-helmet";
import axios from "axios";

import ShopBanner from "~/components/partials/shop/shop-banner";
import SidebarFilterOne from "~/components/partials/shop/sidebar/sidebar-filter-one";
import ProductListTwo from "~/components/partials/shop/product-list/product-list-two";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/lib/store/loading";

function ShopNavigationFilter() {
  const price = useSelector((state) => state.filterPrice.price);
  const dispatch = useDispatch();
  const router = useRouter();
  const query = router.query;
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isType, setType] = useState([]);
  const [isBrand, setBrand] = useState([]);
  useEffect(() => {
    funcFindProduct();
  }, [query]);

  const funcFindProduct = async () => {
    dispatch(setLoading(true));
    const products = await axios(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`
    );
    const brands = await axios(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand`
    );
    const types = await axios(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type`
    );
    setType(types.data.data);
    setBrand(brands.data.data);
    const filterStatusProduct = products.data.data.filter(
      (item) => item.product_status === true
    );
    const productPustBrand = [];
    filterStatusProduct.forEach((element) => {
      const idx = brands?.data?.data.find(
        (item) => item._id === element.product_brand_id
      );
      productPustBrand.push({ ...element, brand_name: idx.brand_name });
    });

    if (query.istype || query.isbrands) {
      const findArrayProductType = [];
      if (query.istype && query.isbrands) {
        const newArray = [];
        productPustBrand.forEach((element) => {
          const data = element.product_type_id.find(
            (item) => item === query.istype
          );
          if (data) {
            newArray.push(element);
          }
        });
        newArray.forEach((element) => {
          const idx = element.product_brand_id === query.isbrands;
          if (idx) {
            findArrayProductType.push(element);
          }
        });
      } else if (query.istype) {
        productPustBrand.forEach((element) => {
          const idx = element.product_type_id.filter(
            (item) => item === query.istype
          );
          if (idx.length !== 0) {
            findArrayProductType.push(element);
          }
        });
      } else {
        if (query.isbrands) {
          productPustBrand.forEach((element) => {
            const idx = element.product_brand_id === query.isbrands;
            if (idx) {
              findArrayProductType.push(element);
            }
          });
        }
      }
      setProducts(findArrayProductType);
      setNewProducts(findArrayProductType);
    } else {
      setProducts(productPustBrand);
      setNewProducts(productPustBrand);
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    const newSelectPrice = [];
    products.forEach((element) => {
      const idx = element.product_size_detail.filter(
        (item) => item.Price > price[0] && item.Price < price[1]
      );
      if (idx.length !== 0) {
        newSelectPrice.push(element);
      }
    });
    setNewProducts(newSelectPrice);
  }, [price]);
  return (
    <main className="main navigation-filter">
      <Helmet>
        <title> Shop Navigation Filter - NBADigitalservice</title>
      </Helmet>

      <h1 className="d-none">Shop Navigation Filter- NBADigitalservice</h1>

      <ShopBanner title="Shop" current="Shop" />

      <div className="page-content mb-10 pb-3">
        <div className="container">
          <div className="row main-content-wrap gutter-lg">
            <SidebarFilterOne isType={isType} isBrand={isBrand} />
            <div className="col-lg-9 main-content">
              <ProductListTwo products={newProducts} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShopNavigationFilter;
