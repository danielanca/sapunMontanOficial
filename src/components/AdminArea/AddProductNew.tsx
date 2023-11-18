import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductPreview from "../Product/ProductPreview";
import { ProductModel, authorInitialProduct } from "./../../utils/OrderInterfaces";
import { getProductWithID } from "../../data/productList";
import { addProduct } from "./../../services/emails";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../AdminArea/ShardsDesign/components/common/PageTitle";
import styles from "./EditProduct.module.scss";

const EditProduct = () => {
  const [openPreviewArea, setOpenPreviewArea] = useState<boolean>(false);
  const [productListUpdated, setProducts] = useState<any>();
  const [editSent, setEditSent] = useState<boolean>(false);
  const [editproductModel, setEditProductModel] = useState<ProductModel>(authorInitialProduct);

  const navigate = useNavigate();

  console.log("EDIT PRODUCTS PARAM:", useParams());
  let params = useParams();
  let ID: any = params.id !== undefined ? params.id : "";

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type } = data.target;

    let dataValues = value;

    setEditProductModel((prevFormData) => {
      if (type === "checkbox" && "checked" in data.target) {
        dataValues = data.target.checked ? "true" : "false";
      }
      return { ...prevFormData, [name]: dataValues };
    });
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

  const submitAddOperation = () => {
    if (editproductModel.title != "") {
      addProduct(editproductModel).then((response) => {
        console.log("Product addition request sent to Cloud!");
        //needs to process the response
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
    navigate("/admin/manage-product");
  };

  useEffect(() => {
    async function fetchProductData() {
      try {
        if (productListUpdated == null) {
          const finalData = await getProductWithID(ID);
          setProducts(finalData);
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    }

    fetchProductData();
  }, [ID, productListUpdated]);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Product List" subtitle={"Add Product"} className="text-sm-left" />
      </Row>
      <Row>
        <Col>
          <div className={styles.editPage}>
            <div className={styles.addAreaContainer}>
              <h3>Add Product</h3>
              <div className={styles.inputContainer}>
                <div className={styles.imageContainer}>
                  <label htmlFor="imageProduct">{"Images"}</label>
                  <p>{"Linkurile spre imagini trebuie separate de virgula"}</p>
                  <textarea
                    spellCheck="false"
                    className={styles.imageTextArea}
                    onChange={separatorHandler}
                    name="imageProduct"
                  />
                </div>
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.rowSpacer}>
                  <div className={styles.inputFielder}>
                    <label htmlFor="title">{"Product name"}</label>
                    <input onChange={inputHandler} name="title" />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="ID">{"Link ID Name:"}</label>
                    <input onChange={inputHandler} name="ID" />
                  </div>
                  <div className={styles.inputFielder}>
                    <label htmlFor="price">{"Price (RON)"}</label>
                    <input onChange={inputHandler} name="price" />
                  </div>
                </div>
                <div className={styles.rowSpacerTextArea}>
                  <div className={styles.inputFielderTextArea}>
                    <label htmlFor="shortDescription">{"short Description"}</label>
                    <textarea spellCheck="false" onChange={inputHandler} name="shortDescription" />
                  </div>
                  <div className={styles.inputFielderTextArea}>
                    <label htmlFor="firstDescription">{"first Description"}</label>
                    <textarea spellCheck="false" onChange={inputHandler} name="firstDescription" />
                  </div>
                </div>

                <div className={styles.editorElement}>
                  <label htmlFor="jsonContent">{"Full description HTML"}</label>
                  <textarea spellCheck="false" onChange={inputHandler} name="jsonContent" />
                </div>

                <div className={styles.actionControl}>
                  <button className={styles.saveButton} onClick={submitAddOperation}>
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
          </div>
        </Col>
      </Row>
      {openPreviewArea && <ProductPreview ID={ID} productListUpdated={{ [ID]: editproductModel }} />}
    </Container>
  );
};

export default EditProduct;
