import { useState, useEffect } from "react";
import styles from "./UpdateProducts.module.scss";
import { getData } from "../../data/productList";
import ShowProduct from "./ShowProduct";

interface productInterface {
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
const UpdateProducts = () => {
  const [productsOnline, setProductsOnline] = useState<any>();

  useEffect(() => {
    if (productsOnline == null) {
      getData().then((finalData) => {
        console.log("ProductsOnline: ", finalData);
        setProductsOnline(finalData);
        // Object.values(finalData).map((item: any) => {
        //   console.log(item);
        // });
      });
    }
  }, [productsOnline]);

  return (
    <div className={styles.productPanel}>
      <h3>{"Product List"}</h3>
      <table className={styles.tableStyle}>
        <tr>
          <th>Preview</th>
          <th>Title</th>
          <th>Action</th>
        </tr>

        {productsOnline != null ? Object.values(productsOnline).map((item) => <ShowProduct productName={item} />) : ""}
      </table>
    </div>
  );
};

export default UpdateProducts;
