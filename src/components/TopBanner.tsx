import React from "react";
import styles from "./../components/TopBanner.module.scss";
import images from "../data/images";
import parse from "html-react-parser";
import { websiteContact, TopBannerPromotional } from "../data/componentStrings";

const TopBanner = () => {
  return (
    <div className={styles.bigBlanaBanner}>
      <div className={styles.emailTop}>{websiteContact.email}</div>
      <div className="col-md-6 ">
        <p className={styles.headTitle}>{parse(TopBannerPromotional.text)}</p>
      </div>
      <div className={styles.socialsTop}>
        <div className={styles.iconWrapper}>
          <a href={websiteContact.socials.instagram}>
            <img alt="social diniubire" className={styles.iconStyle} src={images.socialIcons.facebook} />
          </a>
          <a href={websiteContact.socials.facebook}>
            <img alt="social diniubire " className={styles.iconStyle} src={images.socialIcons.instagram} />
          </a>
          <a href={websiteContact.socials.whatsapp}>
            <img alt="social diniubire" className={styles.iconStyle} src={images.socialIcons.whatsapp} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
