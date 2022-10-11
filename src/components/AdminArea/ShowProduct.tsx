import React from "react";
import styles from "./ShowProduct.module.scss";
import { HashLink, NavHashLink } from "react-router-hash-link";

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
type eventShot = {
  eventType: string;
  eventPayload: string;
};
interface productProps {
  productName: productInterface;
  handleFire: (event: eventShot) => void;
}
const ShowProduct = ({ productName, handleFire }: productProps) => {
  return (
    <>
      <tr className={styles.productRow}>
        <td>
          <div className={styles.imageWrap}>
            <img className={styles.productImage} src={productName.imageProduct[0]}></img>
          </div>
        </td>
        <td>
          <div className={styles.titleWrap}>
            <span className={styles.productTitle}>{productName.title}</span>
          </div>
        </td>
        <td className={styles.actionAreaAdmin}>
          <HashLink className={styles.HashLinkStyle} to={"/admin/products/edit-" + productName.ID}>
            <div className={styles.addCartWrap}>
              <div className={styles.actionButton}>
                <span className={styles.textInside}>{"EDITEAZA"}</span>
              </div>
            </div>
          </HashLink>
          <div
            onClick={(event) => handleFire({ eventType: "deleteProduct", eventPayload: productName.ID })}
            className={styles.actionButtonAlert}
          >
            <span className={styles.textInside}>{"Sterge"}</span>
          </div>
        </td>
      </tr>
    </>
  );
};
// <HashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/produs/" + productName.ID}>
export default ShowProduct;
