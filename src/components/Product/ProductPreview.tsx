import React, { useState } from "react";
import ProductAdded from "./../PopUps/ProductAdded";
import ProductDescription from "./../ConstantComponents/ProductDescription";
import { ProductTypes } from "./../../utils/OrderInterfaces";

import styles from "./../Product/ProductView.module.scss";
import images from "../../data/images";
import strings from "../../data/strings.json";

const ProductPreview = ({ productListUpdated, ID, addCartHandler }: ProductTypes) => {
  let { ProductPreview: content } = strings;
  const [mainPicture, setmainPicture] = useState<number>(0);
  const [popProductInCart, setpopProductInCart] = useState<boolean>(false);

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
      <div className={styles.sectionParent}>
        <div className={styles.leftSection}>
          <div className={styles.leftContainer}>
            {productListUpdated != null ? (
              <div className={styles.imageActualContainer}>
                <img
                  alt="product for selling"
                  className={styles.imageContainer}
                  src={productListUpdated[ID].imageProduct[mainPicture]}
                />
              </div>
            ) : (
              ""
            )}
            {productListUpdated != null ? (
              <div className={styles.previewImageContainer}>
                {productListUpdated[ID].imageProduct.length > 1 &&
                  productListUpdated[ID].imageProduct.map((image: string, index: number) => {
                    return (
                      <div
                        onClick={onImageClicked.bind(this, index)}
                        className={mainPicture === index ? styles.activeImage : styles.clickableImage}
                      >
                        <img
                          alt="product for selling"
                          className={styles.innerImage}
                          src={productListUpdated[ID].imageProduct[index]}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.rightContainer}>
            <h3 className={styles.productTitle}>{productListUpdated != null ? productListUpdated[ID].title : "..."}</h3>
            <div className={styles.reviewContainer}>
              <div className={styles.starsContainer}>
                <img alt="stars icons" className={styles.reviewStar} src={images.star} />
                <img alt="stars icons" className={styles.reviewStar} src={images.star} />
                <img alt="stars icons" className={styles.reviewStar} src={images.star} />
                <img alt="stars icons" className={styles.reviewStar} src={images.star} />
                <img alt="stars icons" className={styles.reviewStar} src={images.star} />
              </div>
              <span className={styles.reviewHead}>
                {productListUpdated != null
                  ? Object.values(productListUpdated[ID].reviews).length !== 0
                    ? `(${Object.values(productListUpdated[ID].reviews).length})`
                    : content.callActionForReview
                  : ""}
              </span>
            </div>
            {productListUpdated && (
              <>
                <div className={styles.shortDescription}>{productListUpdated[ID].shortDescription}</div>
                <div className={styles.longDescription}>{productListUpdated[ID].firstDescription}</div>
              </>
            )}
            {productListUpdated && (
              <>
                <div className={styles.priceWrapper}>
                  <div className={styles.productPrice}>{productListUpdated[ID].price + " LEI"}</div>
                </div>
                <div className={styles.actionContainer}>
                  <button onClick={addToCartEvent} className={styles.addToCart}>
                    {content.addToCartText}
                  </button>
                </div>
              </>
            )}

            {popProductInCart && <ProductAdded animFin={animEnded} id={ID} />}
          </div>
        </div>

        {productListUpdated && <ProductDescription productDescription={productListUpdated} productID={ID} />}
      </div>
    </>
  );
};

export default ProductPreview;
