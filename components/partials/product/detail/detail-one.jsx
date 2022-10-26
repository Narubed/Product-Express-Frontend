import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Collapse from "react-bootstrap/collapse";
import numeral from "numeral";
import { SelectButton } from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { setCartShopping } from "~/lib/store/cartshopping";
import { setProductPopup } from "~/lib/store/productPopup";
import { setModelLogin } from "~/lib/store/model.login";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setQuickview } from "~/lib/store/model";
import { toDecimal } from "~/utils";
import Link from "next/link";
import { setLoading } from "@/lib/store/loading";

function DetailOne(props) {
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const dispatch = useDispatch();
  const shopping = useSelector((state) => state.cartShopping.shopping);
  const language = useSelector((state) => state.language.language);
  const loading = useSelector((state) => state.loading.loading);

  let router = useRouter();
  const { data, isStickyCart = false, adClass = "", isNav = true } = props;
  const [isSelect, setSelect] = useState(null);
  const [valueInput, setValueInput] = useState(1);
  let product = data;

  const justifyTemplate = (option) => {
    return (
      <a
        className={option}
        style={{
          fontSize: "16px",
          padding: "1px 14px 1px 14px",
          fontWeight: "bold",
        }}
      >
        {language === "Thai"
          ? option.Thai
          : language === "Eng"
          ? option.Eng
          : language === "China"
          ? option.China
          : language === "Cambodia"
          ? option.Cambodia
          : language === "Myanmar"
          ? option.Myanmar
          : option.Laos}
      </a>
    );
  };
  const checkLogin = () => {
    console.log("onClick", currentUser);
    if (currentUser) {
      onClickConfirm();
    } else {
      dispatch(setQuickview(false));
      dispatch(setModelLogin(true));
    }
  };
  const onClickConfirm = async () => {
    dispatch(setLoading(true));
    // dispatch(setQuickview(false));
    const detail = { ...isSelect, amount: valueInput };
    const newValuePopup = { ...product, product_select_detail: [detail] };
    dispatch(setProductPopup([newValuePopup]));

    if (shopping.length === 0) {
      dispatch(setCartShopping([newValuePopup]));
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
      await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
        console.log(res);
        if (res && res.create) {
          const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping`;
          await fetcherWithToken(urlCart, {
            method: "POST",
            body: JSON.stringify({ shopping_detail: [newValuePopup] }),
          });
        } else {
          const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
          await fetcherWithToken(urlCart, {
            method: "PUT",
            body: JSON.stringify({ shopping_detail: [newValuePopup] }),
          });
        }
      });
    } else {
      // ถ้าตาม _id เเล้วซ้ำ
      let indexShopping = shopping.findIndex(
        (item) => item._id === newValuePopup._id
      );
      if (indexShopping === -1) {
        // ไม่มีค่าที่เหมือนกันใน Store
        const newShopping = [];
        shopping.map((item) => {
          newShopping.push(item);
        });
        newShopping.push(newValuePopup);
        dispatch(setCartShopping(newShopping));
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
        await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
          const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
          await fetcherWithToken(urlCart, {
            method: "PUT",
            body: JSON.stringify({ shopping_detail: newShopping }),
          });
        });
      } else {
        // มีค่าที่เหมือนกันได้ Store ใช้ชื่อเป็น indexShopping
        const newShopping = [];
        shopping.map((item, index) => {
          if (index === indexShopping) {
            // หาดูว่าค่าไหนที่มันเหมือนกัน
            const newItem = item.product_select_detail;
            const select_detail = [];
            const findName = newItem.find(
              (value) => value.Thai === detail.Thai
            );
            if (findName) {
              const data = {
                ...findName,
                amount: findName.amount + detail.amount,
              };

              newItem.map((detailAmount) => {
                if (detailAmount.Thai !== data.Thai) {
                  select_detail.push(detailAmount);
                }
              });

              select_detail.push(data);
            } else {
              newItem.map((detailamount) => select_detail.push(detailamount));
              select_detail.push(detail);
            }
            newShopping.push({ ...item, product_select_detail: select_detail });
          } else {
            newShopping.push(item);
            // ค่าที่ไม่ซ้ำจากการเพิ่มครั้งล่าสุดทั้งหมด
          }
        });
        dispatch(setCartShopping(newShopping));
        const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
        await fetcherWithToken(url, { method: "GET" }).then(async (res) => {
          const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
          await fetcherWithToken(urlCart, {
            method: "PUT",
            body: JSON.stringify({ shopping_detail: newShopping }),
          });
        });
      }
    }
    dispatch(setLoading(false));
  };
  return (
    <div>
      {/* <CartPopup product={newProduct} /> */}
      {isNav ? (
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <Link href="/">
                <i className="d-icon-home">1</i>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a className="active">Products</a>
              </Link>
            </li>
            <li>Detail</li>
          </ul>
        </div>
      ) : (
        ""
      )}
      <h2 className="product-name">
        {language === "Thai"
          ? product.product_name.Thai
          : language === "Eng"
          ? product.product_name.Eng
          : language === "China"
          ? product.product_name.China
          : language === "Cambodia"
          ? product.product_name.Cambodia
          : language === "Myanmar"
          ? product.product_name.Myanmar
          : product.product_name.Laos}
      </h2>
      <div className="product-meta">
        SKU: <span className="product-sku">{product._id}</span>
        BRAND:
        <span className="product-sku">
          {language === "Thai"
            ? product.brand_name.Thai
            : language === "Eng"
            ? product.brand_name.Eng
            : language === "China"
            ? product.brand_name.China
            : language === "Cambodia"
            ? product.brand_name.Cambodia
            : language === "Myanmar"
            ? product.brand_name.Myanmar
            : product.brand_name.Laos}
        </span>
        <span className="product-brand">
          {/* {product.data.categories.map((item, index) => (
            <React.Fragment key={item.name + "-" + index}>
              <Link
                href={{ pathname: "/shop", query: { category: item.slug } }}
              >
                <a>{item.name}</a>
              </Link>
              {index < product.data.categories.length - 1 ? ", " : ""}
            </React.Fragment>
          ))} */}
        </span>
      </div>

      {product.product_size_detail[0].Price !==
        product.product_size_detail[0].OldPrice && (
        <a>
          <del>฿{toDecimal(product.product_size_detail[0].OldPrice)}</del>{" "}
          {product.product_size_detail.length > 1 && <a>-</a>}{" "}
          <del>
            {product.product_size_detail.length > 1 && <a>฿</a>}
            {product.product_size_detail.length > 1 &&
              toDecimal(
                product.product_size_detail[
                  product.product_size_detail.length - 1
                ].OldPrice
              )}
          </del>
        </a>
      )}

      <div className="product-price mb-2">
        <ins className="new-price">
          {" "}
          <a>
            ฿ {numeral(product.product_size_detail[0].Price).format("0,00.00")}
          </a>
        </ins>

        {product.product_size_detail.length >= 2 && (
          <>
            {" - "}
            <a>
              ฿{" "}
              {numeral(
                product.product_size_detail[
                  product.product_size_detail.length - 1
                ].Price
              ).format("0,0.00")}
            </a>
          </>
        )}
      </div>

      <p className="product-short-desc">
        {language === "Thai"
          ? product.product_detail.Thai
          : language === "Eng"
          ? product.product_detail.Eng
          : language === "China"
          ? product.product_detail.China
          : language === "Cambodia"
          ? product.product_detail.Cambodia
          : language === "Myanmar"
          ? product.product_detail.Myanmar
          : product.product_detail.Laos}
      </p>
      {language === "Thai"
        ? product.product_size_name.Thai
        : language === "Eng"
        ? product.product_size_name.Eng
        : language === "China"
        ? product.product_size_name.China
        : language === "Cambodia"
        ? product.product_size_name.Cambodia
        : language === "Myanmar"
        ? product.product_size_name.Myanmar
        : product.product_size_name.Laos}
      <div style={{ display: "flex" }}>
        <SelectButton
          style={{ backgroundColor: "#FFFFFF" }}
          value={isSelect}
          options={product.product_size_detail}
          onChange={(e) => {
            setSelect(e.value);
          }}
          optionLabel={
            language === "Thai"
              ? "Thai"
              : language === "Eng"
              ? "Eng"
              : language === "China"
              ? "China"
              : language === "Cambodia"
              ? "Cambodia"
              : language === "Myanmar"
              ? "Myanmar"
              : "Laos"
          }
          itemTemplate={justifyTemplate}
        />
      </div>
      {isSelect !== null && (
        <div style={{ marginTop: 12, marginBottom: 16 }}>
          <div className="product-price mb-3">
            <ins className="new-price">
              <a style={{ fontSize: "18px" }}>
                ฿ {numeral(isSelect.Price).format("0,00.00")}
              </a>
            </ins>

            {isSelect.Price !== isSelect.OldPrice && (
              <a style={{ fontSize: "14px", paddingLeft: 16, color: "red" }}>
                <del>฿{toDecimal(isSelect.OldPrice)}</del>{" "}
              </a>
            )}
          </div>

          <hr className="product-divider" />
          <div
            className="field col-12 md:col-3 pt-4 "
            style={{ display: "flex" }}
          >
            <InputNumber
              inputStyle={{ fontSize: "16px", width: "50%" }}
              style={{ maxWidth: "110px" }}
              size="xxl"
              inputId="horizontal"
              value={valueInput}
              onValueChange={(e) => setValueInput(e.value)}
              showButtons
              buttonLayout="horizontal"
              step={1}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              min={1}
              max={100}
            />
            <div style={{ marginLeft: "16px" }}>
              <Button className="p-button-raised" onClick={() => checkLogin()}>
                <a style={{ fontSize: "16px", padding: 10 }}>
                  {language === "Thai"
                    ? "หยิบใส่ตะกร้า"
                    : language === "Eng"
                    ? "Add to Cart"
                    : language === "China"
                    ? "添加到購物車"
                    : language === "Cambodia"
                    ? "បញ្ចូលទៅក្នុងរទេះ"
                    : language === "Myanmar"
                    ? "စျေးဝယ်ခြင်းထဲသို့ထည့်သည်"
                    : "ເພີ່ມໃສ່ກະຕ່າ"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
      <hr className="product-divider" />

      {/* <div className="product-footer">
        <div className="social-links mr-4"></div>
        <span className="divider d-lg-show">
          <Icon icon="akar-icons:heart" width="26" height="26" />
        </span>
        <a
          href="#"
          className={`btn-product btn-wishlist`}
          title={"Add to wishlist"}
          //   onClick={wishlistHandler}
        >
          <i className={"d-icon-heart"}></i> {"Add to Wishlist"}
        </a>
      </div> */}

      {/* <Link href="#">
            <a className="social-link social-facebook fab fa-facebook-f">
              <Icon icon="brandico:facebook-rect" width="32" height="32" />
            </a>
          </Link>
          <Link href="#">
            <a className="social-link social-twitter fab fa-twitter">
              <Icon icon="fa:twitter-square" width="32" height="32" />
            </a>
          </Link>
          <Link href="#">
            <a className="social-link social-pinterest fab fa-pinterest-p">
              <Icon icon="akar-icons:instagram-fill" width="34" height="34" />
            </a>
          </Link> */}
    </div>
  );
}

export default DetailOne;
