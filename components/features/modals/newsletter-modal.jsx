import { useState, useEffect } from "react";
import Modal from "react-modal";
import Cookie from "js-cookie";
import Link from "next/link";
import Image1 from "~/public/images/pages/logo/รูปโฆษณา-720x384px-01.jpg"

const modalStyles = {
  content: {
    position: "relative",
  },
  overlay: {
    background: "rgba(0,0,0,.4)",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
  },
};

Modal.setAppElement("#__next");

export default function NewsletterModal() {
  const [modalState, setModalState] = useState(false);
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    let timer;
    Cookie.get("hideNewsletter") ||
      (timer = setTimeout(() => {
        setModalState(true);
      }, 5000));

    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  function closeModal() {
    document
      .querySelector(".ReactModal__Overlay.newsletter-modal-overlay")
      .classList.add("removed");
    document
      .querySelector(".newsletter-popup.ReactModal__Content")
      .classList.remove("ReactModal__Content--after-open");

    setTimeout(() => {
      setModalState(false);

      noMore &&
        Cookie.set("hideNewsletter", "true", {
          expires: 7,
          path: window.location.pathname,
        });
    }, 250);
  }

  function handleChange(event) {
    setNoMore(event.target.checked);
  }

  return (
    <Modal
      isOpen={modalState}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldReturnFocusAfterClose={false}
      overlayClassName="newsletter-modal-overlay"
      className="newsletter-popup bg-img"
    >
      <div
        className="newsletter-popup"
        id="newsletter-popup"
        style={{
          backgroundImage:
            `url(${Image1.src})`,
        }}
      >
        <div className="newsletter-content">
          <h4 className="text-uppercase text-dark">
            <span className="text-primary"> Welcome </span>
          </h4>
          <h2 className="font-weight-semi-bold">
            To <span>Product Express</span>
          </h2>
          <p className="text-grey">
            This is an online merchandising program of the NBA Digital Service
            Center Company.
          </p>
          <form
            action="#"
            method="get"
            className="input-wrapper input-wrapper-inline input-wrapper-round"
          >
            <Link href="https://nbadigitalservice.com" target="_blank">
              <button
                className="btn btn-dark"
                type="submit"
                style={{ width: "100%" }}
              >
                NBA Digital Service Center
              </button>
            </Link>
          </form>
          <div className="form-checkbox justify-content-center">
            <input
              type="checkbox"
              value={noMore}
              className="custom-checkbox"
              id="hide-newsletter-popup"
              onChange={handleChange}
              name="hide-newsletter-popup"
              required
            />
            <label htmlFor="hide-newsletter-popup">
              Don t show this popup again
            </label>
          </div>
        </div>
        <button
          title="Close (Esc)"
          type="button"
          className="mfp-close"
          onClick={closeModal}
        >
          <span>×</span>
        </button>
      </div>
    </Modal>
  );
}
