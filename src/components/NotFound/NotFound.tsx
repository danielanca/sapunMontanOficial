import styles from "./NotFound.module.scss";
import images from "./../../data/images";
const NotFound = () => {
  return (
    <div className={styles.NotFoundContainer}>
      <div className={styles.carbunelWrap}>
        <img className={styles.coalCartoon} src={images.coalCartoon} />
        <h1>{"Pagina nu există"}</h1>
        <h2>{"Din păcate Nelu Cărbunelu' nu gasește pagina, este posibil ca ea să nu mai existe!"}</h2>
        <button>{"Du-mă înapoi"}</button>
      </div>
    </div>
  );
};
export default NotFound;
