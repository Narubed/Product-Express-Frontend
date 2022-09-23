import React, { useState, useEffect } from "react";
// import Radium, { StyleRoot } from "radium";
import Instagram from "./components/instagram";
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
          {isDesktop ? <Instagram show={5.5} /> : <Instagram show={2.5} />}
        </div>
      );
    }
  }

  return (
    <div style={{}}>
      <div className="App">
        <MediaQuery />
      </div>
    </div>
  );
}

export default Discount;
