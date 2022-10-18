import { useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import ToolBox from "~/components/partials/shop/toolbox";
import ProductTwo from "~/components/features/product/product-two";
import { useSelector } from "react-redux";
// import ProductEight from '~/components/features/product/product-eight';

function ProductListTwo({ products }) {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  const loading = useSelector((state) => state.loading.loading);
  const perPage = query.per_page ? parseInt(query.per_page) : 12;
  const [loadedCount, setLoadedCount] = useState(perPage);
  //   const totalCount = data && data.products.total;
  const gridType = query.type ? query.type : "grid";

  useEffect(() => {
    setLoadedCount(perPage);
  }, [query]);

  const productLoadHandler = () => {
    setTimeout(() => {
      loadMoreProducts({
        variables: {
          search: query.search,
          colors: query.colors ? query.colors.split(",") : [],
          sizes: query.sizes ? query.sizes.split(",") : [],
          brands: query.brands ? query.brands.split(",") : [],
          min_price: parseInt(query.min_price),
          max_price: parseInt(query.max_price),
          category: query.category,
          tag: query.tag,
          sortBy: query.sortby,
          from: products.length,
          to: products.length + 3,
        },
      });
    }, 1500);
  };

  useEffect(() => {
    // getInitData({
    //   variables: {
    //     search: query.search,
    //     colors: query.colors ? query.colors.split(",") : [],
    //     sizes: query.sizes ? query.sizes.split(",") : [],
    //     brands: query.brands ? query.brands.split(",") : [],
    //     min_price: parseInt(query.min_price),
    //     max_price: parseInt(query.max_price),
    //     category: query.category,
    //     tag: query.tag,
    //     sortBy: query.sortby,
    //     from: 0,
    //     to: loadedCount,
    //   },
    // });
  }, [query]);

  return (
    <div>
      <ToolBox />
      <InfiniteScroll
        dataLength={products ? products.length : 0}
        // next={productLoadHandler}
        style={{ overflow: "visible" }}
        // hasMore={products.length >= totalCount ? false : true}
        loader={<div className="d-loading"></div>}
      >
        {loading ? (
          gridType === "grid" ? (
            <div className={`row product-wrapper cols-2 cols-sm-3`}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div
                  className="product-loading-overlay"
                  key={"popup-skel-" + item}
                ></div>
              ))}
            </div>
          ) : (
            <div className="row product-wrapper skeleton-body cols-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div
                  className="skel-pro skel-pro-list mb-4"
                  key={"list-skel-" + item}
                ></div>
              ))}
            </div>
          )
        ) : (
          ""
        )}
        {gridType === "grid" ? (
          <div className={`row product-wrapper cols-2 cols-sm-3`}>
            {products.length > 0 &&
              products.map((item) => (
                <div className="product-wrap" key={"shop-" + item._id}>
                  <ProductTwo product={item} adClass="" />
                </div>
              ))}
          </div>
        ) : (
          <div className="product-lists product-wrapper">
            {products.length > 0 &&
              products.map((item) => ({
                /* <ProductEight product={item} key={"shop-list-" + item.slug} /> */
              }))}
          </div>
        )}

        {products && products.length === 0 ? (
          <p className="ml-1">
            No products were found matching your selection.
          </p>
        ) : (
          ""
        )}
      </InfiniteScroll>
    </div>
  );
}

export default ProductListTwo;
