import styles from "./ProductAdded.module.scss";
import images from "./../../data/images";
import { NavHashLink } from "react-router-hash-link";

interface ProductProps {
  id: string;
  animFin: () => void;
}
const ProductAdded = ({ id, animFin }: ProductProps) => {
  let sessionData = sessionStorage.getItem("productsFetched");

  let data = sessionData != null ? JSON.parse(sessionData) : null;

  console.log("Product added", data[id].title);
  const animationFinished = () => {
    animFin();
  };
  return (
    <div onAnimationEnd={animationFinished} className={styles.cartCardboard}>
      <div className={styles.cartLogoStyle}>
        <img className={styles.cartIcon} src={images.cartLogo} />
      </div>
      <div className={styles.titleProduct}>{data != null ? data[id].title : ""}</div>
      <div className={styles.confirmMessage}>
        <p className={styles.confirmMessage}>{"A fost adaugat cu succes in cosul tau de cumparaturi!"}</p>
      </div>
      <div className={styles.actionCallOut}>
        <NavHashLink className={styles.hashTransparent} to="/cosulmeu">
          <button className={styles.chillButton}>{"Vezi cosul"}</button>
        </NavHashLink>

        <NavHashLink className={styles.hashTransparent} to="/finalizare-comanda">
          <button className={styles.takeActionButton}>{"Finalizează comanda"}</button>
        </NavHashLink>
      </div>
    </div>
  );
};

export default ProductAdded;
