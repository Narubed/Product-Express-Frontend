import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

export default function Partners(props) {
  const {
    fetcherWithToken,
    dispatch,
    currentUser,
    isValues,
    setValues,
    language,
  } = props;
  console.log(language);
  const [isPartners, setPartners] = useState([]);

  useEffect(() => {
    findPartner();
  }, []);
  const findPartner = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    await fetcherWithToken(url, { method: "GET" })
      .then(async (res) => {
        const { data } = res;
        setPartners(data);
      })
      .catch(() => setPartners([]));
  };

  return (
    <div>
      {" "}
      <Autocomplete
        id="country-select-demo"
        sx={{ width: "100%", m: 1 }}
        options={isPartners}
        autoHighlight
        onChange={(event, newValue) => {
          if (newValue) {
            setValues({ ...isValues, partner_id: newValue._id });
          } else {
            setValues({ ...isValues, partner_id: "" });
          }
        }}
        getOptionLabel={(option) =>
          language === "Thai"
            ? option.partner_name_center.Thai
            : language === "Eng"
            ? option.partner_name_center.Eng
            : language === "China"
            ? option.partner_name_center.China
            : language === "Cambodia"
            ? option.partner_name_center.Cambodia
            : language === "Myanmar"
            ? option.partner_name_center.Myanmar
            : option.partner_name_center.Laos
        }
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
              {language === "Thai"
                ? option.partner_name_center.Thai
                : language === "Eng"
                ? option.partner_name_center.Eng
                : language === "China"
                ? option.partner_name_center.China
                : language === "Cambodia"
                ? option.partner_name_center.Cambodia
                : language === "Myanmar"
                ? option.partner_name_center.Myanmar
                : option.partner_name_center.Laos}
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
                  ? "ค้นหาที่อยู่ที่สาขาปลายทาง"
                  : language === "Eng"
                  ? "Find the address at the destination branch."
                  : language === "China"
                  ? "在目標分支找到地址。"
                  : language === "Cambodia"
                  ? "ស្វែងរកអាសយដ្ឋាននៅសាខាគោលដៅ។"
                  : language === "Myanmar"
                  ? "ဦးတည်ရာဌာနခွဲတွင် လိပ်စာကို ရှာပါ။"
                  : "ຊອກຫາທີ່ຢູ່ສາຂາປາຍທາງ."}
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
