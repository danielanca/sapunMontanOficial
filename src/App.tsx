/* eslint-disable */
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState, lazy } from "react";
import ReactGA from "react-ga4";

import MainNavigation from "./Navigation/MainNavigation";

import { getData } from "./data/productList";

import { AuthProvider } from "./components/context/AuthProvider";
import { getCookie } from "./components/CookieConsent/functions";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import NotFound from "./components/NotFound/NotFound";

import "./App.css";
import FAQBlock from "./components/FAQBlock/FAQBlock";
import FooterMontan from "./components/FooterMontan";
import InvoiceView from "./components/OrderView/InvoiceView";
import Dashboard from "./components/AdminArea/ShardsDesign/Dashboard";

export const ProductsContext = React.createContext<any[]>([]);
const FinishOrder = lazy(() => import(/*webpackPreload: true*/ "./components/CartPage/FinishOrder"));
const CartPage = lazy(() => import(/*webpackPreload: true*/ "./components/CartPage/CartPage"));
const CheckAuth = lazy(() => import(/*webpackPreload: true*/ "./components/AdminArea/CheckAuth"));
const Blogs = lazy(() => import(/* webpackPreload: true , webpackChunkName: "Blogs" */ "./components/Blogs"));
const BlogPost = lazy(() => import(/* webpackPreload: true,  webpackChunkName: "BlogPost" */ "./components/BlogPost"));
const ProduseleNoastre = lazy(() =>
  import(/*webpackPreload: true , webpackChunkName: "ProduseleNoastre" */ "./components/ProduseleNoastre")
);
const AdminArea = lazy(() =>
  import(/* webpackPrefetch: true, webpackChunkName: "AdminArea" */ "./components/AdminArea/AdminArea")
);
const RequireAuth = lazy(() =>
  import(/*webpackPrefetch: true , webpackChunkName: "RequireAuth"*/ "./components/AdminArea/RequireAuth")
);
const Login = lazy(() => import(/*webpackPrefetch: true , webpackChunkName: "Login" */ "./components/AdminArea/LogIn"));
const UpdateProducts = lazy(() =>
  import(/*webpackPrefetch: true , webpackChunkName: "UpdateProducts"  */ "./components/AdminArea/UpdateProducts")
);

const OrderView = lazy(() => import("./components/OrderView/OrderView"));
// const Testimonials = lazy(() =>
//   import(/*webpackPrefetch: true , webpackChunkName: "Testimonials" */ "./components/Testimonials")
// );

const SimpleContent = lazy(() => import(/*webpackPrefetch: true*/ "./blocks/SimpleContent"));

const Navbar = lazy(() => import(/* webpackChunkName: "Navbar"  */ "./components/Navbar"));

const ProductView = lazy(() => import("./components/Product/ProductView"));

const EditStrings = lazy(() => import("./components/AdminArea/EditStrings/EditStrings"));
import EditProduct from "./components/AdminArea/EditProduct";
import adminRoutes from "./components/AdminArea/ShardsDesign/routes";
import { useScrollSense } from "./components/hooks/senseHook/useScrollSense";
import { CookiesTagConsent, ProductsFromSessionStorage } from "./data/constants";
const Loading = () => <div>LOADING</div>;

// ReactGA.initialize('G-2WGBH4M82T');
// ReactGA.send('pageview');

function App() {
  const [letsCartHandler, CartHandler] = useState(0);
  const [ssProducts, setSSproducts] = useState<any>();

  useScrollSense(() => {
    ReactGA.event(`User scrolled to bottom on [${window.location.pathname}]`);
  });

  const getCookieConsent = () => {
    if (getCookie(CookiesTagConsent) === "userAccepted") return false;
    else return true;
  };

  useEffect(() => {
    if (ssProducts == null) {
      getData().then((finalData) => {
        sessionStorage.setItem(ProductsFromSessionStorage, JSON.stringify(finalData));
      });
    }
  }, [ssProducts]);

  return (
    <div className="App">
      {getCookieConsent() && <CookieConsent />}
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <React.Suspense fallback={Loading()}>
            <BrowserRouter basename="/">
              <AuthProvider>
                <Navbar clearNotif={letsCartHandler} />
                <Routes>
                  {/* protect this */}

                  <Route element={<RequireAuth />}>
                    <Route path="/admin" element={<AdminArea />} />
                    <Route path="/admin/products" element={<UpdateProducts />} />

                    <Route path="/admin/products/add" element={<EditProduct editMode={false} />} />
                    <Route path="/admin/lists" element={<EditStrings />} />
                    <Route path="/admin/newPanel" element={<Dashboard />}>
                      {adminRoutes.map((item, index) => {
                        return (
                          <Route
                            key={index}
                            path={item.path}
                            element={
                              <item.layout>
                                <item.component />
                              </item.layout>
                            }
                          />
                        );
                      })}
                    </Route>
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
                  {/* <Route path="/testimonials" element={<Testimonials />} /> */}
                  <Route path="/order/:orderID" element={<OrderView />} />
                  <Route path="/invoice/:orderID" element={<InvoiceView />} />
                  <Route path="/intrebari" element={<FAQBlock />} />
                  <Route path="/" element={<MainNavigation />} />

                  {/* Content Template*/}
                  <Route path="/termeni-si-conditii" element={<SimpleContent type={"Terms"} />} />
                  <Route path="/metode-plata" element={<SimpleContent type={"PaymentMethods"} />} />
                  <Route path="/politica-retur" element={<SimpleContent type={"RefundPolicy"} />} />
                  <Route path="/politica-confidentialitate" element={<SimpleContent type={"PrivacyPolicy"} />} />
                  <Route path="/politica-de-cookies" element={<SimpleContent type={"CookiesPolicy"} />} />
                  <Route path="/afiliere" element={<SimpleContent type={"AffiliateProgram"} />} />
                  <Route path="/contact" element={<SimpleContent type={"ContactSimple"} />} />
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
