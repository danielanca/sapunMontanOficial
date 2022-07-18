import React from "react";
import styles from "./SimpleContent.module.scss";

import parse from "html-react-parser";
import Helmet from "react-helmet";
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
    <>
      <Helmet>
        <title>{staticContent[type].title}</title>
        <meta name="description" content={staticContent[type].jsonContent} />
      </Helmet>
      <div className={styles.content}>
        <h3 className={styles.headTitle}>{staticContent[type].title.substring(0, 100)}</h3>
        <div className={styles.plainData}>{renderData()}</div>
      </div>
    </>
  );
};

export default SimpleContent;
