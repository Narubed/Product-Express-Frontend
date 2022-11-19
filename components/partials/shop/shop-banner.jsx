import Link from "next/link";
import { Icon } from "@iconify/react";

export default function ShopBanner(props) {
  const { subTitle = "", title = "NBA Shop", current = "NBA Shop" } = props;

  return (
    <div
      className="page-header shop-banner"
      style={{
        backgroundImage: `url(https://nbadigitalservice.com/static/media/background-purple2.37df479a.jpg)`,
        backgroundColor: "#3C63A4",
      }}
    >
      {subTitle ? <h3 className="page-subtitle">{subTitle}</h3> : ""}
      {title ? (
        <h1 className="page-title font-weight-bold ls-md mb-1">{title}</h1>
      ) : (
        ""
      )}
      <ul className="breadcrumb p-0">
        <li>
          {/* <Link href="/"> */}
          <Icon icon="bx:home-alt" />
          {/* </Link> */}
        </li>
        <li className="delimiter">
          <i className="fas fa-angle-right"></i>
        </li>
        <li>{current}</li>
      </ul>
    </div>
  );
}
