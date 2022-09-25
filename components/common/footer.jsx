import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="widget widget-about">
                <Link href="/">
                  <div className="logo-footer mb-5">
                    <img
                      src="./images/home/logo-footer.png"
                      alt="logo-footer"
                      width="154"
                      height="43"
                    />
                  </div>
                </Link>

                <div className="widget-body">
                  <p className="ls-s">
                    Fringilla urna porttitor rhoncus dolor purus
                    <br />
                    luctus venenatis lectus magna fringilla diam
                    <br />
                    maecenas ultricies mi eget mauris.
                  </p>
                  <Link href="mailto:mail@riode.com">
                    <a>Riode@example.com</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Account</h4>

                <ul className="widget-body">
                  <li>
                    <Link href="/pages/account">
                      <a>My Account</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Our Guarantees</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Terms And Conditions</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Intellectual Property Claims</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Site Map</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">Get Help</h4>

                <ul className="widget-body">
                  <li>
                    <Link href="#">
                      <a>Shipping &amp; Delivery</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Order Status</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Brand</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Returns</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Payment Options</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pages/contact-us">
                      <a>Contact Us</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-sm-6">
              <div className="widget">
                <h4 className="widget-title">About Us</h4>
                <ul className="widget-body">
                  <li>
                    <Link href="/pages/about-us">
                      <a>About Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Order History</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Returns</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Custom Service</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Terms &amp; Condition</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Site Map</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-8">
              <div className="widget mb-4">
                <h4 className="widget-title">Subscribe to our newsletter</h4>

                <div className="widget-body widget-newsletter mt-1">
                  <form
                    action="#"
                    className="input-wrapper input-wrapper-inline mb-5"
                  >
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Email address here..."
                      required
                    />
                    <button
                      className="btn btn-primary font-weight-bold"
                      type="submit"
                    >
                      subscribe <i className="d-icon-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>

              <div className="footer-info d-flex align-items-center justify-content-between">
                <figure className="payment">
                  <img
                    src="./images/home/payment.png"
                    alt="payment"
                    width="135"
                    height="24"
                  />
                </figure>
                <div className="social-links">
                  <a
                    href="#"
                    className="social-link social-facebook fab fa-facebook-f"
                  ></a>
                  <a
                    href="#"
                    className="social-link social-twitter fab fa-twitter"
                  ></a>
                  <a
                    href="#"
                    className="social-link social-linkedin fab fa-linkedin-in"
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom d-block text-center">
        <p className="copyright">
          Riode eCommerce &copy; 2021. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
