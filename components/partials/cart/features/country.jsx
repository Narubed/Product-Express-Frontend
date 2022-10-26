import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import countrie from "~/public/data/countries.json";

export default function country({ isValues, setValues, language }) {
  const countries = countrie.data;
  return (
    <div>
      {" "}
      <Autocomplete
        id="country-select-demo"
        sx={{ width: "100%", m: 1 }}
        options={countries}
        autoHighlight
        onChange={(event, newValue) => {
          console.log(newValue);
          if (newValue) {
            setValues({ ...isValues, nationality: newValue.name });
          } else {
            setValues({ ...isValues, nationality: "" });
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
              style: { fontSize: 12, color: "purple", fontWeight: "bold" },
            }}
          />
        )}
      />
    </div>
  );
}
