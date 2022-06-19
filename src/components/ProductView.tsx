import styles from "./../components/ProductView.module.scss";
import { getProductWithID } from "./../data/productList";
import reviewStar from "./../media/assets/pics/prezentareCarbune/star_review.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import ProductAdded from "./PopUps/ProductAdded";
import Loader from "./MiniComponents/Loader";
import SuggestionArea from "./SuggestedProducts/SuggestionArea";

interface CartProps {
  notifyMe?: React.Dispatch<React.SetStateAction<number>>;
  productID: number;
}

const ProductView = ({ notifyMe }: CartProps) => {
  let params = useParams();
  var ID = Number(params.productID);

  const [mainPicture, setmainPicture] = useState(0);
  const [popProductInCart, setpopProductInCart] = useState(false);
  const [productListUpdated, setProducts] = useState<any[]>();

  useEffect(() => {
    if (productListUpdated == null) {
      getProductWithID(ID).then((finalData) => {
        setProducts(finalData);
      });
    }
  });

  const onImageClicked = (event: number) => {
    setmainPicture(event);
  };
  const animEnded = () => {
    setpopProductInCart(false);
  };
  const addToCart_Handler = () => {
    var storedCart = [];
    let expectedData = localStorage.getItem("cartData");
    if (expectedData === null) {
      console.log("Data not found");

      storedCart.push({ id: ID, itemNumber: "1" });

      localStorage.setItem("cartData", JSON.stringify(storedCart));
      setpopProductInCart(true);
      notifyMe(Math.floor(Math.random() * 100));
      return;
    }
    var itemFound = false;
    storedCart = JSON.parse(expectedData);

    storedCart.map((item) => {
      if (item.id == ID.toString()) {
        item.itemNumber = (Number(item.itemNumber) + 1).toString();
        itemFound = true;
      }
    });
    if (!itemFound) {
      storedCart.push({ id: ID, itemNumber: "1" });
    }
    localStorage.setItem("cartData", JSON.stringify(storedCart));

    setpopProductInCart(true);
    notifyMe(Math.floor(Math.random() * 100));
  };

  return (
    <>
      <div className={styles.padder}>
        {productListUpdated != null ? (
          <div className={"row " + styles.sectionParent}>
            <div className={"col-md-6 " + styles.leftSection}>
              <div className={styles.leftContainer}>
                {productListUpdated != null ? (
                  <img className={styles.imageContainer} src={productListUpdated[ID].imageProduct[mainPicture]} />
                ) : (
                  ""
                )}
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
              </div>
            </div>

            <div className={"col-md-6  " + styles.rightSection}>
              <div className={styles.rightContainer}>
                <h3 className={styles.productTitle}>{productListUpdated[ID].title}</h3>
                <div className={styles.reviewContainer}>
                  <div className={styles.starsContainer}>
                    <img className={styles.reviewStar} src={reviewStar} />
                    <img className={styles.reviewStar} src={reviewStar} />
                    <img className={styles.reviewStar} src={reviewStar} />
                    <img className={styles.reviewStar} src={reviewStar} />
                    <img className={styles.reviewStar} src={reviewStar} />
                  </div>
                  <span className={styles.reviewHead}>
                    {productListUpdated != null
                      ? productListUpdated[ID].hasOwnProperty("reviews")
                        ? Object.values(productListUpdated[ID].reviews).length + " RECENZII"
                        : " FARA RECENZII"
                      : ""}
                  </span>
                </div>
                <div className={styles.shortDescription}>{productListUpdated[0].shortDescription}</div>
                <div className={styles.longDescription}>
                  {productListUpdated[0].firstDescription}

                  <ul>
                    <li className={styles.liItem}>{productListUpdated[0].ULbeneficii[1]}</li>
                    <li className={styles.liItem}>{productListUpdated[0].ULbeneficii[1]}</li>
                  </ul>
                </div>
                <div className={styles.priceWrapper}>
                  <div className={styles.productPrice}>{productListUpdated[ID].price + " LEI"}</div>
                </div>
                <div className={styles.actionContainer}>
                  <button onClick={addToCart_Handler} className={styles.addToCart}>
                    {"ADAUGĂ IN COȘ"}
                  </button>
                </div>
                {popProductInCart && <ProductAdded animFin={animEnded} id={ID} />}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div>
        {productListUpdated != null ? <Comments productID={ID} reviewsList={productListUpdated[ID].reviews} /> : ""}
      </div>

      <SuggestionArea productID={ID} />
    </>
  );
};

export default ProductView;
