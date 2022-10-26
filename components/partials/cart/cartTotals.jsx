/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { toDecimal, getTotalPrice } from "~/utils";
import { Switch, FormControl, InputLabel, Input } from "@mui/material";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { setLoading } from "~/lib/store/loading";
import { setCartShopping } from "~/lib/store/cartshopping";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useSelector } from "react-redux";
import Country from "./features/country";
import Partners from "./features/partners";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/components/partials/cart/cartTotal";
import axios from "axios";

export default function cartTotals(props) {
  const { isShopping, fetcherWithToken, dispatch, currentUser, router } = props;
  const subTotals = [];
  isShopping.forEach((element) => {
    const data = element.product_select_detail.reduce(
      (sum, item) => sum + item.Price * item.amount,
      0
    );
    subTotals.push(data);
  });

  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const [isValues, setValues] = useState({
    partner_id: "",
    nationality: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    status: true,
  });

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

  useEffect(() => {
    setValues({
      ...isValues,
      address1: currentUser.members_address1,
      address2: currentUser.members_address2,
      city: currentUser.members_city,
      zip: currentUser.members_zip,
    });
    console.log(currentUser);
  }, []);

  const onSwicthAddress = (e) => {
    if (e.target.checked) {
      setValues({
        ...isValues,
        address1: currentUser.members_address1,
        address2: currentUser.members_address2,
        city: currentUser.members_city,
        zip: currentUser.members_zip,
        status: e.target.checked,
      });
    } else {
      setValues({
        ...isValues,
        status: e.target.checked,
      });
    }
  };
  const submitAndCheckout = async () => {
    dispatch(setLoading(true));
    const poNumber = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/invoice/preorder-number`,
      { date: dayjs(Date.now()).format() }
    );
    const data = {
      po_member_id: currentUser._id,
      po_member_address: `${isValues.address1} ${isValues.address2} ${isValues.city} ${isValues.zip}`,
      po_number: poNumber.data.invoice_preorder,
      po_partner_id: isValues.partner_id,
      po_total: subTotals.reduce((sum, item) => sum + item, 0),
      po_status: "รอชำระเงิน",
      po_nationality: isValues.nationality,
      po_detail: isShopping,
      po_timestamp: [
        { name: "รอชำระเงิน", timestamp: dayjs(Date.now()).format() },
      ],
    };
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders`;
    await fetcherWithToken(url, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(async () => {
      dispatch(setCartShopping([]));
      const urlCartMember = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/member`;
      await fetcherWithToken(urlCartMember, { method: "GET" }).then(
        async (res) => {
          const urlCart = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cart_shopping/${res.data._id}`;
          await fetcherWithToken(urlCart, {
            method: "PUT",
            body: JSON.stringify({ shopping_detail: [] }),
          });
        }
      );
    });
    dispatch(setLoading(false));
  };

  const accept = async () => {
    if (
      isValues.partner_id.length <= 0 ||
      isValues.nationality.length <= 0 ||
      isValues.address1.length <= 0 ||
      isValues.address2.length <= 0 ||
      isValues.city.length <= 0 ||
      isValues.zip.length <= 0
    ) {
      Swal.fire({
        icon: "error",
        title: `<a>${storeLanguage.CannotMake}.</a>`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await submitAndCheckout();
      Swal.fire({
        icon: "success",
        title: `<a>${storeLanguage.transaction}.</a>`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        router.push("/pages/checkout");
      }, 1500);
    }
  };

  const confirm1 = async () => {
    confirmDialog({
      message: (
        <a style={{ fontSize: "16px", margin: "6px" }}>
          {storeLanguage.Continue}
        </a>
      ),
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: <a style={{ fontSize: "18px" }}> {storeLanguage.Confirm}</a>,
      rejectLabel: <a style={{ fontSize: "18px" }}> {storeLanguage.Cancel}</a>,
      accept,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <aside className="col-lg-4 sticky-sidebar-wrapper">
        <div className="sticky-sidebar" data-sticky-options="{'bottom': 20}">
          <div className="summary mb-4">
            <h3 className="summary-title text-left">
              {" "}
              {storeLanguage.CartTotals}
            </h3>
            <table className="shipping">
              <tbody>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">
                      {" "}
                      {storeLanguage.SubTotal}
                    </h4>
                  </td>
                  <td>
                    <p className="summary-subtotal-price">
                      ฿{" "}
                      {toDecimal(
                        subTotals.reduce((sum, item) => sum + item, 0)
                      )}
                    </p>
                  </td>
                </tr>
                <tr className="sumnary-shipping shipping-row-last">
                  <td colSpan="2">
                    <h4 className="summary-subtitle">
                      {storeLanguage.Destination}
                    </h4>
                    <Partners
                      language={language}
                      isValues={isValues}
                      setValues={setValues}
                      currentUser={currentUser}
                      fetcherWithToken={fetcherWithToken}
                      dispatch={dispatch}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="shipping-address">
              <label>
                <strong> {storeLanguage.Information}.</strong>
              </label>
              <div style={{ paddingBottom: 12 }}>
                <Country
                  isValues={isValues}
                  setValues={setValues}
                  language={language}
                />
              </div>
              <Switch
                color="secondary"
                onChange={(e) => onSwicthAddress(e)}
                checked={isValues.status}
              />
              {isValues.status ? (
                <a>{storeLanguage.registered}</a>
              ) : (
                <a>{storeLanguage.yourself}</a>
              )}

              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  address 1
                </InputLabel>
                <Input
                  disabled={isValues.status}
                  value={isValues.address1}
                  onChange={(e) =>
                    setValues({ ...isValues, address1: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="address 1"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  address 2
                </InputLabel>
                <Input
                  disabled={isValues.status}
                  value={isValues.address2}
                  onChange={(e) =>
                    setValues({ ...isValues, address2: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="address 2"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Town / City
                </InputLabel>
                <Input
                  disabled={isValues.status}
                  value={isValues.city}
                  onChange={(e) =>
                    setValues({ ...isValues, city: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="Town / City"
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">ZIP</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  disabled={isValues.status}
                  value={isValues.zip}
                  onChange={(e) =>
                    setValues({ ...isValues, zip: e.target.value })
                  }
                  type="text"
                  className="form-control"
                  name="code"
                  placeholder="ZIP"
                />
              </FormControl>
            </div>
            <table className="total">
              <tbody>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">{storeLanguage.Total}</h4>
                  </td>
                  <td>
                    <p className="summary-total-price ls-s">
                      {toDecimal(
                        subTotals.reduce((sum, item) => sum + item, 0)
                      )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={confirm1}
              className="btn btn-dark btn-rounded btn-checkout"
              style={{ width: "100%" }}
            >
              {storeLanguage.payment}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
