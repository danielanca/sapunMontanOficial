import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { firestore } from "firebase-admin";
import { ProductModel } from "../types/productTypes";

export const updateProduct = functions.https.onRequest((request, response) => {
  let requestParam = JSON.parse(request.body);
  console.log("updateProduct:", requestParam);

  createNewProduct(requestParam);
});

export const deleteProduct = functions.https.onRequest((request, response) => {
  let requestParam = JSON.parse(request.body);
  console.log("deleteProduct:", requestParam);
  functions.logger.info("deleteProduct is SAYING: ", requestParam);

  deleteProductByID(requestParam);
});

const createNewProduct = async (modelID: ProductModel) => {
  console.log("create new product received:", JSON.stringify(modelID));
  await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .update({
      [modelID.ID]: {
        ID: modelID.ID,
        title: modelID.title,
        shortDescription: modelID.shortDescription,
        price: modelID.price,
        firstDescription: modelID.firstDescription,
        reviews: {},
        // reviews: {
        //   0: {
        //     reviewActual: "Sunt ok produsele, un pic cam scump",
        //     starsNumber: "3",
        //     name: "Lips Mihai",
        //     date: "19.02.2020",
        //     reviewProductID: "0"
        //   }
        // },

        jsonContent: modelID.jsonContent,

        imageProduct: modelID.imageProduct,
        ULbeneficii: modelID.ULbeneficii
      }
    })
    .then((result) => functions.logger.info("sendReviewToServer response: ", result));
};

const deleteProductByID = async (modelID: string) => {
  console.log("PREPARE FOR DELETE:", JSON.stringify(modelID));
  await admin
    .firestore()
    .collection("products")
    .doc("activeProds")
    .update({
      [modelID]: firestore.FieldValue.delete()
    })
    .then((result) => functions.logger.info("sendReviewToServer response: ", result));
};
