import React from "react";

import { useMemo } from "react";
import { useCallback } from "react";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { getProductWithID } from "../../data/productList";
import { useEffect, useState } from "react";
import { updateProduct } from "./../../services/emails";
import { ProductModel } from "./../../utils/OrderInterfaces";
import styles from "./EditProduct.module.scss";

// interface productProps {
//   ID: string;
//   ULbeneficii: [];
//   firstDescription: string;
//   imageProduct: [];
//   jsonContent: string;
//   price: string;
//   reviews: {};
//   shortDescription: string;
//   title: string;
// }

const EditProduct = () => {
  const [editableTitle, seteditableTitle] = useState<boolean>(false);
  const [productModel, setProductModel] = useState<ProductModel>({
    ID: "",
    price: "",
    ULbeneficii: [],
    firstDescription: "",
    imageProduct: [],
    jsonContent: "",
    reviews: {},
    shortDescription: "",
    title: ""
  });

  const editTitle = () => {
    seteditableTitle(!editableTitle);
  };
  let params = useParams();
  var ID = params.productID != undefined ? params.productID : "";
  const [productListUpdated, setProducts] = useState<any[]>();
  const [editproductModel, setEditProductModel] = useState<ProductModel>({
    ID: "",
    price: "",
    ULbeneficii: [],
    firstDescription: "",
    imageProduct: [],
    jsonContent: "",
    reviews: {},
    shortDescription: "",
    title: ""
  });
  const inputHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    setEditProductModel((editproductModel) => ({
      ...editproductModel,
      [name]: value
    }));
  };

  const separatorHandler = (data: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = data.target;
    if (name === "imageProduct" || name === "ULbeneficii") {
      setEditProductModel((editproductModel) => ({
        ...editproductModel,
        [name]: value.split(",")
      }));
    }
  };

  const submitEditOperation = () => {
    if (editproductModel.title != "") {
      updateProduct(editproductModel).then((response) => {
        console.log("EDIT process sent to Cloud!");
      });
    }
  };

  const cancelOperation = () => {
    console.log("Operation cancelled");
  };
  useEffect(() => {
    if (productListUpdated == null) {
      getProductWithID(ID).then((finalData) => {
        setProducts(finalData);
      });
    }
  });
  useEffect(() => {
    if (productListUpdated != null) {
      setEditProductModel(productListUpdated[ID]);
    }
  }, [productListUpdated]);
  useEffect(() => {
    console.log("Edit productModel", editproductModel);
  }, [editproductModel]);

  return (
    <div>
      <div
        spellCheck={false}
        contentEditable={editableTitle ? true : false}
        className={editableTitle ? styles.editableContainer : styles.staticContainer}
      >
        {productListUpdated != null
          ? editableTitle
            ? productListUpdated[ID].jsonContent
            : parse(productListUpdated[ID].jsonContent)
          : ""}
      </div>
      {/* productListUpdated[ID].title */}
      <button onClick={editTitle}>{"Toggle Edit"}</button>
      <div className={styles.editPage}>
        {productListUpdated != null ? (
          <div className={styles.addAreaContainer}>
            <h2>{"EDIT PRODUCT"}</h2>
            <div className={styles.inputContainer}>
              <div className={"d-flex flex-column"}>
                <label htmlFor="title">{"Product name"}</label>
                <input onChange={inputHandler} name="title" value={editproductModel.title} />
              </div>
              <div className={"d-flex flex-column"}>
                <label htmlFor="ID">{"Link ID Name:"}</label>
                <input onChange={inputHandler} name="ID" value={editproductModel.ID} />
              </div>
              <div className={"d-flex flex-column"}>
                <label htmlFor="price">{"Price (RON)"}</label>
                <input onChange={inputHandler} name="price" value={editproductModel.price} />
              </div>

              <div className={"d-flex flex-column"}>
                <label htmlFor="shortDescription">{"short Description"}</label>
                <input onChange={inputHandler} name="shortDescription" value={editproductModel.shortDescription} />
              </div>
              <div className={"d-flex flex-column"}>
                <label htmlFor="firstDescription">{"first Description"}</label>
                <input onChange={inputHandler} name="firstDescription" value={editproductModel.firstDescription} />
              </div>
              {/* <div className={"d-flex flex-column"}>
                <label htmlFor="ULbeneficii">{"Key advantages"}</label>
                <input onChange={separatorHandler} name="ULbeneficii" value={editproductModel.ULbeneficii} />
              </div> */}
              <div className={"d-flex flex-column"}>
                <label htmlFor="imageProduct">{"Images"}</label>
                <input onChange={separatorHandler} name="imageProduct" value={editproductModel.imageProduct} />
              </div>

              <div className={"d-flex flex-column"}>
                <label htmlFor="jsonContent">{"Full description HTML"}</label>
                <textarea onChange={inputHandler} name="jsonContent" value={editproductModel.jsonContent} />
              </div>

              <div className={styles.actionControl}>
                <button onClick={submitEditOperation}>{"SAVE"}</button>
                <button onClick={cancelOperation} className={styles.cancelButton}>
                  {"CANCEL"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
// const CodeElement = (props: any) => {
//   return (
//     <pre className={styles.codeElementStyle} {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = (props: any) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };
export default EditProduct;
