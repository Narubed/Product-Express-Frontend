import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// material
import { alpha } from "@mui/material/styles";
import { Box, MenuItem, Stack, IconButton } from "@mui/material";
import Image from "next/image";

// components
import MenuPopover from "./MenuPopover";
import iconEng from "~/public/static/icons/Eng.png";
import iconThai from "~/public/static/icons/Thai.png";
import iconCambodia from "~/public/static/icons/Cambodia.png";
import iconMyanmar from "~/public/static/icons/Myanmar.png";
import iconLaos from "~/public/static/icons/Laos.png";
import iconChina from "~/public/static/icons/China.png";

import { setLanguage } from "~/lib/store/language";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: "Eng",
    label: "English",
    icon: iconEng.src,
  },
  {
    value: "Thai",
    label: "Thailand",
    icon: iconThai.src,
  },
  {
    value: "China",
    label: "China",
    icon: iconChina.src,
  },

  {
    value: "Cambodia",
    label: "Cambodia",
    icon: iconCambodia.src,
  },
  {
    value: "Myanmar",
    label: "Myanmar",
    icon: iconMyanmar.src,
  },
  {
    value: "Laos",
    label: "Laos",
    icon: iconLaos.src,
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => {
    return LANGS.find((item) =>
      !language ? item.value === "Eng" : item.value === language
    );
  });

  useEffect(() => {
    if (!language) {
      const languageLocal = localStorage.getItem("language");
      if (languageLocal) {
        dispatch(setLanguage(languageLocal));
        setValue(LANGS.find((item) => item.value === languageLocal));
      } else {
        dispatch(setLanguage("Eng"));
        setValue(LANGS.find((item) => item.value === "Eng"));
      }
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onClickSelected = (option) => {
    dispatch(setLanguage(option.value));
    setValue(option);
    setOpen(false);
  };
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Box
          component="img"
          alt={value.icon}
          src={value.icon}
          sx={{ borderRadius: "5px" }}
        />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => {
            return (
              <MenuItem
                key={option.value}
                onClick={() => onClickSelected(option)}
              >
                <Box
                  component="img"
                  alt={option.label}
                  src={option.icon}
                  sx={{ width: 28, mr: 2, borderRadius: "5px" }}
                />

                {option.label}
              </MenuItem>
            );
          })}
        </Stack>
      </MenuPopover>
    </>
  );
}
