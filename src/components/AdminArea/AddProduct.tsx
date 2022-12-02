import React, { useState } from "react";
import { updateProduct } from "./../../services/emails";
import { ProductModel } from "./../../utils/OrderInterfaces";

import styles from "./AddProduct.module.scss";

const AddProduct = () => {
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
  const submitAddOperation = () => {
    if (editproductModel.title != "") {
      updateProduct(editproductModel).then((response) => {
        console.log("Product addition request sent to Cloud!");
        //needs to process the response
      });
    }
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
  const cancelOperation = () => {
    console.log("Operation cancelled");
  };

  return (
    <div className={styles.addAreaContainer}>
      <h2>{"ADD PRODUCT"}</h2>
      <div className={styles.inputContainer}>
        <div className={"d-flex flex-column"}>
          <label htmlFor="title">{"Product name"}</label>
          <input onChange={inputHandler} name="title" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="ID">{"Link ID Name:"}</label>
          <input onChange={inputHandler} name="ID" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="price">{"Price (RON)"}</label>
          <input onChange={inputHandler} name="price" />
        </div>

        <div className={"d-flex flex-column"}>
          <label htmlFor="shortDescription">{"short Description"}</label>
          <input onChange={inputHandler} name="shortDescription" />
        </div>
        <div className={"d-flex flex-column"}>
          <label htmlFor="firstDescription">{"first Description"}</label>
          <input onChange={inputHandler} name="firstDescription" />
        </div>
        {/* <div className={"d-flex flex-column"}>
          <label htmlFor="ULbeneficii">{"Key advantages"}</label>
          <input onChange={separatorHandler} name="ULbeneficii" />
        </div> */}
        <div className={"d-flex flex-column"}>
          <label htmlFor="imageProduct">{"Images"}</label>
          <input onChange={separatorHandler} name="imageProduct" />
        </div>

        <div className={"d-flex flex-column"}>
          <label htmlFor="jsonContent">{"Full description HTML"}</label>
          <textarea spellCheck="false" onChange={inputHandler} name="jsonContent"></textarea>
        </div>

        <div className={styles.actionControl}>
          <button onClick={submitAddOperation}>{"SAVE"}</button>
          <button onClick={cancelOperation} className={styles.cancelButton}>
            {"CANCEL"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
