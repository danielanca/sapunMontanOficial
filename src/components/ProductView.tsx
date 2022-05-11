import styles from "./../components/ProductView.module.scss";
import { getProductWithID } from "./../data/productList";
import reviewStar from "./../media/assets/pics/prezentareCarbune/star_review.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import ProductAdded from "./PopUps/ProductAdded";
import productList from "./../data/productList";
interface CartProps {
  notifyMe?: React.Dispatch<React.SetStateAction<number>>;
  productID: number;
}

const ProductView = ({ notifyMe }: CartProps) => {
  let data = Array.from(productList);
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

  useEffect(() => {
    if (productListUpdated != null) {
      console.log("YAYA:", productListUpdated[0].reviews);
    }
  }, [productListUpdated]);
  const onImageClicked = (event: number) => {
    setmainPicture(event);
  };
  const animEnded = () => {
    setpopProductInCart(false);
  };
  const addToCart_Handler = () => {
    setpopProductInCart(true);
    notifyMe(Number(ID));
    var storedCart = [];
    let expectedData = localStorage.getItem("cartData");
    if (expectedData === null) {
      console.log("Data not found");

      storedCart.push({ id: ID, itemNumber: "1" });

      localStorage.setItem("cartData", JSON.stringify(storedCart));
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
  };

  return (
    <>
      <div className={styles.padder}>
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
                  onClick={() => {
                    onImageClicked(0);
                  }}
                  className={styles.clickableImage}
                >
                  {productListUpdated != null ? (
                    <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[0]} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  onClick={() => {
                    onImageClicked(1);
                  }}
                  className={styles.clickableImage}
                >
                  {productListUpdated != null ? (
                    <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[1]} />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  onClick={() => {
                    onImageClicked(2);
                  }}
                  className={styles.clickableImage}
                >
                  {productListUpdated != null ? (
                    <img className={styles.innerImage} src={productListUpdated[ID].imageProduct[2]} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={"col-md-6  " + styles.rightSection}>
            <div className={styles.rightContainer}>
              <h3 className={styles.productTitle}>
                {productListUpdated != null ? productListUpdated[ID].title : "..."}
              </h3>
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
              <div className={styles.shortDescription}>
                {productListUpdated != null ? productListUpdated[0].shortDescription : ""}
              </div>
              <div className={styles.longDescription}>
                {productListUpdated != null ? productListUpdated[0].firstDescription : ""}

                <ul>
                  <li className={styles.liItem}>
                    {productListUpdated != null ? productListUpdated[0].ULbeneficii[1] : ""}
                  </li>
                  <li className={styles.liItem}>
                    {productListUpdated != null ? productListUpdated[0].ULbeneficii[1] : ""}
                  </li>
                </ul>
              </div>
              <div className={styles.priceWrapper}>
                <div className={styles.productPrice}>
                  {productListUpdated != null ? productListUpdated[ID].price + " LEI " : "Loading"}
                </div>
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
      </div>
      <div>
        {productListUpdated != null ? <Comments productID={ID} reviewsList={productListUpdated[ID].reviews} /> : ""}
      </div>
    </>
  );
};

export default ProductView;
