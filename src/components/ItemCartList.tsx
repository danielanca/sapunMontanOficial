import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import styles from "./../components/ItemCartList.module.scss";

import productList from "./../data/productList";

interface itemCart {
  productID: number;
  amount?: number;
  updateRequest?: () => void;
}
const ItemCartList = ({ productID, amount, updateRequest }: itemCart) => {
  var storedCart = [];
  let sessionProducts = JSON.parse(sessionStorage.getItem("productsFetched"));

  var value = 0;

  let expectedData = localStorage.getItem("cartData");

  storedCart = JSON.parse(expectedData);
  storedCart.map((item) => {
    if (item.id === productID) {
      amount = Number(item.itemNumber);
      value = amount;
    }
  });

  const addOneItem = () => {
    let expectedData = localStorage.getItem("cartData");
    storedCart = JSON.parse(expectedData);
    storedCart.map((item) => {
      console.log(item);
      if (item.id === productID) {
        item.itemNumber = (Number(item.itemNumber) + 1).toString();
        value = item.itemNumber;
      }
    });

    localStorage.setItem("cartData", JSON.stringify(storedCart));

    updateRequest();
  };

  const removeOneItem = () => {
    let expectedData = localStorage.getItem("cartData");
    storedCart = JSON.parse(expectedData);
    storedCart.map((item) => {
      console.log(item);
      if (item.id === productID) {
        if (item.itemNumber > 1) {
          item.itemNumber = (Number(item.itemNumber) - 1).toString();

          value = item.itemNumber;
        }
      }
    });

    localStorage.setItem("cartData", JSON.stringify(storedCart));

    updateRequest();
  };
  const deleteProduct = () => {
    let expectedData = localStorage.getItem("cartData");
    storedCart = JSON.parse(expectedData);
    var index_del: number;
    storedCart.map((item, index) => {
      console.log(item);
      if (item.id === productID.toString()) {
        index_del = index;
      }
    });
    storedCart.splice(index_del, 1);
    localStorage.setItem("cartData", JSON.stringify(storedCart));
    updateRequest();
  };
  return (
    <div className={styles.cartWrapper}>
      <div className={"col-sm-8 col-xs-12 " + styles.productItem}>
        <HashLink className={styles.HashLinkStyle} to={"/produs/" + productID}>
          <div className={styles.productBox}>
            <div className={styles.imageContainer}>
              <img className={styles.productImage} src={sessionProducts[productID].imageProduct[0]} />
            </div>

            <div className={styles.productDetails}>
              <h3 className={styles.titleInCart}>{sessionProducts[productID].title}</h3>
              <p className={styles.priceInCart}>
                {sessionProducts[productID].price + " LEI"}
                {value > 1 ? <p className={styles.quietPadder}> {"x " + value}</p> : ""}
              </p>
            </div>
          </div>
        </HashLink>
      </div>
      <div className={"col-sm-3 " + styles.quantityBox}>
        <div className={styles.addRemoveCart}>
          <button onClick={addOneItem} className={styles.cartPlus}>
            {"+"}
          </button>
          <div className={styles.cartPrice}>{value}</div>
          <button onClick={removeOneItem} className={styles.cartMinus}>
            {"-"}
          </button>
        </div>
        <div>
          <div onClick={deleteProduct} className={styles.deleteProductCart}>
            {"Sterge Produs"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCartList;
