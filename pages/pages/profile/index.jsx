/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/pages/pages/profile";

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

export default function index() {
  const countries = countrie.data;
  const language = useSelector((state) => state.language.language);
  const { currentUser, fetcherWithToken } = useCurrentUser();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    zip: "",
    nationality: "",
  });
  const [imgSrc, setImgSrc] = useState(null);
  const [file, setfile] = useState([]);
  const [isValueCountry, setValueCountry] = useState({});

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
      fetcherMembers();
    }
  }, [currentUser]);

  //   useEffect(() => {
  //     fetcherMembers();
  //   }, []);
  const fetcherMembers = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members/me`;
    await fetcherWithToken(url, { method: "GET" }).then((res) => {
      console.log(res.user);
      const findindexMember = countries.find(
        (item) => item.name === res.user.members_nationality
      );
      setValueCountry(findindexMember);
      setValues({
        name: res.user.members_name,
        email: res.user.members_email,
        phone: res.user.members_phone,
        address1: res.user.members_address1,
        address2: res.user.members_address2,
        city: res.user.members_city,
        zip: res.user.members_zip,
        nationality: res.user.members_nationality,
      });
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
    setImgSrc(imagesicon.src);
  };
  const handleSubmit = async () => {
    const { name, email, phone, address1, address2, city, zip, nationality } =
      values;
    if (
      !name ||
      !email ||
      !phone ||
      !address1 ||
      !address2 ||
      !city ||
      !zip ||
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
        title: `${storeLanguage.AreYouSure}`,
        text: `${storeLanguage.CanNotBack}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `${storeLanguage.Save}`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          let data = {};

          if (file.length !== 0) {
            const urlDelete = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/members`;
            await fetcherWithToken(urlDelete, {
              method: "DELETE",
              body: JSON.stringify({ images: currentUser.members_image }),
            });

            const formData = new FormData();
            formData.append("image", file);
            const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/image/members`;
            const imageMembers = await axios.post(url, formData, {
              headers: {
                "auth-token": "Bearer " + localStorage.getItem("jwt"),
                "content-type": "application/json",
              },
            });
            data = {
              members_name: values.name,
              members_email: values.email,
              members_phone: values.phone,
              members_address1: values.address1,
              members_address2: values.address2,
              members_city: values.city,
              members_zip: values.zip,
              members_image: imageMembers.data.filename,
              members_nationality: values.nationality,
            };
          } else {
            data = {
              members_name: values.name,
              members_email: values.email,
              members_phone: values.phone,
              members_address1: values.address1,
              members_address2: values.address2,
              members_city: values.city,
              members_zip: values.zip,
              members_nationality: values.nationality,
            };
          }
          const urlUpdate = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members/${currentUser._id}`;
          await fetcherWithToken(urlUpdate, {
            method: "PUT",
            body: JSON.stringify(data),
          });

          Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
              {storeLanguage.GoBack}
            </button>
          </Link>
        </p>
      </div>
    );
  }

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
                  src={imgSrc}
                  alt="Burce Mars"
                />
              </Box>
            </Grid>
            <Grid container item xs={12} justifyContent="center" mx="auto">
              <ButtonStyled
                color="secondary"
                component="label"
                variant="contained"
                htmlFor="account-settings-upload-image"
              >
                <a style={{ fontSize: "12px" }}> {storeLanguage.ProfilePic}</a>
                <input
                  hidden
                  type="file"
                  onChange={onChange}
                  accept="image/png, image/jpeg"
                  id="account-settings-upload-image"
                />
              </ButtonStyled>
            </Grid>
            <Grid container item xs={12} justifyContent="center" mx="auto">
              <Typography
                variant="body2"
                sx={{ marginTop: 2, fontSize: 12, color: "red" }}
              >
                {storeLanguage.Recommended}
              </Typography>
            </Grid>
            <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
              {storeLanguage.Information}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {storeLanguage.Manage}
            </Typography>
            <Grid item xs={12} sx={{ marginBottom: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItem disablePadding>
                  <Grid container xs={12}>
                    <Grid item xs={12} sm={4} sx={{ p: 1 }}>
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
                    <Grid item xs={12} sm={4} sx={{ p: 1 }}>
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
                    <Grid item xs={12} sm={4} sx={{ p: 1 }}>
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
                        value={isValueCountry}
                        autoHighlight
                        onChange={(event, newValue) => {
                          console.log(newValue);
                          setValueCountry(newValue);
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
              {storeLanguage.Save}
            </Button>
          </Container>
        </Box>
      </Card>
    </>
  );
}
