/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import * as Yup from "yup";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "@/lib/store/session";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Iconify from "@/components/Iconify";

import {
  FormProvider,
  RHFTextField,
  RHFCheckbox,
} from "@/components/hook-form";

// ----------------------------------------------------------------------

export default function loginForm({ closeModal }) {
  const toast = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  // const navigate = useNavigate();
  const language = useSelector((state) => state.language.language);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    email: "test@test.com",
    password: "987654321",
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e) => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/signin-members`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: e.email,
        password: e.password,
      }),
    });
    const json = await response.json();
    if (!json.status) {
      showError();
    } else {
      console.log(json);
      showSuccess();
      dispatch(setToken(json.token));

      closeModal();
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Welcome ..",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      summary: "Error Message",
      detail: "Check Email or Password",
      life: 3000,
    });
  };

  return (
    <div>
      <Toast ref={toast} />
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3">
          {/* <Button
            label="Success"
            className="p-button-success"
            onClick={showSuccess}
          /> */}
          <RHFTextField
            color="secondary"
            sx={{ input: { fontSize: "18px" } }}
            name="email"
            label={<a style={{ fontSize: "18px" }}>Email</a>}
          />
        </div>
        <div className="form-group">
          <RHFTextField
            color="secondary"
            name="password"
            sx={{ input: { fontSize: "18px" } }}
            label={<a style={{ fontSize: "18px" }}>Password</a>}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form-footer">
          <div className="form-checkbox">
            <input
              type="checkbox"
              className="custom-checkbox"
              id="signin-remember"
              name="signin-remember"
            />
            {/* <label className="form-control-label" htmlFor="signin-remember">
              Remember me
            </label> */}
          </div>
          {/* <Link href="#">
            <a className="lost-link">Lost your password?</a>
          </Link> */}
        </div>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          color="primary"
        >
          <a style={{ fontSize: "16px" }}>
            {" "}
            {language === "Thai"
              ? "เข้าสู่ระบบ"
              : language === "Eng"
              ? "sign in"
              : language === "Cambodia"
              ? "ចូល"
              : language === "Myanmar"
              ? "ဆိုင်းအင်လုပ်ခြင်း"
              : language === "Laos"
              ? "ເຂົ້າ​ສູ່​ລະ​ບົບ"
              : "登入"}
          </a>
        </LoadingButton>
      </FormProvider>
    </div>
  );
}
