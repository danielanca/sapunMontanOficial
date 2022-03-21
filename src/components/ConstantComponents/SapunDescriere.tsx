import styles from './../ConstantComponents/DescriptionStyles.module.scss';
import sapun from './../../media/assets/pics/prezentareCarbune/carbuneImagine.jpg';
import coconut_oil from './../../media/assets/pics/prezentareCarbune/coconut_oil.jpg';

const SapunDescriere = () => {
  return (
    <>
      <div className={styles.innerDescription}>
        <h3 className={styles.centerText}>{'Sapun cu Carbune'}</h3>
        <div>
          <p className={styles.text}>
            Secretul săpunului negru <span className={styles.bold}>MONTAN</span> constă în raportul corect de ingrediente, care
            curăță delicat (ulei de măsline) și hidratează (ulei de nucă de cocos) și absorb impuritățile, precum și mirosurile
            neplăcute (cărbune activ). Ingredientele sunt utilizate intenționat pentru a obține rezultate mai bune. Ingredientele
            cheie sunt:'
          </p>
          <div className={styles.padder}>
            <img className={styles.imagePic} src={sapun} />
          </div>
          <p className={styles.text}>
            Secretul săpunului negru <span className={styles.bold}>MONTAN</span> constă în raportul corect de ingrediente, care
            curăță delicat (ulei de măsline) și hidratează (ulei de nucă de cocos) și absorb impuritățile, precum și mirosurile
            neplăcute (cărbune activ). Ingredientele sunt utilizate intenționat pentru a obține rezultate mai bune. Ingredientele
            cheie sunt:'
          </p>
          <div className={styles.padder}>
            <img className={styles.imagePic} src={coconut_oil} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SapunDescriere;
