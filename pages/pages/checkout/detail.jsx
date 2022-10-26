import React, { useState, useEffect, useRef } from "react";
import numeral from "numeral";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Box,
  Typography,
  Grid,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import axios from "axios";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { setLoading } from "@/lib/store/loading";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/pages/checkout/detail";

const ImgStyled = styled("img")(({ theme }) => ({
  width: "100%",
  //   height: "30%",
  marginRight: theme.spacing(2.25),
  borderRadius: theme.shape.borderRadius,
}));
const ImgAccout = styled("img")(({ theme }) => ({
  width: "350px",
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));
export default function CheckSlip(props) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { list } = router.query;
  const toast = useRef(null);
  const { fetcherWithToken } = useCurrentUser();

  const [imgSrc, setImgSrc] = useState(
    "https://partner-foodexpress.nbadigitalservice.com/images/logoNBA/noImage/no-image-icon-15.png"
  );
  const [file, setfile] = useState([]);
  const [isPreOrder, setPreOrder] = useState();

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
    console.log(isPreOrder);
  }, [list]);

  const fetcherPreOrder = async () => {
    dispatch(setLoading(true));
    if (list) {
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${list}`;
      let preOrders = {};
      await fetcherWithToken(url, {
        method: "GET",
      })
        .then((res) => {
          const { data } = res;
          console.log(data);
          if (data.po_status === "รอชำระเงิน") {
            preOrders = data;
          } else {
            preOrders = null;
          }
        })
        .catch(() => (preOrders = null));
      console.log(preOrders);
      setPreOrder(preOrders);
    }
    dispatch(setLoading(false));
  };
  const onChange = (file) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      setfile(files[0]);
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(files[0]);
    }
  };

  const resetImage = async () => {
    setfile([]);
    setImgSrc(
      "https://partner-foodexpress.nbadigitalservice.com/images/logoNBA/noImage/no-image-icon-15.png"
    );
  };

  const confirm1 = async () => {
    confirmDialog({
      message: (
        <a style={{ fontSize: "16px", margin: "6px" }}>
          {storeLanguage.ConfirmTodo}
        </a>
      ),
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: <a style={{ fontSize: "18px" }}> {storeLanguage.OK}</a>,
      rejectLabel: <a style={{ fontSize: "18px" }}> {storeLanguage.Cancel}</a>,
      accept,
    });
  };

  const accept = async () => {
    if (file.length === 0) {
      const text = storeLanguage.PleassAddPic;
      Swal.fire({
        icon: "info",
        title: `<a>${text}.</a>`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch(setLoading(true));
      const newTimeStamp = [];
      isPreOrder.po_timestamp.map((item, index) => {
        newTimeStamp.push(item);
      });
      newTimeStamp.push({
        name: "รอตรวจสอบ",
        timestamp: dayjs(Date.now()).format(),
      });
      const formData = new FormData();
      //   formData.append("timestamp", JSON.stringify(newTimeStamp));
      formData.append("po_silp", file);
      formData.append("po_status", "รอตรวจสอบ");
      newTimeStamp.map((item, index) => {
        console.log(item);
        formData.append(`po_timestamp[${index}][name]`, item.name);
        formData.append(`po_timestamp[${index}][timestamp]`, item.timestamp);
      });

      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders/${list}`;
      await axios.put(url, formData, {
        headers: {
          "auth-token": "Bearer " + localStorage.getItem("jwt"),
          "content-type": "application/json",
        },
      });
      dispatch(setLoading(false));
      Swal.fire({
        icon: "success",
        title: `<a>${storeLanguage.ConfirmTransaction} .</a>`,
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        router.push("/pages/pending");
      }, 1500);
    }
  };

  return (
    <>
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
            <h3 className="title title-simple title-step active">
              <Link href="#">
                <a style={{ fontSize: "12px" }}> {storeLanguage.Checkout} </a>
              </Link>
            </h3>
            <h3 className="title title-simple title-step">
              <Link href="/pages/pending">
                <a style={{ fontSize: "12px" }}> {storeLanguage.Pending} </a>
              </Link>
            </h3>
            <h3 className="title title-simple title-step">
              <Link href="/pages/pending">
                <a style={{ fontSize: "12px" }}>{storeLanguage.Waiting} </a>
              </Link>
            </h3>
            <h3 className="title title-simple title-step">
              <Link href="/pages/pending">
                <a style={{ fontSize: "12px" }}> {storeLanguage.ToReceive}</a>
              </Link>
            </h3>
            <h3 className="title title-simple title-step">
              <Link href="/pages/pending">
                <a style={{ fontSize: "12px" }}>{storeLanguage.Succeed}</a>
              </Link>
            </h3>
            <h3 className="title title-simple title-step">
              <Link href="/pages/pending">
                <a style={{ fontSize: "12px" }}>{storeLanguage.Canceled}</a>
              </Link>
            </h3>
          </div>
        </div>
      </div>
      <Container>
        {isPreOrder ? (
          <>
            <Toast ref={toast} />
            <ConfirmDialog />

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <a style={{ fontSize: "20px" }}>{storeLanguage.ConfirmSlip}</a>
            </div>
            <Grid container spacing={0}>
              <Grid container xs={12} sx={{ marginTop: 0.8, marginBottom: 3 }}>
                <Grid container xs={12} sm={8}>
                  <Grid item xs={12} sm={5}>
                    <ImgStyled src={imgSrc} alt="Profile Pic" />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={7}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <ButtonStyled
                        color="secondary"
                        component="label"
                        variant="contained"
                        htmlFor="account-settings-upload-image"
                      >
                        <a style={{ fontSize: "14px" }}>
                          {storeLanguage.AddProof}
                        </a>
                        <input
                          hidden
                          type="file"
                          onChange={onChange}
                          accept="image/png, image/jpeg"
                          id="account-settings-upload-image"
                        />
                      </ButtonStyled>
                      <ResetButtonStyled
                        color="error"
                        variant="outlined"
                        onClick={() => resetImage()}
                      >
                        <a style={{ fontSize: "14px" }}>Reset</a>
                      </ResetButtonStyled>
                      <Typography
                        variant="body2"
                        sx={{ marginTop: 5, fontSize: 12, color: "red" }}
                      >
                        {storeLanguage.Recommentded}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      color="secondary"
                      variant="contained"
                      sx={{ marginRight: 1.5 }}
                      onClick={() => confirm1()}
                    >
                      <a style={{ fontSize: "14px" }}>
                        {storeLanguage.ConfirmAdding}
                      </a>
                    </Button>
                    <Link href="/pages/checkout">
                      <Button type="reset" variant="outlined" color="error">
                        <a style={{ fontSize: "14px" }}>
                          {" "}
                          {storeLanguage.GoBack}
                        </a>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={0}>
                      <ImgAccout
                        sx={{ mr: "auto", ml: "auto", mt: 2 }}
                        src="https://partner-foodexpress.nbadigitalservice.com/images/logoNBA/noImage/accout.jpg"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <a style={{ fontSize: "16px" }}>
                              {" "}
                              {storeLanguage.ProductName}
                            </a>
                          </TableCell>
                          <TableCell align="right">
                            <a style={{ fontSize: "16px" }}>
                              {" "}
                              {storeLanguage.Price}
                            </a>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isPreOrder.po_detail.map((item) =>
                          item.product_select_detail.map((detail, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {language === "Thai" ? (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.Thai} {detail.Thai} x{" "}
                                    {detail.amount}
                                  </a>
                                ) : language === "Eng" ? (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.Eng} {detail.Eng} x{" "}
                                    {detail.amount}
                                  </a>
                                ) : language === "Cambodia" ? (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.Cambodia}{" "}
                                    {detail.Cambodia} x {detail.amount}
                                  </a>
                                ) : language === "Myanmar" ? (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.Myanmar} {detail.Myanmar}{" "}
                                    x {detail.amount}
                                  </a>
                                ) : language === "Laos" ? (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.Laos} {detail.Laos} x{" "}
                                    {detail.amount}
                                  </a>
                                ) : (
                                  <a style={{ fontSize: "12px" }}>
                                    {item.product_name.China} {detail.China} x{" "}
                                    {detail.amount}
                                  </a>
                                )}
                              </TableCell>
                              <TableCell align="right">
                                <a style={{ fontSize: "12px" }}>
                                  {numeral(detail.amount * detail.Price).format(
                                    "0,0.00"
                                  )}
                                </a>
                              </TableCell>
                            </TableRow>
                          ))
                        )}

                        <TableRow>
                          <TableCell>
                            <a style={{ fontSize: "16px", fontWeight: "bold" }}>
                              {storeLanguage.Total}
                            </a>
                          </TableCell>
                          <TableCell align="right">
                            <a style={{ fontSize: "16px", fontWeight: "bold" }}>
                              ฿ {numeral(isPreOrder.po_total).format("0,0.00")}
                            </a>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </>
        ) : (
          <div className="empty-cart text-center pb-5 pt-5">
            <p>ไม่สามารถทำรายการนี้ได้</p>
            <i className="cart-empty d-icon-bag"></i>
            <p className="return-to-shop mb-0">
              <Link href="/pages/checkout">
                <button className="button wc-backward btn btn-dark btn-md">
                  ย้อนกลับ
                </button>
              </Link>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
