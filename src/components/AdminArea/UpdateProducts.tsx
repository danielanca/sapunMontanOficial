import React, { useState, useEffect } from "react";
import styles from "./UpdateProducts.module.scss";
import { getData } from "../../data/productList";
import ShowProduct from "./ShowProduct";
import { NavHashLink } from "react-router-hash-link";
import { deleteProduct } from "./../../services/emails";
type eventShot = {
  eventType: string;
  eventPayload: string;
};

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
  const [productsOnline, setProductsOnline] = useState<productInterface[]>();

  const handleFire = (event: eventShot) => {
    console.log(event);
    if (event.eventType === "deleteProduct") {
      if (typeof productsOnline !== "undefined") {
        let productToDelete = productsOnline[event.eventPayload];
        deleteProduct(productToDelete);
      }
    }
  };

  // const handleModal = (event: string, payload: string) => {
  //   setConfirmDeleteModal(false);
  //   if (event === "modal_Event") {
  //     console.log("We have a modal", event, payload);
  //   }
  // };
  useEffect(() => {
    if (productsOnline == null) {
      getData().then((finalData) => {
        console.log("ProductsOnline: ", finalData);
        setProductsOnline(finalData);
      });
    }
  }, [productsOnline]);

  return (
    <>
      {/* {confirmDeleteModal && <PopModal title={"Doresti sa stergi?"} eventHandler={handleModal} />} */}
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

          {productsOnline != null
            ? Object.values(productsOnline).map((item) => <ShowProduct handleFire={handleFire} productName={item} />)
            : ""}
        </table>
      </div>
    </>
  );
};

export default UpdateProducts;
