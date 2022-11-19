import Image from "next/image";
import Link from "next/link";
import Logo from "~/public/images/pages/logo/รูปโลโก้-214x65px-01.png";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
      
        <div className="footer-middle">
        
          <div className="row pt-2">
          
            <div className="col-lg-2 d-flex align-items-center">
            <div className="background-effect-wrapper">
              <div className="background-effect kenBurnsToLeft">
                <div className="particle-effect sparkle"></div>
              </div>
            </div>
              <div className="logo-footer mb-5">
                <Image
                  src={Logo.src}
                  alt="logo-footer"
                  width="154"
                  height="43"
                />
              </div>
            </div>
            
            <div className="col-lg-3 col-contact col-md-6">
            
              <div className="widget widget-contact">
              
                <h4 className="widget-title">Get In Touch</h4>
                
                <ul className="widget-body">
                  <li>
                    <label>Phone</label>
                    <Link href="tel:052083244">Toll Free (052) 083-244</Link>
                  </li>
                  <li>
                    <label>Email</label>
                    <Link href="nbadigitalservice@gmail.com">
                      nbadigitalservice@gmail.com
                    </Link>
                  </li>
                  <li>
                    <label>Address</label>
                    <a
                      href="https://goo.gl/maps/98Wb7Dcmtm9iJdJr5"
                      target="_blank"
                      rel="noreferrer"
                    >
                      298/1 Moo 3, Tambon San Phak Wan, Amphoe Hang Dong, Chiang
                      Mai 50230
                    </a>
                  </li>
                  <li>
                    <label>WORKING DAYS / HOURS</label>
                    <Link href="#">Mon - Sun / 9:00 AM - 8:00 PM</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-account col-md-6">
              <div className="widget">
                <h4 className="widget-title">My Account</h4>
                <ul className="widget-body">
                  <li>
                    <a
                      href="https://nbadigitalservice.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://product-e-admin-front.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Admin Web
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://product-express-partner.nbadigitalservice.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Partner Web
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget widget-newsletter form-wrapper">
                <div className="newsletter-info">
                  <h4 className="widget-title">Subscribe Newsletter</h4>
                  <p>
                    Subscribe to NBA Digital Service Center eCommerce newsletter
                    to receive timely updates from your favourite products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <p className="copyright">NBA Digital Service Center</p>
          </div>
          <div className="footer-right">
            <figure className="d-flex">
            
              <Image
                src="https://d-themes.com/react/riode/demo-medical/images/home/payment.png"
                alt="payment"
                width="272"
                height="20"
              />
            </figure>
          </div>
        </div>
      </div>
    </footer>
  );
}
