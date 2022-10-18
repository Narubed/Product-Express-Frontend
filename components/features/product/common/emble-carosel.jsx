import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Tag } from "primereact/tag";
const CarouselDemo = ({ product }) => {
  const [products, setProducts] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "600px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "480px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  useEffect(() => {
    setProducts(product.product_images);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const productTemplate = (product) => {
    return (
      <div className="product-item">
        <div className="product-item-content">
          <div className="mb-3">
            <LazyLoadImage
              src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product}`}
              alt="banner"
              width="100%"
              height="100%"
              effect="opacity"
            />
          </div>
        </div>
      </div>
    );
  };
  console.log(product);
  return (
    <div className="carousel-demo">
      <div className="card">
        <div className="product-label-group" style={{ marginLife: 10 }}>
          {product.product_tag === "New" ? (
            <label className="product-label label-new">New</label>
          ) : (
            ""
          )}
          {product.product_tag === "Hot" ? (
            <label className="product-label label-hot">Hot</label>
          ) : (
            ""
          )}
          {product.product_tag === "Sale" ? (
            <label className="product-label label-sale">Sale</label>
          ) : (
            ""
          )}
        </div>
        <Carousel
          circular
          className="custom-carousel"
          autoplayInterval={5000}
          value={products}
          numVisible={1}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
};

export default CarouselDemo;
