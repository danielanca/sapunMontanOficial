/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, Suspense, lazy } from "react";
import ReactGA from "react-ga4";
import "bootstrap/dist/css/bootstrap.min.css";

import MainNavigation from "./Navigation/MainNavigation";

import { getData } from "./data/productList";

import { AuthProvider } from "./components/context/AuthProvider";
import { getCookie } from "./components/CookieConsent/functions";
import CookieConsent from "./components/CookieConsent/CookieConsent";

import NotFound from "./components/NotFound/NotFound";

import "./App.css";
// ReactGA.initialize('G-2WGBH4M82T');
// ReactGA.send('pageview');

export const ProductsContext = React.createContext<any[]>([]);

const AdminArea = lazy(() => import("./components/AdminArea/AdminArea"));
const RequireAuth = lazy(() => import("./components/AdminArea/RequireAuth"));
const Login = lazy(() => import("./components/AdminArea/LogIn"));
const UpdateProducts = lazy(() => import("./components/AdminArea/UpdateProducts"));
const EditProduct = lazy(() => import("./components/AdminArea/EditProduct"));
const OrderView = lazy(() => import("./components/OrderView/OrderView"));
const Testimonials = lazy(() => import("./components/Testimonials"));
const CartPage = lazy(() => import("./components/CartPage"));
const SimpleContent = lazy(() => import("./blocks/SimpleContent"));
const FinishOrder = lazy(() => import("./components/CartPage/FinishOrder"));
const Navbar = lazy(() => import("./components/Navbar"));
const ProduseleNoastre = lazy(() => import("./components/ProduseleNoastre"));
const ProductView = lazy(() => import("./components/Product/ProductView"));
const CheckAuth = lazy(() => import("./components/AdminArea/CheckAuth"));
const Blogs = lazy(() => import(/* webpackChunkName: "Blogs" */ "./components/Blogs"));
const BlogPost = lazy(() => import(/* webpackChunkName: "BlogPost" */ "./components/BlogPost"));
const FooterMontan = lazy(() => import(/* webpackChunkName: "FooterMontan" */ "./components/FooterMontan"));

const Loading = () => <div>LOADING</div>;

function App() {
  const [letsCartHandler, CartHandler] = useState(1);
  const [ssProducts, setSSproducts] = useState<any>();

  const getCookieConsent = () => {
    if (getCookie("cookieConsentBrasov") === "userAccepted") return false;
    else return true;
  };

  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom) {
      ReactGA.event("User scrolled to bottom");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (ssProducts == null) {
      getData().then((finalData) => {
        console.log("Loading in Session Storage data about products", finalData);
        sessionStorage.setItem("productsFetched", JSON.stringify(finalData));
      });
    }
  }, [ssProducts]);

  return (
    <div className="App">
      {getCookieConsent() && <CookieConsent />}
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <React.Suspense fallback={Loading}>
            <BrowserRouter basename="/">
              <AuthProvider>
                <Navbar clearNotif={letsCartHandler} />
                <Routes>
                  {/* protect this */}

                  <Route element={<RequireAuth />}>
                    <Route path="/admin" element={<AdminArea />} />
                    <Route path="/admin/products" element={<UpdateProducts />} />
                    <Route path="/admin/products/edit-:productID" element={<EditProduct editMode={true} />} />
                    <Route path="/admin/products/add" element={<EditProduct editMode={false} />} />
                  </Route>
                  <Route element={<CheckAuth />}>
                    <Route path="/login" element={<Login />} />
                  </Route>
                  {/* protect the above */}

                  <Route path={`${process.env.PUBLIC_URL}/produsele-noastre`} element={<ProduseleNoastre />} />
                  <Route path="/produs/:productID" element={<ProductView notifyMe={CartHandler} />} />
                  <Route path="/cosulmeu" element={<CartPage notifyMe={CartHandler} />} />
                  <Route path="/finalizare-comanda" element={<FinishOrder clearNotification={CartHandler} />} />

                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogid/:blogLink" element={<BlogPost />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/order/:orderID" element={<OrderView />} />
                  <Route path="/" element={<MainNavigation />} />

                  {/* Content Template*/}
                  <Route path="/termeni-si-conditii" element={<SimpleContent type={"Terms"} />} />
                  <Route path="/metode-plata" element={<SimpleContent type={"PaymentMethods"} />} />
                  <Route path="/politica-retur" element={<SimpleContent type={"RefundPolicy"} />} />
                  <Route path="/politica-confidentialitate" element={<SimpleContent type={"PrivacyPolicy"} />} />
                  <Route path="/politica-de-cookies" element={<SimpleContent type={"CookiesPolicy"} />} />
                  <Route path="/afiliere" element={<SimpleContent type={"AffiliateProgram"} />} />
                  {/* Content Template*/}

                  <Route path="*" element={<NotFound />} />
                </Routes>
                <FooterMontan />
              </AuthProvider>
            </BrowserRouter>
          </React.Suspense>
        </ProductsContext.Provider>
      </header>
    </div>
  );
}

export default App;
