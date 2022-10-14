import React from "react";
import images from "../../data/images";
import { useState } from "react";
import ProductAdded from "./../PopUps/ProductAdded";
import { ProductListType } from "./../../utils/OrderInterfaces";
import ProductDescription from "./../ConstantComponents/ProductDescription";
import styles from "./../Product/ProductView.module.scss";

interface ProductTypes {
  previewOnly?: boolean;
  productListUpdated?: ProductListType;
  ID: string;
  addCartHandler?: () => void;
}

const ProductPreview = ({ previewOnly, productListUpdated, ID, addCartHandler }: ProductTypes) => {
  const [mainPicture, setmainPicture] = useState(0);
  const [popProductInCart, setpopProductInCart] = useState(false);

  const onImageClicked = (event: number) => {
    setmainPicture(event);
    console.log(event);
  };

  const addToCartEvent = () => {
    if (typeof addCartHandler === "function") {
      addCartHandler();
      setpopProductInCart(true);
    }
  };

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
                <img className={styles.imageContainer} src={productListUpdated[ID].imageProduct[mainPicture]} />
              </div>
            ) : (
              ""
            )}
            {productListUpdated != null ? (
              <div className={styles.previewImageContainer}>
                {productListUpdated[ID].imageProduct.length > 1 &&
                  productListUpdated[ID].imageProduct.map((image, index) => {
                    return (
                      <div
                        onClick={onImageClicked.bind(this, index)}
                        className={mainPicture === index ? styles.activeImage : styles.clickableImage}
                      >
                        <img alt=" " className={styles.innerImage} src={productListUpdated[ID].imageProduct[0]} />
                      </div>
                    );
                  })}
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
                  ? Object.values(productListUpdated[ID].reviews).length != 0
                    ? Object.values(productListUpdated[ID].reviews).length + " RECENZII"
                    : " Fii Primul ce lasa review!"
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
                  <button onClick={addToCartEvent} className={styles.addToCart}>
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
        {productListUpdated != null ? (
          <ProductDescription productDescription={productListUpdated} productID={ID} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

// export default React.memo(ProductPreview);

export default ProductPreview;
