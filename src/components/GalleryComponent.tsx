import { useState } from 'react';

import Carousel from './Carousel';

import styles from './GalleryComponent.module.scss';

import images from './../data/images';

import strings from './../data/strings.json';
import PhotoGalleryComponent from './PhotoGalleryComponent';

const GalleryComponent = () => {
  const [galleryIndex, setGalleryIndex] = useState<number>(1);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  let limitLoop = 7;

  const internNotifyHandler = (value: number) => {
    if (galleryIndex + value >= limitLoop || galleryIndex + value === 0) return;

    setGalleryIndex(galleryIndex + value);
  };
  const clickHandler = (eventer: string) => {
    switch (eventer) {
      case 'EVENT_RIGHTCLICK':
        internNotifyHandler(1);
        break;
      case 'EVENT_LEFTCLICK':
        internNotifyHandler(-1);
        break;
    }
  };

  return (
    <>
    {showPhoto && (
      <div className={styles.photosComponent} >
          <PhotoGalleryComponent setShowPhoto={setShowPhoto}/>
      </div>
    )}
    <div className="row">
      <div className={styles.carouselSection}>
        <div className={styles.innerSection}>
          <div className={styles.buttonComponentEnd}>
            <img
              onClick={() => {
                clickHandler('EVENT_LEFTCLICK');
              }}
              className={styles.iconClick}
              src={images.gallery.arrowLeft}
            />
          </div>
        </div>
        <div className={styles.carouselCompo}>
          <Carousel galleryIndexIn={galleryIndex} onIndexNotification={internNotifyHandler} />
        </div>
        <div className={styles.outerAction}>
          <div className={styles.buttonComponentStart}>
            <img
              onClick={() => {
                clickHandler('EVENT_RIGHTCLICK');
              }}
              className={styles.iconClick}
              src={images.gallery.arrowRight}
            />
          </div>
        </div>
      </div>
      <div className={styles.viewAllContainer}>
        <button className={styles.viewAllButton} onClick={() => setShowPhoto(true)}>
          {strings.gallerySection.viewAll}
        </button>
      </div>
    </div>
    </>
  );
};

export default GalleryComponent;
