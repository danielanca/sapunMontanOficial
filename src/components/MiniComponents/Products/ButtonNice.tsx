import styles from "./ButtonNice.module.scss";

interface ButtonNiceProps {
  title: string;
  urlSufix: string;
}

const ButtonNice = ({ title, urlSufix }: ButtonNiceProps) => {
  return (
    <a className={styles.buttonStyle} href={"https://montanair.ro/" + urlSufix}>
      <button>{title}</button>
    </a>
  );
};

export default ButtonNice;