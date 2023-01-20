import { useEffect, useState } from "react";
import { ProductsFromSessionStorage } from "../../data/constants";
import { getData } from "../../data/ProdFetch";

export const useProducts = () => {
  const [products, setProducts] = useState({});
  let productsFetched = sessionStorage.getItem(ProductsFromSessionStorage);

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
