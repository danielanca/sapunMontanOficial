// @ts-nocheck
import React, { useState, useEffect } from "react";
import styles from "./UpdateProducts.module.scss";
import { getData } from "../../data/productList";
import ShowProduct from "./ShowProduct";
import { NavHashLink } from "react-router-hash-link";

interface productInterface {
  ID: string;
  ULbeneficii: [];
  firstDescription: string;
  imageProduct: [];
  jsonContent: string;
  price: string;
  reviews: {};
  shortDescription: string;
  title: string;
}
const UpdateProducts = () => {
  const [productsOnline, setProductsOnline] = useState<any>();

  useEffect(() => {
    if (productsOnline == null) {
      getData().then((finalData) => {
        console.log("ProductsOnline: ", finalData);
        setProductsOnline(finalData);
      });
    }
  }, [productsOnline]);

  return (
    <div className={styles.productPanel}>
      <div className={styles.controlArea}>
        <h3>{"Product List"}</h3>
        <div className={styles.otherActions}>
          <NavHashLink replace to={"/admin/products/add"}>
            <div className={styles.actionButton}>
              <span className={styles.textInside}>{"Adauga "}</span>
            </div>
          </NavHashLink>
        </div>
      </div>

      <table className={styles.tableStyle}>
        <tr>
          <th>Preview</th>
          <th>Title</th>
          <th>Action</th>
        </tr>

        {productsOnline != null ? Object.values(productsOnline).map((item) => <ShowProduct productName={item} />) : ""}
      </table>
    </div>
  );
};

export default UpdateProducts;
