import styles from "./ProductAdded.module.scss";
import images from "./../../data/images";
import productList from "../../data/productList";
import { NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";

interface ProductProps {
  id: number;
  animFin: () => void;
}
const ProductAdded = ({ id, animFin }: ProductProps) => {
  let data = Array.from(JSON.parse(sessionStorage.getItem("productsFetched")));
  let params = useParams();
  let ID = id;

  const animationFinished = () => {
    animFin();
  };
  return (
    <div onAnimationEnd={animationFinished} className={styles.cartCardboard}>
      <div className={styles.cartLogoStyle}>
        <img className={styles.cartIcon} src={images.cartLogo} />
      </div>
      <div className={styles.titleProduct}>{data[ID].title}</div>
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
