import React from "react";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toDecimal } from "~/utils";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
export default function CartPopup(props) {
  const language = useSelector((state) => state.language.language);
  const { product } = props;
  return (
    <div className="minipopup-area">
      <div className="minipopup-box show" style={{ top: "0" }}>
        <p className="minipopup-title">
          {language === "Thai"
            ? "เพิ่มเรียบร้อยแล้ว"
            : language === "Eng"
            ? "Successfully added."
            : language === "China"
            ? "添加成功。"
            : language === "Cambodia"
            ? "បន្ថែមដោយជោគជ័យ។"
            : language === "Myanmar"
            ? "အောင်မြင်စွာ ထည့်သွင်းခဲ့သည်။"
            : "ເພີ່ມສຳເລັດແລ້ວ."}
        </p>

        <div className="product product-purchased  product-cart mb-0">
          <figure className="product-media pure-media">
            <Link href={`/product/default/${product.slug}`}>
              {/* <Image
                  src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product[0].product_images[0]}`}
                  alt="product"
                  width="90"
                  height="90"
                /> */}
              <LazyLoadImage
                src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product[0].product_images[0]}`}
                alt="banner"
                width="100%"
                height="100%"
                effect="opacity"
              />
            </Link>
          </figure>
          <div className="product-detail">
            <Link href={`/product/default/${product._id}`}>
              <a className="product-name">
                {language === "Thai"
                  ? product[0].product_name.Thai
                  : language === "Eng"
                  ? product[0].product_name.Eng
                  : language === "China"
                  ? product[0].product_name.China
                  : language === "Cambodia"
                  ? product[0].product_name.Cambodia
                  : language === "Myanmar"
                  ? product[0].product_name.Myanmar
                  : product[0].product_name.Laos}
              </a>
            </Link>
            <span className="price-box">
              <span className="product-quantity">
                {product[0].product_select_detail[0].amount}
              </span>
              <span className="product-price">
                ฿ {toDecimal(product[0].product_select_detail[0].Price)}
              </span>
            </span>
          </div>
        </div>

        <div className="action-group d-flex">
          <Link href="/pages/cart">
            <button className="btn btn-sm btn-outline btn-primary btn-rounded">
              {language === "Thai"
                ? "ดูตะกร้า"
                : language === "Eng"
                ? "View Cart"
                : language === "China"
                ? "查看購物車"
                : language === "Cambodia"
                ? "មើលរទេះ"
                : language === "Myanmar"
                ? "လှည်းကြည့်"
                : "ເບິ່ງໂຄງຮ່າງການ."}
            </button>
          </Link>
          <Link href="/pages/checkout">
            <button className="btn btn-sm btn-primary btn-rounded">
              {language === "Thai"
                ? "เช็คเอาท์"
                : language === "Eng"
                ? "Check Out"
                : language === "China"
                ? "查看"
                : language === "Cambodia"
                ? "ពិនិត្យ​មុន​ពេល​ចេញ"
                : language === "Myanmar"
                ? "ထွက်ခွာသည်"
                : "ເຊັກເອົາ."}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
