import React from "react";

import styles from "./../components/Testimonials.module.scss";
import testimonial1 from "./../media/assets/pics/prezentareCarbune/Dovada2.jpg";

import HeadlineTitle from "./HeadlineTitle";
const Testimonials = () => {
  return (
    <>
      <HeadlineTitle title={"TESTIMONIALE"} />

      <div className={styles.blockContainer}>
        <div className={"row " + styles.testimonialSection}>
          <div className="col-sm-6 d-flex justify-content-center align-items-center ">
            <div className={styles.imageContainer}>
              <img alt="picture" className={styles.testimonialPic} src={testimonial1} />
            </div>
          </div>
          <div className="col-sm-6 d-flex flex-column justify-content-center ">
            <div className={styles.padderComment}>
              <h3 className={styles.titleNameStart}>{"Daniel Anca"}</h3>
              <p className={styles.descriptionStart}>
                {
                  '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"'
                }
              </p>
            </div>
          </div>
        </div>

        <div className={"row d-flex flex-row-reverse " + styles.testimonialSection}>
          <div className="col-sm-6 d-flex justify-content-center align-items-center ">
            <div className={styles.imageContainer}>
              <img className={styles.testimonialPic} src={testimonial1} />
            </div>
          </div>
          <div className="col-sm-6 d-flex flex-column justify-content-center ">
            <div className={styles.padderComment}>
              <h3 className={styles.titleNameStart}>{"Daniel Anca"}</h3>
              <p className={styles.descriptionStart}>
                {
                  '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing"'
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
