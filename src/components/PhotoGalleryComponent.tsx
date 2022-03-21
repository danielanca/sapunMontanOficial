import { useEffect, useRef, useState } from 'react';

import images from '../data/images';

import styles from './../components/PhotoGalleryComponent.module.scss';

import strings from './../data/strings.json';

import { photoGallery } from '../data/arrays';

interface IProps {
  setShowPhoto: (showPhoto: boolean) => void;
}

const PhotoGalleryComponent: React.FC<IProps> = ({ setShowPhoto }) => {
  const ref = useRef();
  const [currentOpenPhoto, setCurrentOpenPhoto] = useState<string>('');
  const [showOpenPhoto, setShowOpenPhoto] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showOpenPhoto && ref.current && ref.current.contains(e.target)) {
        setShowOpenPhoto(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showOpenPhoto]);

  useEffect(() => {
    setCurrentOpenPhoto(photoGallery[currentIndex]);
  }, [currentIndex]);

  const previousPhotoHandler = () => {
    currentIndex !== 0 ? setCurrentIndex(currentIndex - 1) : setCurrentIndex(photoGallery.length - 1);
  };

  const nextPhotoHandler = () => {
    currentIndex !== photoGallery.length - 1 ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
  };

  const openPhotoHandler = (photo: string, index: number) => {
    setCurrentOpenPhoto(photo);
    setCurrentIndex(index);
    setShowOpenPhoto(true);
  };

  return (
    <>
      {showOpenPhoto && (
        <div className={styles.openPhotoContainer}>
          <img src={images.gallery.arrowLeft} className={styles.iconClick} onClick={previousPhotoHandler} />
          <img src={currentOpenPhoto} className={styles.openPhoto} ref={ref}/>
          <img src={images.gallery.arrowRight} className={styles.iconClick} onClick={nextPhotoHandler} />
        </div>
      )}
      <div className={styles.container}>
        <img className={styles.closeImage} src={images.booking.closeButton} onClick={() => setShowPhoto(false)} />
        <span className={styles.title}>{strings.photoGalleryComponent.title}</span>
        <div className={styles.photoListContainer}>
          {photoGallery.map((photo, index) => (
            <img
              className={styles.image}
              src={photo}
              key={index}
              onClick={() => openPhotoHandler(photo, index)}
            />
          ))}
        </div>
        <button className={styles.closeButton} onClick={() => setShowPhoto(false)}>
          <span className={styles.closeButtonText}>{strings.photoGalleryComponent.close}</span>
        </button>
      </div>
    </>
  );
};

export default PhotoGalleryComponent;
