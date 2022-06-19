import { HashLink } from "react-router-hash-link";
import productList from "./../data/productList";

import styles from "./../components/ProductItem.module.scss";

interface productObject {
  ID: number;
  title: string;
  price: string;
  shortDescription: string;
  imageProduct: string[];
}

interface ProdProps {
  productObject: productObject;
  width?: number;
}
const ProductItem = ({ productObject, width }: ProdProps) => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HashLink onClick={gotoElement} className={"col-md-3 " + styles.HashLinkStyle} to={"/produs/" + productObject.ID}>
      <div className={styles.productItem}>
        <div className={styles.imageWrap}>
          <img className={styles.productImage} src={productObject.imageProduct[0]}></img>
        </div>
        <div className={styles.titleWrap}>
          <span className={styles.productTitle}>{productObject.title}</span>
        </div>

        <div className={styles.priceWrap}>
          <span className={styles.productPrice}>{productObject.price + " LEI"}</span>
        </div>
        <div className={styles.addCartWrap}>
          <div className={styles.addButtonCart}>
            <span className={styles.textInside}>{"Vezi produs"}</span>
          </div>
        </div>
      </div>
    </HashLink>
  );
};

export default ProductItem;
