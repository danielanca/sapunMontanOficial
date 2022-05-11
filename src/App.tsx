import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

import "bootstrap/dist/css/bootstrap.min.css";

import MainNavigation from "./Navigation/MainNavigation";
import Testimonials from "./components/Testimonials";
import Navbar from "./components/Navbar";
import "./App.css";
import ProduseleNoastre from "./components/ProduseleNoastre";
import ProductView from "./components/ProductView";
import FooterMontan from "./components/FooterMontan";
import CartPage from "./components/CartPage";
import FinishOrder from "./components/CartPage/FinishOrder";
import Blogs from "./components/Blogs";
import EmailTemplate from "./components/EmailTemplate/EmailTemplate";
import BlogPost from "./components/BlogPost";

import { getData } from "./data/productList";
// ReactGA.initialize('G-2WGBH4M82T');
// ReactGA.send('pageview');

export const ProductsContext = React.createContext<any[]>([]);

function App() {
  const [letsCartHandler, CartHandler] = useState(1);
  const [ssProducts, setSSproducts] = useState<any[]>();

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
        // setSSproducts(finalData);
        sessionStorage.setItem("productsFetched", JSON.stringify(finalData));
      });
    }
  }, [ssProducts]);

  return (
    <div className="App">
      <header className="App-header">
        <ProductsContext.Provider productsData={ssProducts}>
          <BrowserRouter basename={"/"}>
            <Navbar updateNotification={letsCartHandler} />
            <Routes>
              <Route path="/" element={<MainNavigation />}></Route>

              <Route path={`${process.env.PUBLIC_URL}/produsele-noastre`} element={<ProduseleNoastre />}></Route>
              <Route path="/produs/:productID" element={<ProductView notifyMe={CartHandler} />}></Route>
              <Route path="/cosulmeu" element={<CartPage notifyMe={CartHandler} />}></Route>
              <Route path="/finalizare-comanda" element={<FinishOrder />}></Route>
              <Route path="/blogs" element={<Blogs />}></Route>
              <Route path="/blogid/:blogid" element={<BlogPost />}></Route>
              <Route path="/testimonials" element={<Testimonials />}></Route>
              <Route path="/email" element={<EmailTemplate />}></Route>
            </Routes>
            <FooterMontan />
          </BrowserRouter>
        </ProductsContext.Provider>
      </header>
    </div>
  );
}

export default App;
