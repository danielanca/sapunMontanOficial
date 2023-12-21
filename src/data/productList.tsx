import { collection, doc, getFirestore, getDoc, getDocs } from "firebase/firestore";
import app from "./../firebase";
import { devConsole } from "./../functions/utilsFunc";
let productList = [];

const db = getFirestore(app);

interface InvoiceModel {
  client: {
    fullName: string;
    CUI: string;
    banca: string;
    adresa: string;
    email: string;
    telefon: string;
  };
  provider: {
    fullName: string;
    adresa: string;
    telefon: string;
  };
  items: InvoiceItem[];
  ID: string;
}
interface InvoiceItem {
  product: string;
  price: number;
  quantity: number;
}

interface productType {
  ID: string;
  ULbeneficii: [];
  firstDescription: string;
  imageProduct: [];
  jsonContent: string;
  price: string;
  reviews: {};
  shortDescription: string;
  title: string;
}
export const getOrderByID = async (invoiceID: number) => {
  const productData = doc(db, "orders", invoiceID.toString());
  const snap = await getDoc(productData);
  let productsAreHere;
  if (snap.exists()) {
    productsAreHere = snap.data();
  }

  return productsAreHere;
};
export const getAllOrders = async () => {
  const snapShot = await getDocs(collection(db, "orders"));
  let dataProducts = [];

  snapShot.forEach((doc) => {
    dataProducts.push(doc.data());
  });

  return dataProducts;
};
export const getData = async () => {
  const snapShot = await getDocs(collection(db, "products"));
  let dataProducts = {};

  snapShot.forEach((doc) => {
    Object.values(doc.data()).forEach((itemData: productType) => {
      dataProducts = {
        ...dataProducts,
        [itemData.ID]: {
          ID: itemData.ID,
          ULbeneficii: itemData.ULbeneficii,
          firstDescription: itemData.firstDescription,
          imageProduct: itemData.imageProduct,
          jsonContent: itemData.jsonContent,
          price: itemData.price,
          reviews: itemData.reviews,
          shortDescription: itemData.shortDescription,
          title: itemData.title
        }
      };
    });
  });
  return dataProducts;
};

export const getProductWithID = async (productID: string) => {
  //here productID might be ''
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  let productsAreHere;
  if (snap.exists()) {
    Object.values(snap.data()).map((item: productType) => {
      productsAreHere = {
        ...productsAreHere,
        [item.ID]: {
          ID: item.ID,
          ULbeneficii: item.ULbeneficii,
          firstDescription: item.firstDescription,
          imageProduct: item.imageProduct,
          jsonContent: item.jsonContent,
          price: item.price,
          reviews: item.reviews,
          shortDescription: item.shortDescription,
          title: item.title
        }
      };
    });
    // productsAreHere = Object.values(snap.data());
  }
  //Here we need to make the call for a specific ID, not for the whole collection of products.
  //but till then, we will do this way.
  console.log("getProductWithID will return :", productsAreHere);

  return productsAreHere;
};
const getallPr = async () => {
  const productData = doc(db, "products", "activeProds");
  const snap = await getDoc(productData);
  let productsAreHere: any[] = [];
  if (snap.exists()) {
    productsAreHere = Object.values(snap.data());
  }
  //Here we need to make the call for a specific ID, not for the whole collection of products.
  //but till then, we will do this way.

  return productsAreHere;
};
export const getInvoiceByID = async (ID: string) => {
  const invoiceData = doc(db, "invoice", "activeInvoice");
  const snapInvoice = await getDoc(invoiceData);
  var invoicesAreHere;
  if (snapInvoice.exists()) {
    Object.values(snapInvoice.data()).map(async (invoice: InvoiceModel) => {
      invoicesAreHere = {
        ...invoicesAreHere,
        [invoice.ID]: {
          ID: invoice.ID,
          clientName: invoice.client.fullName,
          clientCUI: invoice.client.CUI,
          clientBanca: invoice.client.banca,
          clientAdresa: invoice.client.adresa,
          clientTelefon: invoice.client.telefon,
          clientEmail: invoice.client.email,
          providerName: invoice.provider.fullName,
          providerAdresa: invoice.provider.adresa,
          providerTelefon: invoice.provider.telefon,
          items: invoice.items
        }
      };
    });
  }
  console.log("getInvoiceByID will return :", invoicesAreHere);

  return invoicesAreHere;
};
export const getObjectByID = (id: string): Promise<any> => {
  const documentRef = doc(db, "orders", id);

  return new Promise((resolve, reject) => {
    getDoc(documentRef)
      .then((documentSnapshot) => {
        if (documentSnapshot.exists()) {
          const objectData = documentSnapshot.data();
          console.log("Object data is:", objectData);
          // Process the object or perform any necessary transformations
          resolve(objectData);
        } else {
          // Handle the case when the document does not exist
          resolve(null);
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the retrieval process
        console.error("Error fetching object from Firebase:", error);
        reject(error);
      });
  });
};

// devConsole("Product is loading...");

getallPr().then((data) => {
  productList = data;
  console.log("Done");
});

export default productList;
