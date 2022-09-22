import ALink from '~/components/features/custom-link';

export default function Footer () {
    return (
        <footer className="footer">
            <div className="footer-middle">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-3 col-lg-4 col-sm-6">
                            <div className="widget widget-about">
                                <ALink href="/" className="logo-footer mb-5">
                                    <img src="./images/home/logo-footer.png" alt="logo-footer" width="154" height="43" />
                                </ALink>

                                <div className="widget-body">
                                    <p className="ls-s">Fringilla urna porttitor rhoncus dolor purus<br />
                                        luctus venenatis lectus magna fringilla diam<br />
                                        maecenas ultricies mi eget mauris.</p>
                                    <ALink href="mailto:mail@riode.com">Riode@example.com</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Account</h4>

                                <ul className="widget-body">
                                    <li><ALink href="/pages/account">My Account</ALink></li>
                                    <li><ALink href="#">Our Guarantees</ALink></li>
                                    <li><ALink href="#">Terms And Conditions</ALink></li>
                                    <li><ALink href="#">Privacy Policy</ALink></li>
                                    <li><ALink href="#">Intellectual Property Claims</ALink></li>
                                    <li><ALink href="#">Site Map</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Get Help</h4>

                                <ul className="widget-body">
                                    <li><ALink href="#">Shipping &amp; Delivery</ALink></li>
                                    <li><ALink href="#">Order Status</ALink></li>
                                    <li><ALink href="#">Brand</ALink></li>
                                    <li><ALink href="#">Returns</ALink></li>
                                    <li><ALink href="#">Payment Options</ALink></li>
                                    <li><ALink href="/pages/contact-us">Contact Us</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-2 col-lg-4 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">About Us</h4>
                                <ul className="widget-body">
                                    <li><ALink href="/pages/about-us">About Us</ALink></li>
                                    <li><ALink href="#">Order History</ALink></li>
                                    <li><ALink href="#">Returns</ALink></li>
                                    <li><ALink href="#">Custom Service</ALink></li>
                                    <li><ALink href="#">Terms &amp; Condition</ALink></li>
                                    <li><ALink href="#">Site Map</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xl-3 col-lg-8">
                            <div className="widget mb-4">
                                <h4 className="widget-title">Subscribe to our newsletter</h4>

                                <div className="widget-body widget-newsletter mt-1">
                                    <form action="#" className="input-wrapper input-wrapper-inline mb-5">
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email address here..." required />
                                        <button className="btn btn-primary font-weight-bold" type="submit">subscribe <i className="d-icon-arrow-right"></i></button>
                                    </form>
                                </div>
                            </div>

                            <div className="footer-info d-flex align-items-center justify-content-between">
                                <figure className="payment">
                                    <img src="./images/home/payment.png" alt="payment" width="135" height="24" />
                                </figure>
                                <div className="social-links">
                                    <a href="#" className="social-link social-facebook fab fa-facebook-f"></a>
                                    <a href="#" className="social-link social-twitter fab fa-twitter"></a>
                                    <a href="#" className="social-link social-linkedin fab fa-linkedin-in"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom d-block text-center">
                <p className="copyright">Riode eCommerce &copy; 2021. All Rights Reserved</p>
            </div>
        </footer>
    )
}