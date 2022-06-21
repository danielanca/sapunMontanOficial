import parse from "html-react-parser";

import styles from "./../ConstantComponents/DescriptionStyles.module.scss";

interface ProductProps {
  productID: number;
  productDescription?: string;
}

const ProductDescription = ({ productDescription, productID }: ProductProps) => {
  var data = null;
  if (productDescription != null) {
    data = JSON.parse(productDescription);
    console.log("ProductDescription:", JSON.parse(productDescription));
  }

  return (
    <>
      <div className={styles.innerDescription}>{data != null && parse(data[productID].jsonContent)}</div>
    </>
  );
};

export default ProductDescription;
