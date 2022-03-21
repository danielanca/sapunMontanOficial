import { useState } from 'react';
import styles from './../components/Comments.module.scss';
import SapunDescriere from './ConstantComponents/SapunDescriere';
import ReviewField from './ReviewField';
const Comments = () => {
  const [tabButton, settabButton] = useState(1);

  const handleTab = (event: number) => {
    settabButton(event);
  };
  return (
    <>
      <h3 className={styles.title}>{'Detalii PRODUS'}</h3>
      <div className={styles.commentsArea}>
        <div className={styles.tabs}>
          <div
            onClick={() => {
              handleTab(0);
            }}
            className={tabButton === 0 ? `${styles.tabButton} ${styles.activeTab}` : `${styles.tabButton}`}
          >
            {'Descriere'}
          </div>
          <div
            className={tabButton === 1 ? `${styles.tabButton} ${styles.activeTab}` : `${styles.tabButton}`}
            onClick={() => {
              handleTab(1);
            }}
          >
            {'Recenzii'}
          </div>
        </div>
        <div className={styles.descriptionContainer}>{tabButton === 0 ? <SapunDescriere /> : <ReviewField />}</div>
      </div>
    </>
  );
};

export default Comments;
