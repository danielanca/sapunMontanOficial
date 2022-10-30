interface DayTime {
  day: number;
  month: number;
  year: number;
}
export interface CartProps {
  notifyMe: React.Dispatch<React.SetStateAction<number>>;
}
export interface orderProps {
  firstName: string;
  lastName: string;
  deliveryAddress: string;
  city: string;
  county: string;
  phoneNo: string;
  emailAddress?: string;
  orderNotes?: string;
  cartProducts: string;
  cartSum?: number;
  shippingTax?: number;
  paymentMethod: string;
  deliveryName?: string;
  paymentStatus?: string;
}

export interface ProductModel {
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
export interface ProdItemProps {
  productObject: ProductListType;
  size?: string;
}
export interface ProductListType {
  [key: string]: {
    ID: string;
    title: string;
    firstDescription: string;
    shortDescription: string;
    imageProduct: string[];
    jsonContent: string;
    price: string;
    reviews: {};
    ULbeneficii: [];
  };
}
export interface productObject {
  ID: string;
  title: string;
  firstDescription: string;
  shortDescription: string;
  imageProduct: string[];
  jsonContent: string;
  price: string;
  reviews: {};
  ULbeneficii: [];
}

export interface ProductTypes {
  productListUpdated?: ProductListType;
  ID: string;
  addCartHandler?: () => void;
}
