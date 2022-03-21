import styles from './HeaderMessage.module.scss';

interface welcomeParam {
  headTitle: string;
  headDescription: string;
}
const HeaderMessage = ({ headTitle, headDescription }: welcomeParam) => {
  return (
    <>
      <span className={styles.frontWelcome}>{headDescription}</span>
      <h2 className={styles.welcomeHead}>{headTitle}</h2>
    </>
  );
};

export default HeaderMessage;
