/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
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
import useCurrentUser from "@/lib/hook/useCurrentUser";
import axios from "axios";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

import countrie from "~/public/data/countries.json";

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function index() {
  const router = useRouter();
  const countries = countrie.data;
  const language = useSelector((state) => state.language.language);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    nationality: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async () => {
    const {
      name,
      email,
      phone,
      address1,
      address2,
      city,
      zip,
      nationality,
      password,
    } = values;
    if (
      !name ||
      !email ||
      !phone ||
      !address1 ||
      !address2 ||
      !city ||
      !zip ||
      !password ||
      !nationality
    ) {
      Swal.fire({
        icon: "info",
        title: "กรอกข้อมูลไม่ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ตกลง!",
        cancelButtonText: "ยกเลิก!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const data = {
            members_name: values.name,
            members_email: values.email,
            members_password: values.password,
            members_phone: values.phone,
            members_address1: values.address1,
            members_address2: values.address2,
            members_city: values.city,
            members_zip: values.zip,
            members_nationality: values.nationality,
          };
          await axios
            .post(
              `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`,
              data
            )
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                router.push("/");
              }, 1500);
            })
            .catch(() => {
              Swal.fire({
                icon: "info",
                title: "มีบางอย่างผิดพลาด",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    }
  };

  return (
    <>
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
          <Container>
            <Grid container item xs={12} justifyContent="center" mx="auto">
              <Box mt={{ xs: -7, md: -12 }} textAlign="center">
                <Avatar
                  sx={{ bgcolor: "purple", width: 90, height: 90 }}
                  alt="Burce Mars"
                />
              </Box>
            </Grid>

            <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
              ข้อมูลของฉัน
            </Typography>
            <Typography variant="h6" gutterBottom>
              จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
            </Typography>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <Grid container xs={12}>
                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel htmlFor="name" sx={{ fontSize: "16px" }}>
                          name
                        </InputLabel>
                        <Input
                          sx={{ fontSize: "16px" }}
                          id="name"
                          value={values.name}
                          onChange={handleChange("name")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="openmoji:european-name-badge" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel htmlFor="phone" sx={{ fontSize: "16px" }}>
                          phone
                        </InputLabel>
                        <Input
                          sx={{ fontSize: "16px" }}
                          id="phone"
                          value={values.phone}
                          onChange={handleChange("phone")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="eva:phone-call-outline" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <Grid container xs={12}>
                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel htmlFor="email" sx={{ fontSize: "16px" }}>
                          email
                        </InputLabel>
                        <Input
                          type="email"
                          sx={{ fontSize: "16px" }}
                          id="email"
                          value={values.email}
                          onChange={handleChange("email")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="fxemoji:email" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel
                          htmlFor="password"
                          sx={{ fontSize: "16px" }}
                        >
                          password
                        </InputLabel>
                        <Input
                          sx={{ fontSize: "16px" }}
                          id="password"
                          value={values.password}
                          onChange={handleChange("password")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="emojione:locked-with-key" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3, p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth variant="standard" color="secondary">
                    <InputLabel htmlFor="address1" sx={{ fontSize: "16px" }}>
                      address1
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="address1"
                      value={values.address1}
                      onChange={handleChange("address1")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon icon="fa:address-card" />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3, p: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <FormControl fullWidth variant="standard" color="secondary">
                    <InputLabel htmlFor="address2" sx={{ fontSize: "16px" }}>
                      address2
                    </InputLabel>
                    <Input
                      sx={{ fontSize: "16px" }}
                      id="address2"
                      value={values.address2}
                      onChange={handleChange("address2")}
                      startAdornment={
                        <InputAdornment position="start">
                          <Icon icon="fa:address-card-o" />
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <Grid container xs={12}>
                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel htmlFor="city" sx={{ fontSize: "16px" }}>
                          city
                        </InputLabel>
                        <Input
                          sx={{ fontSize: "16px" }}
                          id="city"
                          value={values.city}
                          onChange={handleChange("city")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="game-icons:modern-city" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ p: 1 }}>
                      <FormControl
                        fullWidth
                        variant="standard"
                        color="secondary"
                      >
                        <InputLabel htmlFor="zip" sx={{ fontSize: "16px" }}>
                          zip
                        </InputLabel>
                        <Input
                          color="secondary"
                          sx={{ fontSize: "16px" }}
                          id="zip"
                          value={values.zip}
                          onChange={handleChange("zip")}
                          startAdornment={
                            <InputAdornment position="start">
                              <Icon icon="icon-park-outline:file-zip" />
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <Grid container xs={12}>
                    <Grid item xs={12} sm={12} sx={{ p: 1 }}>
                      <Autocomplete
                        id="country-select-demo"
                        sx={{ width: "100%", m: 1 }}
                        options={countries}
                        autoHighlight
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setValues({
                              ...values,
                              nationality: newValue.name,
                            });
                          } else {
                            setValues({ ...values, nationality: "" });
                          }
                        }}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <a
                              style={{
                                paddingLeft: "16px",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              {option.name} ({option.code})
                            </a>
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            variant="standard"
                            {...params}
                            label={
                              <a
                                style={{
                                  color: "purple",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                }}
                              >
                                {language === "Thai"
                                  ? "ค้นหาประเทศที่คุณอยู่"
                                  : language === "Eng"
                                  ? "Find your country of residence."
                                  : language === "China"
                                  ? "查找您的居住國"
                                  : language === "Cambodia"
                                  ? "ស្វែងរកប្រទេសរស់នៅរបស់អ្នក។"
                                  : language === "Myanmar"
                                  ? "သင်၏နေထိုင်ရာနိုင်ငံကိုရှာပါ။"
                                  : "ຊອກຫາປະເທດທີ່ຢູ່ອາໃສຂອງທ່ານ."}
                              </a>
                            }
                            inputProps={{
                              ...params.inputProps,
                              style: {
                                fontSize: 12,
                                color: "purple",
                                fontWeight: "bold",
                              },
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            </Grid>
            <Button
              onClick={handleSubmit}
              sx={{ width: "100%", fontSize: 16 }}
              type="submit"
              variant="outlined"
              color="secondary"
            >
              บันทึก
            </Button>
          </Container>
        </Box>
      </Card>
    </>
  );
}
