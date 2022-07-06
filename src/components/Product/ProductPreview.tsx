import styles from "./../Product/ProductView.module.scss";
import React from "react";
import images from "../../data/images";
import { useState } from "react";
import ProductAdded from "./../PopUps/ProductAdded";
import { ProductListType } from "./../../utils/OrderInterfaces";

interface ProductTypes {
  previewOnly?: boolean;
  productListUpdated?: ProductListType;
  ID: string;
  addCartHandler?: () => void;
}

const ProductPreview = ({ previewOnly, productListUpdated, ID, addCartHandler }: ProductTypes) => {
  const [mainPicture, setmainPicture] = useState(0);
  const onImageClicked = (event: number) => {
    setmainPicture(event);
    console.log(event);
  };

  const [popProductInCart, setpopProductInCart] = useState(false);
  const animEnded = () => {
    setpopProductInCart(false);
  };
  return (
    <>
      <div className={"row " + styles.sectionParent}>
        <div className={"col-md-6 " + styles.leftSection}>
          <div className={styles.leftContainer}>
            {productListUpdated != null ? (
              <div className={styles.imageActualContainer}>
                <img className={styles.imageContainer} src={productListUpdated.imageProduct[mainPicture]} />
              </div>
            ) : (
              ""
            )}
            {productListUpdated != null ? (
              <div className={styles.previewImageContainer}>
                <div
                  onClick={onImageClicked.bind(this, 0)}
                  className={mainPicture === 0 ? styles.activeImage : styles.clickableImage}
                >
                  <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[0]} />
                </div>
                <div
                  onClick={onImageClicked.bind(this, 1)}
                  className={mainPicture === 1 ? styles.activeImage : styles.clickableImage}
                >
                  <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[1]} />
                </div>
                <div
                  onClick={onImageClicked.bind(this, 2)}
                  className={mainPicture === 2 ? styles.activeImage : styles.clickableImage}
                >
                  <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[2]} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={"col-md-6 " + styles.rightSection}>
          <div className={styles.rightContainer}>
            <h3 className={styles.productTitle}>{productListUpdated != null ? productListUpdated[ID].title : "..."}</h3>
            <div className={styles.reviewContainer}>
              <div className={styles.starsContainer}>
                <img className={styles.reviewStar} src={images.star} />
                <img className={styles.reviewStar} src={images.star} />
                <img className={styles.reviewStar} src={images.star} />
                <img className={styles.reviewStar} src={images.star} />
                <img className={styles.reviewStar} src={images.star} />
              </div>
              <span className={styles.reviewHead}>
                {productListUpdated != null
                  ? productListUpdated[ID].hasOwnProperty("reviews")
                    ? Object.values(productListUpdated[ID].reviews).length + " RECENZII"
                    : " FARA RECENZII"
                  : ""}
              </span>
            </div>
            {productListUpdated != null ? (
              <>
                <div className={styles.shortDescription}>{productListUpdated[ID].shortDescription}</div>
                <div className={styles.longDescription}>{productListUpdated[ID].firstDescription}</div>
              </>
            ) : (
              ""
            )}
            {productListUpdated != null ? (
              <>
                <div className={styles.priceWrapper}>
                  <div className={styles.productPrice}>{productListUpdated[ID].price + " LEI"}</div>
                </div>
                <div className={styles.actionContainer}>
                  <button onClick={addCartHandler} className={styles.addToCart}>
                    {"ADAUGĂ IN COȘ"}
                  </button>
                </div>
              </>
            ) : (
              ""
            )}

            {popProductInCart && <ProductAdded animFin={animEnded} id={ID} />}
          </div>
        </div>
      </div>
    </>
  );
};

// export default React.memo(ProductPreview);

export default ProductPreview;
