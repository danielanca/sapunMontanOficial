import styles from './../blocks/FacilitiesBlock.module.scss';
import { facilities } from './../data/arrays';

const Facilities = () => {
  return (
    <div className={styles.container}>
      {facilities.map((facility) => (
        <div className={styles.blockContainer}>
          <img className={styles.image} src={facility.image} />
          <div className={styles.subText}>{facility.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Facilities;
