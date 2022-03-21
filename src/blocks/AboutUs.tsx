import TheSeparator from '../components/TheSeparator';

import styles from './AboutUs.module.scss';

import strings from './../data/strings.json';

const AboutUs = () => {
  return (
    <>
      <TheSeparator />
      <div id={'aboutus'} className={styles.blockContainer}>
        <div className={styles.innerContainer}>
          <span className={styles.frontWelcome}>{strings.aboutUsSection.smallDescription}</span>
          <h2 className={styles.welcomeHead}>{strings.aboutUsSection.headerTitle}</h2>
          <div className={styles.exteriorGalleryContain}>
            <div className={styles.galleryContainer}>
              <div className={styles.contentImage}></div>
              <span className={styles.fullDescription}>{strings.aboutUsSection.aboutUsDescription}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
