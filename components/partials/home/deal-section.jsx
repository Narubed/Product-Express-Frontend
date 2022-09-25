import React, { useState, useEffect } from "react";
import DisCar from "./components/disCar";
import { Carousel } from "@trendyol-js/react-carousel";
export default function Discount() {
  const [isDesktop, setIsDesktop] = useState(false);
  function MediaQuery() {
    {
      useEffect(() => {
        const media = window.matchMedia("(min-width: 960px)");
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener("resize", listener);

        return () => window.removeEventListener("resize", listener);
      }, [isDesktop]);

      return (
        <div>{isDesktop ? <DisCar show={5.5} /> : <DisCar show={2.5} />}</div>
      );
    }
  }

  return (
    <div
      style={{
        boxShadow: "rgb(0 0 0 / 10%) 5px -2px 19px 9px",
        marginRight: "1%",
        marginLeft: "2%",
        marginBottom: "1%",
        marginTop: "1%",
      }}
    >
      <div className="row">
        <div className="col">
          <h4 style={{ paddingLeft: "3%", paddingTop: "3%" }}>
            <strong>สินค้าแนะนำสำหรับคุณ</strong>
          </h4>
        </div>
        <div
          className="col"
          style={{ textAlign: "end", marginTop: "1%", marginBottom: "1%" }}
        >
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginRight: "2%" }}
          >
            View All
          </button>
        </div>
      </div>
      <div className="App">
        <MediaQuery />
      </div>
    </div>
  );
}
