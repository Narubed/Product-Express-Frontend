/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import numeral from "numeral";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Icon } from "@iconify/react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { setLoading } from "@/lib/store/loading";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Grid,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import Image from "next/image";
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
} from "~/lib/language-pages/pages/pages/pending";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function index() {
  const router = useRouter();
  console.log(router);
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const dispatch = useDispatch();
  const [isPreOrders, setPreOrders] = useState([]);

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
    fetcherPreOrder();
  }, [currentUser]);

  const fetcherPreOrder = async () => {
    console.log(currentUser);
    if (currentUser) {
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/member/${currentUser._id}`;
      let preOrders = [];
      await fetcherWithToken(url, {
        method: "GET",
      }).then((res) => {
        const { data } = res;
        preOrders = data.reverse();
      });
      const filterStatus = preOrders.filter(
        (item) =>
          item.po_status === "ผู้ใช้ยกเลิก" ||
          item.po_status === "ผู้ดูแลยกเลิก"
      );
      setPreOrders(filterStatus);
      console.log(filterStatus);
    }
  };

  return (
    <div>
      <div className="main cart">
        <div className="main cart">
          <div className="page-content pt-0 pb-10">
            <div
              className="step-by pr-0 pl-0"
              style={{
                backgroundImage: `url(https://acegif.com/wp-content/uploads/gif/confetti-4.gif)`,
                backgroundColor: "white",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderTop: "3px solid purple",
                borderBottom: "3px solid purple",
              }}
            >
              <h3 className="title title-simple title-step">
                <Link href="/pages/cart">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Shopping} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step ">
                <Link href="/pages/checkout">
                  <a style={{ fontSize: "12px" }}> {storeLanguage.Checkout} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step ">
                <Link href="/pages/pending">
                  <a style={{ fontSize: "12px" }}> {storeLanguage.Pending} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step ">
                <Link href="/pages/confirm-orders">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Waiting} </a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step ">
                <Link href="/pages/cut-around">
                  <a style={{ fontSize: "12px" }}> {storeLanguage.ToReceive}</a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step">
                <Link href="/pages/success-delivery">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Succeed}</a>
                </Link>
              </h3>
              <h3 className="title title-simple title-step active">
                <Link href="/pages/cancel-orders">
                  <a style={{ fontSize: "12px" }}>{storeLanguage.Canceled}</a>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {isPreOrders.length !== 0 ? (
        <Container maxWidth="md">
          {isPreOrders.map((value) => (
            <Card
              key={value._id}
              sx={{
                mb: 2,
                bgcolor: "#FFFFFD",
                boxShadow: "1px 2px 1px 2px #888888",
              }}
            >
              {/* <CardActionArea> */}

              <CardContent>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <div>
                    {" "}
                    {storeLanguage.Transaction} : {value.po_number}
                  </div>
                  <div>
                    {" "}
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "right" }}
                    >
                      {storeLanguage.ProductStatus} :{" "}
                      <Chip
                        color="error"
                        label={
                          value.po_status === "ผู้ใช้ยกเลิก"
                            ? `user cancel`
                            : "admin cancel"
                        }
                        sx={{ fontSize: 14 }}
                      />
                    </Typography>
                  </div>
                </div>

                <Grid container spacing={2}>
                  {value.po_detail.map((detail) => (
                    <>
                      <Grid item xs={12} sm={2} key={detail._id}>
                        <Item>
                          <LazyLoadImage
                            style={{ borderRadius: "5px" }}
                            src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${detail.product_images[0]}`}
                            alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${detail.product_images[0]}`}
                            width="100%"
                            height="100%"
                          />
                        </Item>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <div style={{ fontSize: "16px", marginBottom: 15 }}>
                          {language === "Thai"
                            ? detail.product_name.Thai
                            : language === "Eng"
                            ? detail.product_name.Eng
                            : language === " Cambodia"
                            ? detail.product_name.Cambodia
                            : language === "Myanmar"
                            ? detail.product_name.Myanmar
                            : language === "Laos"
                            ? detail.product_name.Laos
                            : detail.product_name.China}
                        </div>
                        {detail.product_select_detail.map((select) => (
                          <Grid item sx={{ mb: 2 }} key={select.Thai}>
                            <Grid item xs={12}>
                              <a>
                                {" "}
                                {storeLanguage.ProductSize}:{" "}
                                {language === "Thai"
                                  ? detail.product_size_name.Thai
                                  : language === "Eng"
                                  ? detail.product_size_name.Eng
                                  : language === " Cambodia"
                                  ? detail.product_size_name.Cambodia
                                  : language === "Myanmar"
                                  ? detail.product_size_name.Myanmar
                                  : language === "Laos"
                                  ? detail.product_size_name.Laos
                                  : detail.product_size_name.China}
                                :{" "}
                                {detail.product_size_name.Thai !== "ไม่มี" && (
                                  <>
                                    {language === "Thai"
                                      ? select.Thai
                                      : language === "Eng"
                                      ? select.Eng
                                      : language === " Cambodia"
                                      ? select.Cambodia
                                      : language === "Myanmar"
                                      ? select.Myanmar
                                      : language === "Laos"
                                      ? select.Laos
                                      : select.China}
                                  </>
                                )}
                              </a>
                              <br />x {select.amount}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Item sx={{ width: "100%", fontSize: "14px" }}>
                          {storeLanguage.Total}:{" "}
                          {numeral(
                            detail.product_select_detail.reduce(
                              (sum, item) => sum + item.Price * item.amount,
                              0
                            )
                          ).format("0,0.00")}
                        </Item>
                      </Grid>
                    </>
                  ))}
                </Grid>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between" }}>
                <div>
                  {storeLanguage.Report}{" "}
                  {dayjs(value.po_timestamp[0].timestamp).format(
                    "DD MMMM YYYY"
                  )}
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <a
                    style={{
                      display: "flex",
                      paddingRight: 10,
                      fontSize: "14px",
                      alignItems: "center",
                    }}
                  >
                    {storeLanguage.TotalOrder}: ฿{" "}
                    {numeral(value.po_total).format("0,0.00")}
                  </a>
                </div>
              </CardActions>
              {/* </CardActionArea> */}
            </Card>
          ))}
        </Container>
      ) : (
        <div className="empty-cart text-center pb-5 pt-5">
          <p>{storeLanguage.CanNotMake}</p>
          <i className="cart-empty d-icon-bag"></i>
          <p className="return-to-shop mb-0">
            <Link href="/shop">
              <button className="button wc-backward btn btn-dark btn-md">
                {storeLanguage.GoBack}
              </button>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
