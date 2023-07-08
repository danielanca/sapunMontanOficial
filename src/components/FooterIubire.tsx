import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { uniqueId } from "lodash";

import Relaxbar from "./MiniComponents/Footers/Relaxbar";
import { footerData } from "./../data/componentStrings";
import styles from "./../components/FooterIubire.module.scss";
import NewsletterBanner from "./MiniComponents/HeadLiners/NewsletterBanner";
import allPathsURL from "./../data/allPathsURL.json";
import "./../style/style.css";
import "./../style/responsive.css";
import "./../style/plugins.css";
import "./../style/font-icons.css";
import "./../sass/style.scss";
const FooterMontan = () => {
  const { pathname } = useLocation();

  return (
    <footer className="ltn__footer-area  ">
      <div className="footer-top-area  section-bg-1 plr--5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-md-6 col-sm-6 col-12">
              <div className="footer-widget footer-about-widget">
                <div className="footer-logo">
                  <div className="site-logo">
                    <img src="img/logo.png" alt="Logo"></img>
                  </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the
                  printing.
                </p>
                <div className="footer-address">
                  <ul>
                    <li>
                      <div className="footer-address-icon">
                        <i className="icon-placeholder"></i>
                      </div>
                      <div className="footer-address-info">
                        <p>Brooklyn, New York, United States</p>
                      </div>
                    </li>
                    <li>
                      <div className="footer-address-icon">
                        <i className="icon-call"></i>
                      </div>
                      <div className="footer-address-info">
                        <p>
                          <a href="tel:+0123-456789">+0123-456789</a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <div className="footer-address-icon">
                        <i className="icon-mail"></i>
                      </div>
                      <div className="footer-address-info">
                        <p>
                          <a href="mailto:example@example.com">example@example.com</a>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="ltn__social-media mt-20">
                  <ul>
                    <li>
                      <a href="#" title="Facebook">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Twitter">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Linkedin">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Youtube">
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget footer-menu-widget clearfix">
                <h4 className="footer-title">Company</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="about.html">About</a>
                    </li>
                    <li>
                      <a href="blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="shop.html">All Products</a>
                    </li>
                    <li>
                      <a href="locations.html">Locations Map</a>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget footer-menu-widget clearfix">
                <h4 className="footer-title">Services.</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="order-tracking.html">Order tracking</a>
                    </li>
                    <li>
                      <a href="wishlist.html">Wish List</a>
                    </li>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="account.html">My account</a>
                    </li>
                    <li>
                      <a href="about.html">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="about.html">Promotional Offers</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-md-6 col-sm-6 col-12">
              <div className="footer-widget footer-menu-widget clearfix">
                <h4 className="footer-title">Customer Care</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="account.html">My account</a>
                    </li>
                    <li>
                      <a href="wishlist.html">Wish List</a>
                    </li>
                    <li>
                      <a href="order-tracking.html">Order tracking</a>
                    </li>
                    <li>
                      <a href="faq.html">FAQ</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-sm-12 col-12">
              <div className="footer-widget footer-newsletter-widget">
                <h4 className="footer-title">Newsletter</h4>
                <p>Subscribe to our weekly Newsletter and receive updates via email.</p>
                <div className="footer-newsletter">
                  <form action="#">
                    <input type="email" name="email" placeholder="Email*"></input>
                    <div className="btn-wrapper">
                      <button className="theme-btn-1 btn" type="submit">
                        <i className="fas fa-location-arrow"></i>
                      </button>
                    </div>
                  </form>
                </div>
                <h5 className="mt-30">We Accept</h5>
                <img src="img/icons/payment-4.png" alt="Payment Image"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__copyright-area ltn__copyright-2 section-bg-2  ltn__border-top-2--- plr--5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="ltn__copyright-design clearfix">
                <p>
                  Toate drepturile sunt rezervate @ DinIubire.Ro <span className="current-year">2023</span>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-12 align-self-center">
              <div className="ltn__copyright-menu text-right">
                <ul>
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Claim</a>
                  </li>
                  <li>
                    <a href="#">Privacy & Policy</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    // <>
    //   {!pathname.includes(allPathsURL.adminURL) && !pathname.includes(allPathsURL.loginURL) && (
    //     <div classNameName={styles.fluidHandler}>
    //       {!pathname.includes(allPathsURL.cartPageURL) && !pathname.includes(allPathsURL.finishOrderURL) && (
    //         <>
    //           <Relaxbar />
    //           <NewsletterBanner />
    //         </>
    //       )}

    //       <div classNameName={"row " + styles.largeFooter}>
    //         <div classNameName="col-md-4">
    //           <div classNameName="row">
    //             <div classNameName={"col " + styles.footItem}>
    //               <h3 classNameName={styles.footerTittleCenter}>{"LINK-URI UTILE"}</h3>
    //               {Object.values(footerData.linkuriUtile).map((item) => (
    //                 <a key={uniqueId()} href={item.link}>
    //                   <p classNameName={styles.classNameicText}>{item.name}</p>
    //                 </a>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //         <div classNameName="col-md-4">
    //           <div classNameName="row">
    //             <div classNameName={"col " + styles.footItem}>
    //               <h3 classNameName={styles.footerTittleCenter}>{"AMINTIRE PENTRU TOTDEAUNA"}</h3>
    //               <p key={uniqueId()} classNameName={styles.classNameicText}>
    //                 {
    //                   "Scopul nostru este să oferim produse prin care puteti crea momente unice ce rămân, alături de cei dragi. "
    //                 }
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //         <div classNameName="col-md-4 ">
    //           <div classNameName="row">
    //             <div classNameName={"col " + styles.footItem}>
    //               <h3 classNameName={styles.footerTittleCenter}>{"MAGAZINUL NOSTRU"}</h3>
    //               {Object.values(footerData.ourShop).map((item) => (
    //                 <a key={uniqueId()} href={item.link}>
    //                   <p classNameName={styles.classNameicText}>{item.name}</p>
    //                 </a>
    //               ))}
    //             </div>
    //           </div>
    //         </div>

    //         <div classNameName={styles.wideBanner}>
    //           <p classNameName={styles.statementRO}>{"Făcut cu ❤️ in Romania"}</p>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
  );
};

export default FooterMontan;
