import { orderProps, ProductModel } from "./../utils/OrderInterfaces";
import { getCookie } from "../utils/functions";
import { ReviewsInterface } from "../utils/ReviewsTypes";
import { NewsProps } from "../utils/NewsletterInterface";

let destination: string = "";
// const destination = "http://localhost:5000/sapunmontan/us-central1";
if (process.env.NODE_ENV === "development") {
  destination = "http://localhost:5000/diniubire-89ce0/us-central1";
} else {
  destination = "https://us-central1-diniubire-89ce0.cloudfunctions.net";
}

export const requestOrdersList = async () => {
  return await fetch(`${destination}/requestOrders`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      someData: "someTest",
      authCookie: getCookie("jwt")
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendReviewToBack = async (reviewObj: ReviewsInterface) => {
  return await fetch(`${destination}/sendReviewToServer`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      name: reviewObj.name,
      starsNumber: reviewObj.starsNumber,
      reviewActual: reviewObj.reviewActual,
      email: reviewObj.email,
      reviewProductID: reviewObj.reviewProductID,
      mediaLink: reviewObj.mediaLink
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const sendOrderConfirmation = async (data: orderProps) => {
  return await fetch(`${destination}/sendEmail`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.emailAddress,
      city: data.city,
      county: data.county,
      phoneNo: data.phoneNo,
      paymentMethod: data.paymentMethod,
      deliveryName: data.deliveryName,
      deliveryAddress: data.deliveryAddress,
      orderNotes: data.orderNotes,
      cartSum: data.cartSum,
      shippingTax: data.shippingTax,
      cartProducts: data.cartProducts,
      paymentStatus: data.paymentStatus
    })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const requestLoginAccess = async (email: string, password: string) => {
  return await fetch(`${destination}/requestAuth`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ email: email, password: password })
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateProduct = async (productModel: ProductModel) => {
  return await fetch(`${destination}/updateProduct`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(productModel)
  })
    .then((res) => res)
    .catch((error) => error);
};
export const deleteProduct = async (productModel: ProductModel) => {
  console.log("Sending to database to DELETE :", productModel.ID);
  return await fetch(`${destination}/deleteProduct`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(productModel.ID)
  })
    .then((res) => res)
    .catch((error) => error);
};

export const addToNewsletter = async (subscriberData: NewsProps) => {
  return await fetch(`${destination}/subscribeToNewsletter`, {
    credentials: "include",
    method: "POST",
    mode: "cors",
    body: JSON.stringify(subscriberData)
  })
    .then((res) => res)
    .catch((error) => error);
};
