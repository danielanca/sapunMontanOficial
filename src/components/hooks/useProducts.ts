import { useEffect, useState } from "react";
import { getData } from "../../data/ProdFetch";

export const useProducts = () => {
  const [products, setProducts] = useState({});
  var productsFetched = sessionStorage.getItem("productsFetched");

  useEffect(() => {
    if (productsFetched != null) {
      setProducts(JSON.parse(productsFetched));
    } else {
      getData().then((finalData) => {
        setProducts(JSON.parse(JSON.stringify(finalData)));
      });
    }
  }, []);

  return products;
};

// export const useCorrectProduct = (productId) => {

// }

// const makeCheck = (sessionData: ProductSessionProps, cartData: ProductCookiesProps[]) => {
//   let namesNotFound: string[] = [];

//   cartData.forEach((item, index, object) => {
//     if (!sessionData.hasOwnProperty(item.id)) {
//       namesNotFound.push(item.id);
//     }
//   });

//   return cartData.filter((filterItem) => !namesNotFound.includes(filterItem.id));
// };
