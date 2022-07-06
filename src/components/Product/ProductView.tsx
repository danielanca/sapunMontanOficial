import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Comments from "../Comments";
import ProductPreview from "./ProductPreview";
import Loader from "../MiniComponents/Loader";
import SuggestionArea from "../SuggestedProducts/SuggestionArea";
import { getProductWithID } from "../../data/productList";
import styles from "./ProductView.module.scss";
import { ProductListType } from "./../../utils/OrderInterfaces";

interface CartProps {
  notifyMe: React.Dispatch<React.SetStateAction<number>>;
  productLink?: string;
}

const ProductView = ({ notifyMe, productLink }: CartProps) => {
  let params = useParams();
  var ID = params.productID != undefined ? params.productID : "";

  const [productListUpdated, setProducts] = useState<ProductListType>();

  useEffect(() => {
    if (productListUpdated == null) {
      getProductWithID(ID).then((finalData) => {
        setProducts(finalData);
      });
    }
  });
  useEffect(() => {
    console.log("ProductView is saying:", productListUpdated);
  }, [productListUpdated]);
  const addCartHandler = () => {
    var storedCart: { id: string; itemNumber: string }[] = [];
    let expectedData = localStorage.getItem("cartData");
    if (expectedData === null) {
      console.log("Data not found");

      storedCart.push({ id: ID, itemNumber: "1" });

      localStorage.setItem("cartData", JSON.stringify(storedCart));

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

    notifyMe(Math.floor(Math.random() * 100));
  };

  return (
    <>
      <div className={styles.padder}>
        {productListUpdated != null ? (
          <ProductPreview addCartHandler={addCartHandler} ID={ID} productListUpdated={productListUpdated} />
        ) : (
          <Loader />
        )}
      </div>
      <div>
        {productListUpdated != null ? (
          <Comments
            productData={JSON.stringify(productListUpdated)}
            productID={ID}
            reviewsList={productListUpdated[ID].reviews}
          />
        ) : (
          ""
        )}
      </div>
      {productListUpdated != null ? <SuggestionArea productID={ID} /> : ""}
    </>
  );
};

export default ProductView;
