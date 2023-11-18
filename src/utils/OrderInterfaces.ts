interface DayTime {
  day: number;
  month: number;
  year: number;
}
export interface CartProps {
  notifyMe: React.Dispatch<React.SetStateAction<number>>;
}
export interface LocalStorPropsCart {
  name: string;
  itemNumber: string;
  price: string;
  currency: string;
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
  deliveryMethod?: string;
  lockerName?: string;
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

export interface OrderViewProps {
  lastName?: string;
  firstName?: string;
  phoneNo?: string;
  deliveryAddress?: string;
  emailAddress?: string;
  city?: string;
  county?: string;
  paymentMethod?: string;
  cartProducts?: string;
  shippingTax?: number;
  cartSum?: number;
  orderNotes?: string;
  deliveryName?: string;
  timestamp?: string;
  invoiceID?: string;
}

export interface InvoiceModel {
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
}

export interface InvoiceItem {
  product: string;
  price: number;
  quantity: number;
}

export interface OrderViewProps {
  lastName?: string;
  firstName?: string;
  phoneNo?: string;
  deliveryAddress?: string;
  emailAddress?: string;
  city?: string;
  county?: string;
  paymentMethod?: string;
  cartProducts?: string;
  shippingTax?: number;
  cartSum?: number;
  orderNotes?: string;
  deliveryName?: string;
  timestamp?: string;
  invoiceID?: string;
}
export interface InvoiceOrderProps {
  invoiceObject: {
    lastName?: string;
    firstName?: string;
    phoneNo?: string;
    deliveryAddress?: string;
    emailAddress?: string;
    city?: string;
    county?: string;
    paymentMethod?: string;
    cartProducts?: string;
    shippingTax?: number;
    cartSum?: number;
    orderNotes?: string;
    deliveryName?: string;
    timestamp?: string;
    invoiceID?: string;
  };
}
