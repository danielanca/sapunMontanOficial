import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../Comments";
import ProductPreview from "./ProductPreview";
import Loader from "../MiniComponents/Loader";
import SuggestionArea from "../SuggestedProducts/SuggestionArea";
import productList, { getProductWithID } from "../../data/productList";
import images from "../../data/images";
import styles from "./ProductView.module.scss";
import { ProductListType } from "./../../utils/OrderInterfaces";

interface CartProps {
  notifyMe: React.Dispatch<React.SetStateAction<number>>;
  productLink?: string;
}

const ProductView = ({ notifyMe, productLink }: CartProps) => {
  let params = useParams();
  var ID = params.productID !== undefined ? params.productID : "";

  const [productListUpdated, setProducts] = useState<ProductListType>();

  useEffect(() => {
    if (productListUpdated == null) {
      getProductWithID(ID).then((finalData) => {
        console.log("DATA RETRIEVING TEST:", finalData);
        setProducts(finalData);
      });
    }
  });

  const addCartHandler = () => {
    var storedCart: { id: string; itemNumber: string }[] = [];
    let expectedData = localStorage.getItem("cartData");
    if (expectedData === null) {
      storedCart.push({ id: ID, itemNumber: "1" });

      localStorage.setItem("cartData", JSON.stringify(storedCart));

      notifyMe(Math.floor(Math.random() * 100)); // not how it should be
      return;
    }
    var itemFound = false;
    storedCart = JSON.parse(expectedData);

    storedCart.map((item) => {
      if (item.id === ID.toString()) {
        item.itemNumber = (Number(item.itemNumber) + 1).toString();
        itemFound = true;
      }
    });
    if (!itemFound) {
      storedCart.push({ id: ID, itemNumber: "1" });
    }
    localStorage.setItem("cartData", JSON.stringify(storedCart));

    notifyMe(Math.floor(Math.random() * 100));
  };

  return (
    <>
      <div className={styles.padder}>
        {productListUpdated != null && productListUpdated.hasOwnProperty(ID) ? (
          <ProductPreview addCartHandler={addCartHandler} ID={ID} productListUpdated={productListUpdated} />
        ) : (
          <Loader />
        )}
      </div>
      <div>
        {typeof productListUpdated !== "undefined" && productListUpdated.hasOwnProperty(ID) ? (
          <Comments
            productData={JSON.stringify(productListUpdated)}
            productID={ID}
            reviewsList={productListUpdated[ID].reviews}
          />
        ) : typeof productListUpdated !== "undefined" && !productListUpdated.hasOwnProperty(ID) ? (
          <div className={styles.noProductFoundContainer}>
            <h2 className={styles.warningHeadline}>{"PRODUS INEXISTENT !"}</h2>
            <div className={styles.noProductWrapper}>
              <img src={images.noProduct} />
            </div>
            <h2 className={styles.warningHeadline}>{"Din pacate nu am gasit produsul"}</h2>
          </div>
        ) : (
          ""
        )}
      </div>
      {productListUpdated != null ? <SuggestionArea productID={ID} /> : ""}
    </>
  );
};

export default ProductView;

// <div className={styles.noProductFoundContainer}>
//             <h2 className={styles.warningHeadline}>{"PRODUS INEXISTENT !"}</h2>
//             <div className={styles.noProductWrapper}>
//               <img src={images.noProduct} />
//             </div>
//             <h2 className={styles.warningHeadline}>{"Din pacate nu am gasit produsul"}</h2>
//           </div>
