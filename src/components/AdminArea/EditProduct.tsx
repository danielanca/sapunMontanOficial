import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPreview from "../Product/ProductPreview";
import { ProductListType, ProductModel } from "./../../utils/OrderInterfaces";
import { getProductWithID } from "../../data/productList";
import { updateProduct } from "./../../services/emails";
import styles from "./EditProduct.module.scss";
interface EditProduct {
  editMode: boolean;
}
const EditProduct = ({ editMode }: EditProduct) => {
  const [openPreviewArea, setOpenPreviewArea] = useState<boolean>(false);
  let params = useParams();
  var ID = params.productID !== undefined ? params.productID : "";
  const [productListUpdated, setProducts] = useState<ProductListType[]>();

  const [editSent, setEditSent] = useState<boolean>(false);
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

  const separatorHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    if (name === "imageProduct" || name === "ULbeneficii") {
      setEditProductModel((editproductModel) => ({
        ...editproductModel,
        [name]: value.split(",")
      }));
    }
  };

  const submitEditOperation = () => {
    setEditSent(true);
    if (editproductModel.title !== "") {
      updateProduct(editproductModel).then((response) => {
        console.log("EDIT process sent to Cloud!");
      });
    }
  };
  const previewOperation = () => {
    setOpenPreviewArea(true);
  };
  useEffect(() => {
    if (editSent) {
      const timer = setTimeout(() => {
        setEditSent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [editSent]);

  const cancelOperation = () => {
    window.location.href = "/admin/products";
  };
  useEffect(() => {
    if (editMode) {
      if (productListUpdated === null) {
        getProductWithID(ID).then((finalData) => {
          setProducts(finalData);
        });
      }
    }
  });
  useEffect(() => {
    if (productListUpdated != null && editMode) {
      setEditProductModel(productListUpdated[ID]);
    }
  }, [productListUpdated]);

  return (
    <div>
      <div className={styles.editPage}>
        {productListUpdated !== null || !editMode ? (
          <div className={styles.addAreaContainer}>
            <h2>{`${editMode ? "EDIT" : "ADD"} PRODUCT`}</h2>

            <div className={styles.inputContainer}>
              <div className={styles.imageContainer}>
                <label htmlFor="imageProduct">{"Images"}</label>
                <p>{"Linkurile spre imagini trebuie separate de virgula"}</p>
                <textarea
                  className={styles.imageTextArea}
                  onChange={separatorHandler}
                  name="imageProduct"
                  value={editproductModel.imageProduct}
                />
              </div>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.rowSpacer}>
                <div className={styles.inputFielder}>
                  <label htmlFor="title">{"Product name"}</label>
                  <input onChange={inputHandler} name="title" value={editproductModel.title} />
                </div>
                <div className={styles.inputFielder}>
                  <label htmlFor="ID">{"Link ID Name:"}</label>
                  <input onChange={inputHandler} name="ID" value={editproductModel.ID} />
                </div>
                <div className={styles.inputFielder}>
                  <label htmlFor="price">{"Price (RON)"}</label>
                  <input onChange={inputHandler} name="price" value={editproductModel.price} />
                </div>
              </div>
              <div className={styles.rowSpacerTextArea}>
                <div className={styles.inputFielderTextArea}>
                  <label htmlFor="shortDescription">{"short Description"}</label>
                  <textarea onChange={inputHandler} name="shortDescription" value={editproductModel.shortDescription} />
                </div>
                <div className={styles.inputFielderTextArea}>
                  <label htmlFor="firstDescription">{"first Description"}</label>
                  <textarea onChange={inputHandler} name="firstDescription" value={editproductModel.firstDescription} />
                </div>
              </div>

              <div className={styles.editorElement}>
                <label htmlFor="jsonContent">{"Full description HTML"}</label>
                <textarea onChange={inputHandler} name="jsonContent" value={editproductModel.jsonContent} />
              </div>

              <div className={styles.actionControl}>
                <button className={styles.saveButton} onClick={submitEditOperation}>
                  {"SAVE"}
                </button>
                <button onClick={previewOperation} className={styles.previewButton}>
                  {"PREVIEW"}
                </button>
                <button onClick={cancelOperation} className={styles.cancelButton}>
                  {"CANCEL"}
                </button>
              </div>
              <div className={styles.dialogSpace}>
                {editSent && <p className={styles.confirmationSaveText}>{"Modificarile au avut loc!"}</p>}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {openPreviewArea && <ProductPreview ID={ID} productListUpdated={{ [ID]: editproductModel }} />}
    </div>
  );
};

export default EditProduct;
