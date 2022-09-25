import React from "react";
import SlideToggle from "react-slide-toggle";

import Link from "next/link";

export default function Card(props) {
  const {
    title,
    expanded = false,
    adClass,
    iconClass,
    type = "normal",
    url,
  } = props;

  return "normal" === type ? (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <div className={`card ${adClass}`}>
          <div className={`card-header`} onClick={onToggle}>
            <Link href="#">
              <button className={`toggle-button ${toggleState.toLowerCase()}`}>
                {iconClass ? <i className={iconClass}></i> : ""}
                {title ? title : ""}
              </button>
            </Link>
          </div>

          <div ref={setCollapsibleElement}>
            <div className="card-body overflow-hidden">{props.children}</div>
          </div>
        </div>
      )}
    </SlideToggle>
  ) : "parse" === type ? (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <Link href={url ? url : "#"} content={title}>
            <button
              className={`parse-content ${toggleState.toLowerCase()}`}
              onClick={(e) => {
                onToggle();
              }}
            ></button>
          </Link>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  ) : (
    <SlideToggle collapsed={expanded ? false : true}>
      {({ onToggle, setCollapsibleElement, toggleState }) => (
        <>
          <Link href={url ? url : "#"}>
            <button>
              {title}
              <span
                className={`toggle-btn ${toggleState.toLowerCase()}`}
                onClick={(e) => {
                  onToggle();
                  e.preventDefault();
                }}
              ></span>
            </button>
          </Link>

          <div ref={setCollapsibleElement} className="overflow-hidden">
            {props.children}
          </div>
        </>
      )}
    </SlideToggle>
  );
  return "";
}
