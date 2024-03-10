import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductPreview from "../Product/ProductPreview";
import { ProductModel, authorInitialProduct } from "./../../utils/OrderInterfaces";
import { getProductWithID } from "../../data/productList";
import { updateProduct } from "./../../services/emails";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../AdminArea/ShardsDesign/components/common/PageTitle";
import styles from "./EditProduct.module.scss";

const EditProduct = () => {
  const [openPreviewArea, setOpenPreviewArea] = useState<boolean>(false);
  let params = useParams();
  let ID: any = params.id !== undefined ? params.id : "";
  const [productListUpdated, setProducts] = useState<ProductModel[]>();
  const [editSent, setEditSent] = useState<boolean>(false);
  const [editproductModel, setEditProductModel] = useState<ProductModel>(authorInitialProduct);

  const navigate = useNavigate();

  const inputHandler = (data: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = data.target;
    setEditProductModel((prevFormData) => {
      return { ...prevFormData, [name]: value };
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

  const submitEditOperation = () => {
    setEditSent(true);
    if (editproductModel.title !== "") {
      updateProduct(editproductModel).then((response) => {
        console.log("EDIT process sent to Cloud!");
      });
    }
    setEditProductModel(authorInitialProduct);
    // console.log(editproductModel);
  };
  const previewOperation = () => {
    setOpenPreviewArea((prevState) => !prevState);
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
    if (editMode) {
      if (productListUpdated === null) {
        getProductWithID(ID).then((finalData) => {
          setProducts(finalData);
        });
      }
    }
  });

  useEffect(() => {
    if (productListUpdated != null) {
      setEditProductModel(productListUpdated[ID]);
    }
  }, [productListUpdated]);

  return (
<<<<<<< HEAD
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Product List" subtitle={"Edit Product"} className="text-sm-left" />
      </Row>
      <Row>
        <Col>
          <div className={styles.editPage}>
            {productListUpdated != null ? (
              <div className={styles.addAreaContainer}>
                <h3>{"Edit Product"}</h3>
=======
    <div>
      <div className={styles.editPage}>
        {productListUpdated !== null || !editMode ? (
          <div className={styles.addAreaContainer}>
            <h2>{`${editMode ? "EDIT" : "ADD"} PRODUCT`}</h2>
>>>>>>> bead203216069c968e2fa6856143c35c58481989

                <div className={styles.inputContainer}>
                  <div className={styles.imageContainer}>
                    <label htmlFor="imageProduct">{"Images"}</label>
                    <p>{"Linkurile spre imagini trebuie separate de virgula"}</p>
                    <textarea
                      spellCheck="false"
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
                      <input
                        style={{ opacity: "0.6", pointerEvents: "none" }}
                        onChange={inputHandler}
                        name="ID"
                        value={editproductModel.ID}
                        readOnly
                      />
                    </div>
                    <div className={styles.inputFielder}>
                      <label htmlFor="price">{"Price (RON)"}</label>
                      <input onChange={inputHandler} name="price" value={editproductModel.price} />
                    </div>
                  </div>
                  <div className={styles.rowSpacerTextArea}>
                    <div className={styles.inputFielderTextArea}>
                      <label htmlFor="shortDescription">{"short Description"}</label>
                      <textarea
                        spellCheck="false"
                        onChange={inputHandler}
                        name="shortDescription"
                        value={editproductModel.shortDescription}
                      />
                    </div>
                    <div className={styles.inputFielderTextArea}>
                      <label htmlFor="firstDescription">{"first Description"}</label>
                      <textarea
                        spellCheck="false"
                        onChange={inputHandler}
                        name="firstDescription"
                        value={editproductModel.firstDescription}
                      />
                    </div>
                  </div>

                  <div className={styles.editorElement}>
                    <label htmlFor="jsonContent">{"Full description HTML"}</label>
                    <textarea
                      spellCheck="false"
                      onChange={inputHandler}
                      name="jsonContent"
                      value={editproductModel.jsonContent}
                    />
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
        </Col>
      </Row>
      {openPreviewArea && <ProductPreview ID={ID} productListUpdated={{ [ID]: editproductModel }} />}
      {/* {openPreviewArea && <p>Mubbasher OP</p>} */}
    </Container>
  );
};

export default EditProduct;
