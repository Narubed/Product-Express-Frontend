import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Link from "next/link";
import { useRouter } from "next/router";
import useCurrentUser from "@/lib/hook/useCurrentUser";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";

export default function AccountMenu() {
  const { currentUser, logout } = useCurrentUser();
  const [image, setImage] = React.useState("ไม่มี");
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const language = useSelector((state) => state.language.language);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (currentUser) {
      setImage(currentUser.members_image);
    }
  }, [currentUser]);
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {image === "ไม่มี" ? (
              <Avatar
                sx={{ bgcolor: "purple", width: 40, height: 40 }}
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&usqp=CAU"
                alt="Burce Mars"
              />
            ) : (
              <Avatar
                sx={{ bgcolor: "purple" }}
                src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/members/${image}`}
                alt="Burce Mars"
              />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 220,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => router.push("/pages/profile")}>
          {image === "ไม่มี" ? (
            <Avatar
              sx={{ bgcolor: "purple" }}
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIN1gwlCld-PW_qX5QxwNMdPUff8gYhTOe8w&usqp=CAU"
              alt="Burce Mars"
            />
          ) : (
            <Avatar
              sx={{ bgcolor: "purple" }}
              src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/members/${image}`}
              alt="Burce Mars"
            />
          )}

          <a style={{ fontSize: "14px" }}>
            {" "}
            {language === "Thai"
              ? "ข้อมูลส่วนบุคคล"
              : language === "Eng"
              ? "personal information"
              : language === " Cambodia"
              ? "ព័ត៌មាន​ផ្ទាល់ខ្លួន"
              : language === "Myanmar"
              ? "ကိုယ်ပိုင်သတင်းအချက်အလက်များ"
              : language === "Laos"
              ? "ຂໍ້​ມູນ​ສ່ວນ​ຕົວ"
              : "个人信息"}
          </a>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push("/pages/change-password")}>
          <ListItemIcon>
            <Icon icon="emojione:locked-with-key" width="16px" />
          </ListItemIcon>
          <a style={{ fontSize: "14px" }}>
            {" "}
            {language === "Thai"
              ? "เปลี่ยนรหัสผ่าน"
              : language === "Eng"
              ? "change password"
              : language === " Cambodia"
              ? "ផ្លាស់ប្តូរពាក្យសម្ងាត់"
              : language === "Myanmar"
              ? "စကားဝှက်ကိုပြောင်းရန်"
              : language === "Laos"
              ? "ປ່ຽນ​ລະ​ຫັດ​ຜ່ານ"
              : "更改密码"}
          </a>
        </MenuItem>
        <MenuItem onClick={() => router.push("/pages/cart")}>
          <ListItemIcon>
            <LocalMallIcon fontSize="medium" />
          </ListItemIcon>
          <a style={{ fontSize: "14px" }}>
            {" "}
            {language === "Thai"
              ? "คำสั่งของฉัน"
              : language === "Eng"
              ? "My Order"
              : language === " Cambodia"
              ? "គោល​បំណង​របស់​ខ្ញុំ"
              : language === "Myanmar"
              ? "ငါ၏အမိန့်"
              : language === "Laos"
              ? "ຄໍາສັ່ງຂອງຂ້ອຍ"
              : "我的订单"}
          </a>
        </MenuItem>{" "}
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>

          <a style={{ fontSize: "14px" }}>
            {" "}
            {language === "Thai"
              ? "ออกจากระบบ"
              : language === "Eng"
              ? "Logout"
              : language === " Cambodia"
              ? "ចាកចេញ"
              : language === "Myanmar"
              ? "ထွက်လိုက်ပါ။"
              : language === "Laos"
              ? "ອອກ​ຈາກ​ລະ​ບົບ"
              : "登出"}
          </a>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
