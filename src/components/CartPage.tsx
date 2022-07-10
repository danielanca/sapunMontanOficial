// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavHashLink } from "react-router-hash-link";
import { productConstants } from "../data/componentStrings";
import ItemCartList from "./ItemCartList";

import styles from "./CartPage.module.scss";

interface CartProps {
  notifyMe?: React.Dispatch<React.SetStateAction<number>>;
}
const CartPage = ({ notifyMe }: CartProps) => {
  const [totalCart, settotalCart] = useState(0);
  const [updateMade, setupdateMade] = useState(1);
  var subtotalPrepare = 0;
  var storedCart = [];
  let expectedData = localStorage.getItem("cartData");
  var shippingFee = productConstants.shippingFee;
  let sessionProducts = JSON.parse(sessionStorage.getItem("productsFetched"));
  console.log("Product session:", sessionProducts);
  if (expectedData != null) {
    storedCart = JSON.parse(expectedData);
    console.log("We have");
    console.log(storedCart);

    storedCart.map((item) => {
      console.log("Product price:" + Number(sessionProducts[item.id].price));
      console.log("Product number:" + Number(item.itemNumber));
      console.log("Last length" + storedCart.length);
      console.log("Index " + subtotalPrepare);
      subtotalPrepare += Number(sessionProducts[item.id].price) * Number(item.itemNumber);
    });
  }

  const productNotification = () => {
    setupdateMade(updateMade + 1);
    notifyMe(subtotalPrepare);
  };

  const displayFinishOrderDialog = () => {
    if (subtotalPrepare > 0) {
      return (
        <NavHashLink className={styles.hashTransparent} to="/finalizare-comanda">
          <button className={styles.finishOrder}>{"Finalizeaza comanda"}</button>
        </NavHashLink>
      );
    }
  };
  return (
    <>
      <div className={styles.CartSection}>
        <div className={styles.topTitle}>
          <div className={styles.cartLine} />
          <h3 className={styles.middleCosText}>{"Cos de cumparaturi"}</h3>
          <div className={styles.cartLine} />
        </div>

        {displayFinishOrderDialog()}
        <div className={styles.actualCartBox}>
          <div className={styles.topline}>
            <div className={"col-sm-8 "}>
              <h3 className={styles.cartProductTitle}>{"Produse"}</h3>
            </div>
            <div className={"col-sm-3 "}>
              <h3 className={styles.cartProductTitle}>{"Cantitate"}</h3>
            </div>
          </div>

          {subtotalPrepare != 0 ? (
            storedCart.map((item) => (
              <ItemCartList productID={item.id} amount={Number(item.itemNumber)} updateRequest={productNotification} />
            ))
          ) : (
            <div className={styles.emptyCart}>{"Cosul de cumparaturi este gol"}</div>
          )}
        </div>
        {subtotalPrepare != 0 ? (
          <div className={"row " + styles.actualCheckout}>
            <div className={"col-sm-6 " + styles.bottomLeft}></div>
            <div className={"col-sm-6 " + styles.bottomRight}>
              <div className={styles.checkoutTotal}>
                <h3>{"Total Cos"}</h3>
                <div className={styles.subtotalContainer}>
                  <div className={styles.subtotalLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"Subtotal:"}</p>
                    </div>
                    <div className={"col-sm-8 d-flex justify-content-start align-items-center "}>
                      <p className={styles.subtotalStyle}>{subtotalPrepare + " LEI"}</p>
                    </div>
                  </div>
                  <div className={styles.deliveryLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"Subtotal:"}</p>
                    </div>
                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                      <p className={styles.subtotalStyle}>
                        {`Livrare standard prin SameDay:  ${shippingFee}.00 RON  Livrare oriunde in România.`}
                      </p>
                    </div>
                  </div>
                  <div className={styles.totalLine + " row "}>
                    <div className="col-sm-4 d-flex align-items-center justify-content-end">
                      <p className={styles.toRight}>{"TOTAL:"}</p>
                    </div>
                    <div className="col-sm-8 d-flex justify-content-start align-items-center">
                      <p className={styles.subtotalStyle}>{`${subtotalPrepare + shippingFee}.00 (include TVA)`}</p>
                    </div>
                  </div>
                  <div className={styles.finishTheOrderBox}>
                    <NavHashLink className={styles.hashTransparent} to="/finalizare-comanda">
                      <button className={styles.finishOrder}>{"Finalizeaza comanda"}</button>
                    </NavHashLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default CartPage;
