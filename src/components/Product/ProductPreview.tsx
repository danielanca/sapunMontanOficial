import React, { useState } from "react";
import ProductAdded from "./../PopUps/ProductAdded";
import ProductDescription from "./../ConstantComponents/ProductDescription";
import { ProductTypes } from "./../../utils/OrderInterfaces";
import styles from "./../Product/ProductView.module.scss";
import images from "../../data/images";
import { sendTriggerEmail } from "./../../services/triggers";
import strings from "../../data/strings.json";
import CountdownTimer from "./Countdown/CountdownTimer";
import parse from "html-react-parser";
const ProductPreview = ({ productListUpdated, ID, addCartHandler }: ProductTypes) => {
  let { ProductPreview: content } = strings;
  const [mainPicture, setmainPicture] = useState<number>(0);
  const [popProductInCart, setpopProductInCart] = useState<boolean>(false);
  const countdownAllowed = true;
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();

  const remainingHours = 23 - currentHours;
  const remainingMinutes = 59 - currentMinutes;
  const remainingSeconds = 59 - currentSeconds;

  const onImageClicked = (event: number) => {
    setmainPicture(event);
  };

  const addToCartEvent = () => {
    if (typeof addCartHandler === "function") {
      addCartHandler();
      setpopProductInCart(true);
    }
    sendTriggerEmail({ typeEvent: "ADD_TO_CART_EVENT", url: window.location.pathname });
  };

  const animEnded = () => {
    setpopProductInCart(false);
  };
  let dateToday = new Date();
  let dateTommorow = dateToday.getDate() + 1;
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
              {/* <span className={styles.reviewHead}>
                {productListUpdated != null
                  ? Object.values(productListUpdated[ID].reviews).length !== 0
                    ? `(${Object.values(productListUpdated[ID].reviews).length})`
                    : content.callActionForReview
                  : ""}
              </span> */}
            </div>
            {productListUpdated && (
              <>
                <div className={styles.shortDescription}>
                  <p>{parse(productListUpdated[ID].shortDescription)}</p>
                </div>
                <div className={styles.longDescription}>{parse(productListUpdated[ID].firstDescription)}</div>
              </>
            )}
            {productListUpdated && (
              <>
                <div className={styles.priceWrapper}>
                  <div className={styles.productPriceOld}>
                    {Number(productListUpdated[ID].price) + Number(productListUpdated[ID].price) * 0.45 + " LEI"}
                  </div>
                  <div className={styles.productPrice}>{productListUpdated[ID].price + " LEI"}</div>
                  {countdownAllowed && (
                    <div className={styles.oldPrice}>
                      {parse(
                        `Ofertă valabilă până la <br>ora 23:59 - ${dateToday.getDate()}.${
                          dateToday.getMonth() + 1
                        }.${dateToday.getUTCFullYear()} `
                      )}
                      <CountdownTimer
                        hours={remainingHours}
                        minutes={remainingMinutes}
                        seconds={remainingSeconds}
                        className={styles.timerActual}
                      />
                    </div>
                  )}
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
