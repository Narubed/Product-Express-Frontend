import React, { useState, useEffect } from "react";
// import Radium, { StyleRoot } from "radium";
import DisCar from "./disCar";
function Discount() {
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
        <div className="App">
          {isDesktop ? <DisCar show={5.5} /> : <DisCar show={2.5} />}
        </div>
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
            class="btn btn-primary"
            style={{ marginRight: "2%" }}
          >
            View All
          </button>
        </div>
      </div>
      {/* <StyleRoot> */}
      <div className="App">
        <MediaQuery />
      </div>
      {/* </StyleRoot> */}
    </div>
  );
}

export default Discount;
