import { HashLink } from "react-router-hash-link";

import styles from "./../components/ProductItem.module.scss";

interface productObject {
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

interface ProdProps {
  productObject: productObject;
  size?: string;
}
const ProductItem = ({ productObject, size }: ProdProps) => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderSize = () => {
    if (size != null && size === "small") {
      return styles.productItemSmall;
    } else {
      return styles.productItem;
    }
  };
  return (
    <HashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/produs/" + productObject.ID}>
      <div className={renderSize()}>
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
