import styles from "./SimpleContent.module.scss";

import parse from "html-react-parser";
import { staticContent } from "./../data/contentLegal";
import "./../data/customCSS.scss";
interface SimpleProps {
  type: string;
}

const SimpleContent = ({ type }: SimpleProps) => {
  const renderData = () => {
    return parse(staticContent[type].jsonContent);
  };

  return (
    <div className={styles.content}>
      <h3 className={styles.headTitle}>{staticContent[type].title}</h3>
      <div className={styles.plainData}>{renderData()}</div>
    </div>
  );
};

export default SimpleContent;
