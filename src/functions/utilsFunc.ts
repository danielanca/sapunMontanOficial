interface ProductSessionProps {
  [key: string]: {
    ID: string;
    ULBeneficii: string[];
    firstDescription: string;
    imageProduct: string[];
    jsonContent: string;
    price: string;
    reviews: {};
    shortDescription: string;
    title: string;
  };
}
interface ProductCookiesProps {
  id: string;
  itemNumber: string;
}

export const makeCheck = (sessionData: ProductSessionProps, cartData: ProductCookiesProps[]) => {
  let namesNotFound: string[] = [];

  cartData.forEach((item, index, object) => {
    if (!sessionData.hasOwnProperty(item.id)) {
      namesNotFound.push(item.id);
    }
  });

  return cartData.filter((filterItem) => !namesNotFound.includes(filterItem.id));
};
