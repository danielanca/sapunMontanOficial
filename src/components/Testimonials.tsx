import MontanLanding from './MontanLanding';

import styles from './../components/Testimonials.module.scss';
import testimonial1 from './../media/assets/pics/prezentareCarbune/Dovada2.jpg';

import HeadlineTitle from './HeadlineTitle';
const Testimonials = () => {
  return (
    <>
      <HeadlineTitle title={'TESTIMONIALE'} />

      <div className={styles.blockContainer}>
        <div className={'row ' + styles.testimonialSection}>
          <div className="col-sm-6 d-flex justify-content-center align-items-center ">
            <div className={styles.imageContainer}>
              <img className={styles.testimonialPic} src={testimonial1} />
            </div>
          </div>
          <div className="col-sm-6 d-flex flex-column justify-content-center ">
            <div className={styles.padderComment}>
              <h3 className={styles.titleNameStart}>{'Daniel Anca'}</h3>
              <p className={styles.descriptionStart}>
                {
                  '"Am avut probleme mari cu cosurile, dar multumita lui Emilut din Germania am scapat de cosuri Dupa aproximativ 2 luni cosurile mele au disparut"'
                }
              </p>
            </div>
          </div>
        </div>

        <div className={'row d-flex flex-row-reverse ' + styles.testimonialSection}>
          <div className="col-sm-6 d-flex justify-content-center align-items-center ">
            <div className={styles.imageContainer}>
              <img className={styles.testimonialPic} src={testimonial1} />
            </div>
          </div>
          <div className="col-sm-6 d-flex flex-column justify-content-center ">
            <div className={styles.padderComment}>
              <h3 className={styles.titleNameStart}>{'Daniel Anca'}</h3>
              <p className={styles.descriptionStart}>
                {
                  '"Am avut probleme mari cu cosurile, dar multumita lui Emilut din Germania am scapat de cosuri Dupa aproximativ 2 luni cosurile mele au disparut"'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
