import GalleryComponent from '../components/GalleryComponent';
import TheSeparator from '../components/TheSeparator';
import HeaderMessage from '../components/HeaderMessage';

import styles from './GalleryCarousel.module.scss';
import strings from './../data/strings.json';

const GalleryCarousel = () => {
  return (
    <>
      <TheSeparator anchorID="gallery" />
      <div className={styles.blockContainer}>
        <div className={styles.innerContainer}>
          <HeaderMessage
            headTitle={strings.gallerySection.headerTitle}
            headDescription={strings.gallerySection.smallDescription}
          />
          <div className={styles.viewComponent}></div>
          <GalleryComponent />
        </div>
      </div>
    </>
  );
};

export default GalleryCarousel;
