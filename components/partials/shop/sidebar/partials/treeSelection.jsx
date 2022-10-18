import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import Label from "@mui/icons-material/Label";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import FormatOverlineIcon from "@mui/icons-material/FormatOverline";
import InfoIcon from "@mui/icons-material/Info";
import ForumIcon from "@mui/icons-material/Forum";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { setFilterPrice } from "@/lib/store/filterPrice";
import UseLanguage from "~/lib/hook/useLanguage";
import {
  Thai,
  Eng,
  Cambodia,
  Myanmar,
  Laos,
  China,
} from "~/lib/language-pages/components/partials/shop/partials/treeSelection";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 1.0, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
function valuetext(value) {
  return `${value}°C`;
}

export default function GmailTreeView(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.filterPrice.price);

  const { isType, isBrand } = props;
  const { isDefault, setDefault } = React.useState([1]);
  const router = useRouter();
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

  const handleChange = (event, newValue) => {
    dispatch(setFilterPrice(newValue));
  };
  return (
    <>
      <TreeView
        aria-label="gmail"
        defaultExpanded={[1, "2"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <StyledTreeItem
          nodeId={1}
          labelText={
            <a style={{ fontSize: "16px" }}>{storeLanguage.AllCategories}</a>
          }
          labelIcon={Label}
        >
          {isType.length !== 0 &&
            isType.map((item) => (
              <Link
                key={item._id}
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    istype: item._id,
                  },
                }}
              >
                <StyledTreeItem
                  // onClick={() => console.log("123")}
                  nodeId={item._id}
                  labelText={
                    <a style={{ fontSize: "16px" }}>
                      {language === "Thai"
                        ? item.type_name.Thai
                        : language === "Eng"
                        ? item.type_name.Eng
                        : language === "China"
                        ? item.type_name.China
                        : language === "Cambodia"
                        ? item.type_name.Cambodia
                        : language === "Myanmar"
                        ? item.type_name.Myanmar
                        : item.type_name.Laos}
                    </a>
                  }
                  labelIcon={FormatOverlineIcon}
                  //   labelInfo="90"
                  color="#a250f5"
                  bgColor="#f3e8fd"
                />
              </Link>
            ))}

          {/* <StyledTreeItem
            nodeId="6"
            labelText={<a style={{ fontSize: "16px" }}>Updates</a>}
            labelIcon={InfoIcon}
            //   labelInfo="2,294"
            color="#e3742f"
            bgColor="#fcefe3"
          />
          <StyledTreeItem
            nodeId="7"
            labelText={<a style={{ fontSize: "16px" }}>Forums</a>}
            labelIcon={ForumIcon}
            //   labelInfo="3,566"
            color="#1a73e8"
            bgColor="#e8f0fe"
          />
          <StyledTreeItem
            nodeId="8"
            labelText={<a style={{ fontSize: "16px" }}>Promotions</a>}
            labelIcon={LocalOfferIcon}
            //   labelInfo="733"
            color="#3c8039"
            bgColor="#e6f4ea"
          /> */}
        </StyledTreeItem>

        <StyledTreeItem
          nodeId="2"
          labelText={
            <a style={{ fontSize: "16px" }}>{storeLanguage.FilterbyPrice}</a>
          }
          labelIcon={Label}
        >
          <div>
            <Box sx={{ mr: 3, ml: 3, mb: 3, mt: 3 }}>
              <Slider
                color="secondary"
                min={10}
                max={50000}
                getAriaLabel={() => "Temperature range"}
                value={state}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
              <a>
                {storeLanguage.PRICE}: {state[0]}
              </a>{" "}
              - <a>{state[1]}</a>
            </Box>
          </div>
        </StyledTreeItem>
      </TreeView>
      <TreeView
        aria-label="gmail"
        defaultExpanded={["1"]}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <StyledTreeItem
          nodeId="1"
          labelText={<a style={{ fontSize: "16px" }}>{storeLanguage.Brand}</a>}
          labelIcon={Label}
        >
          {isBrand.map((item) => (
            <Link
              key={item._id}
              href={{
                pathname: router.pathname,
                query: {
                  ...router.query,
                  isbrands: item._id,
                },
              }}
            >
              <StyledTreeItem
                nodeId={item._id}
                labelText={
                  <a style={{ fontSize: "16px" }}>
                    {language === "Thai"
                      ? item.brand_name.Thai
                      : language === "Eng"
                      ? item.brand_name.Eng
                      : language === "China"
                      ? item.brand_name.China
                      : language === "Cambodia"
                      ? item.brand_name.Cambodia
                      : language === "Myanmar"
                      ? item.brand_name.Myanmar
                      : item.brand_name.Laos}
                  </a>
                }
                labelIcon={ForumIcon}
                //   labelInfo="3,566"
                color="#a250f5"
                bgColor="#f3e8fd"
              />
            </Link>
          ))}
        </StyledTreeItem>
      </TreeView>
    </>
  );
}
