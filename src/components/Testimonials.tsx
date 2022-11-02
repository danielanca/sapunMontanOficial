import React from "react";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import HeadlineTitle from "./HeadlineTitle";
import testimonials from "./../data/testimonials.json";
import styles from "./../components/Testimonials.module.scss";
import strings from "../data/strings.json";

const Testimonials = () => {
  let testimonialsList = testimonials;
  let { testimonialsArea: testimonialStr } = strings;

  return (
    <>
      <HelmetHead title={testimonialStr.title} description={testimonialStr.descriptionIntroduction} />
      <HeadlineTitle title={testimonialStr.title} />

      <div className={styles.blockContainer}>
        {Object.values(testimonialsList).map((testimonial, index) => {
          return (
            <div
              className={(index % 2 === 0 ? "row " : "d-flex flex-row-reverse flex-wrap ") + styles.testimonialSection}
            >
              <div className={styles.colWrap}>
                <div className={styles.imageContainer}>
                  <img alt="client of the product" className={styles.testimonialPic} src={testimonial.media} />
                </div>
              </div>
              <div className={styles.commentCol}>
                <div className={styles.padderComment}>
                  <h3 className={styles.titleNameStart}>{testimonial.name}</h3>
                  <p className={styles.descriptionStart}>{testimonial.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Testimonials;
