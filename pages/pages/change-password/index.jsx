/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Card,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  ListItem,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/pages/change-password";

export default function index() {
  const [value, setValue] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const language = useSelector((state) => state.language.language);
  const { currentUser, fetcherWithToken } = useCurrentUser();
  const [imgSrc, setImgSrc] = useState(null);

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
    if (currentUser) {
      setImgSrc(
        `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/members/${currentUser?.members_image}`
      );
    }
  }, [currentUser]);

  const headleSubmit = async () => {
    if (
      value.newPassword !== value.confirmPassword ||
      value.newPassword.length <= 6
    ) {
      Swal.fire({
        icon: "info",
        title: `${storeLanguage.DoNotMatch}`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members/change-password`;
      await fetcherWithToken(url, {
        method: "POST",
        body: JSON.stringify({
          password: value.password,
          newPassword: value.newPassword,
        }),
      })
        .then((data) => {
          if (data.status) {
            setValue({
              password: "",
              newPassword: "",
              confirmPassword: "",
            });
            Swal.fire({
              icon: "success",
              title: `${storeLanguage.Corrected}`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "info",
              title: `${storeLanguage.OriginCode}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((data) => {
          Swal.fire({
            icon: "info",
            title: `${storeLanguage.OriginCode}`,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  };

  if (!currentUser) {
    return (
      <div className="empty-cart text-center pb-5 pt-5">
        <p>{storeLanguage.CanNotDoThis}</p>
        <i className="cart-empty d-icon-bag"></i>
        <p className="return-to-shop mb-0">
          <Link href="/">
            <button className="button wc-backward btn btn-dark btn-md">
              {storeLanguage.BackPage}
            </button>
          </Link>
        </p>
      </div>
    );
  }

  const header = <h6> {storeLanguage.PickPassword}</h6>;
  const footer = (
    <React.Fragment>
      <Divider />
      <p className="mt-2 fs-2">{storeLanguage.Suggestions}</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>{storeLanguage.lowercase}</li>
        <li>{storeLanguage.uppercase}</li>
        <li>{storeLanguage.numeric}</li>
        <li>{storeLanguage.characters}</li>
      </ul>
    </React.Fragment>
  );

  return (
    <>
      {" "}
      <Box
        minHeight="25rem"
        width="100%"
        sx={{
          background: "none",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundImage: `url(${"https://drive.google.com/uc?export=view&id=1Uc10lorRpatht2bf0PYKc49rD8GBqnay"})`,
        }}
      />
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
        }}
      >
        <Box component="section" py={{ xs: 6, sm: 12 }}>
          <Container maxWidth="sm">
            <Grid container item xs={12} justifyContent="center" mx="auto">
              <Box mt={{ xs: -7, md: -12 }} textAlign="center">
                <Avatar
                  sx={{ bgcolor: "purple", width: 90, height: 90 }}
                  src={imgSrc}
                  alt="Burce Mars"
                />
              </Box>

              <Grid item xs={12} mt={2}>
                <h5 style={{ margin: 0 }}>{storeLanguage.Password}</h5>
                <Password
                  inputStyle={{ width: "100%", fontSize: "16px" }}
                  style={{ width: "100%" }}
                  toggleMask
                  value={value.password}
                  onChange={(e) =>
                    setValue({ ...value, password: e.target.value })
                  }
                  feedback={false}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <h5 style={{ margin: 0 }}>{storeLanguage.NewPassword}</h5>
                <Password
                  inputStyle={{ width: "100%", fontSize: "16px" }}
                  style={{ width: "100%" }}
                  toggleMask
                  value={value.newPassword}
                  onChange={(e) =>
                    setValue({ ...value, newPassword: e.target.value })
                  }
                  header={header}
                  footer={footer}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <h5 style={{ margin: 0 }}>{storeLanguage.ConfirmPassword}</h5>

                <Password
                  inputStyle={{ width: "100%", fontSize: "16px" }}
                  style={{ width: "100%" }}
                  toggleMask
                  value={value.confirmPassword}
                  onChange={(e) =>
                    setValue({ ...value, confirmPassword: e.target.value })
                  }
                  feedback={false}
                />
              </Grid>
              <Grid item xs={12} mt={6}>
                <Button
                  onClick={headleSubmit}
                  sx={{ width: "100%", fontSize: "14px" }}
                  variant="outlined"
                  color="secondary"
                >
                  {storeLanguage.Correction}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Card>
    </>
  );
}
