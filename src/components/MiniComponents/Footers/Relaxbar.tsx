import styles from "./Relaxbar.module.scss";
import images from "../../../data/images";
import strings from "../../../data/strings.json";

const Relaxbar = () => {
  return (
    <div className={styles.relaxSpace}>
      <div className={styles.cardobard}>
        <h3>{"Hai sa tinem legatura 😊"}</h3>
        <div className={styles.socialsTop}>
          {Object.values(strings.socialsInfo.socialLinks).map((item) => (
            <a href={item.link}>
              <img className={styles.iconStyle} src={images.socialIcons[item.image]} />
            </a>
          ))}
        </div>
        <div className={styles.inquiries}>
          <p>{"Hai sa colaboram impreuna!"}</p>
          <a>
            <p>{"Program Afiliere"}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Relaxbar;
