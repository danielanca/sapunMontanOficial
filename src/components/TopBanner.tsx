import styles from "./../components/TopBanner.module.scss";
import images from "../data/images";

const TopBanner = () => {
  return (
    <div className={styles.bigBlanaBanner}>
      <div className={"col-md-3 " + styles.emailTop}>{"contact@sapun-montan.ro"}</div>
      <div className="col-md-6 ">
        <p className={styles.headTitle}>{"Transport Gratuit pentru comenzi peste 130 lei"}</p>
      </div>
      <div className={"col-md-3 " + styles.socialsTop}>
        <div className={styles.iconWrapper}>
          <a href="https://facebook.com/montanAir">
            <img className={styles.iconStyle} src={images.socialIcons.facebook} />
          </a>
          <a href="https://facebook.com/montanAir">
            <img className={styles.iconStyle} src={images.socialIcons.instagram} />
          </a>
          <a href="https://facebook.com/montanAir">
            <img className={styles.iconStyle} src={images.socialIcons.whatsapp} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
