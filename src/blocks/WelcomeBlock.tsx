import ItemDescribe from '../components/ItemDescribe';
import TheSeparator from '../components/TheSeparator';
import HeaderMessage from '../components/HeaderMessage';

import styles from './../blocks/WelcomeBlock.module.scss';

import images from './../data/images';

import strings from './../data/strings.json';
interface paramsIn {
  title: string;
  longText: string;
}
interface paramsIn extends Array<paramsIn> {}

const WelcomeBlock = () => {
  return (
    <>
      <div className={styles.blockContainer}>
        <div className={styles.innerWrap}>
          <HeaderMessage
            headTitle={strings.welcomeSection.headerTitle}
            headDescription={strings.welcomeSection.smallDescription}
          />
          <div className={styles.descript}>
            <div className={styles.descriptionContainer}>
              <ItemDescribe data={strings.welcomeSection.descriptionList[0]} alignment={'text-end'} />
              <ItemDescribe data={strings.welcomeSection.descriptionList[1]} alignment={'text-end'} />
              <ItemDescribe data={strings.welcomeSection.descriptionList[2]} alignment={'text-end'} />
            </div>
            <div className={styles.middleContainer}>
              <img className={styles.middleimage} src={images.sapunCarbune} />
              <div className={styles.reviewContainerStars}>
                <img className={styles.starIcon} src={images.star} />
                <img className={styles.starIcon} src={images.star} />
                <img className={styles.starIcon} src={images.star} />
                <img className={styles.starIcon} src={images.star} />
                <img className={styles.starIcon} src={images.star} />
              </div>
              <div className={styles.middleTextMobile}>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[0].title}</span>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[1].title}</span>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[2].title}</span>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[3].title}</span>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[4].title}</span>
                <span className={styles.headTitleMobile}>{strings.welcomeSection.descriptionList[5].title}</span>
              </div>
            </div>
            <div className={styles.descriptionContainer}>
              <ItemDescribe data={strings.welcomeSection.descriptionList[3]} alignment={'text-start'} />
              <ItemDescribe data={strings.welcomeSection.descriptionList[4]} alignment={'text-start'} />
              <ItemDescribe data={strings.welcomeSection.descriptionList[5]} alignment={'text-start'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeBlock;
