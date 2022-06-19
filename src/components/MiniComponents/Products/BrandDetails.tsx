import parse from "html-react-parser";
import styles from "./BrandDetails.module.scss";
const BrandDetails = () => {
  return (
    <div className={styles.brandContainer}>
      <h3>{"MontanAir - Arta frumusetii tale"}</h3>
      <div className={styles.details}>
        <h4>
          {parse(
            "<b>MontanAir este o marcă romanească de cosmetice naturale </b>, realizate handmade și de înaltă calitate. Viziunea noastră constă în a crea produse cosmetice naturale, care să ajute la obținerea unei sănătăți bune, a unei frumuseți naturale și o încredere de neoprit, prin păstrarea planetei noastre frumoase. Toate produsele MontanAir conțin ingrediente alese cu grijă, ecologice și concentrate pe praful de cărbune activ, obținut din coji de nucă de cocos."
          )}
        </h4>
        <div className={styles.statsThree}>
          <div className={styles.item}>
            <h2>{"220.000+"}</h2>
            <h4>{"clienti fericiti"}</h4>
          </div>
          <div className={styles.item}>
            <h2>{"10"}</h2>
            <h4>{"Țări în care activăm"}</h4>
          </div>
          <div className={styles.item}>
            <h2>{"4"}</h2>
            <h4>{"Ani de MontanAir"}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetails;
