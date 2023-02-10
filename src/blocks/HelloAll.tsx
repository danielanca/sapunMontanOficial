import React, { useEffect, useState } from "react";
import styles from "./HelloAll.module.scss";
import { HereInterface } from "../components/AdminArea/EditStrings/TableTypes";
import ElasticGallery from "./ElasticGallery";
import { getStringsList } from "../services/emails";
import stringify from "json-stable-stringify";
import { getType } from "../components/AdminArea/EditStrings/TableTypes";

const HelloAll = () => {
  const [theObject, setObject] = useState<HereInterface | null>(null);

  useEffect(() => {
    getStringsList("categoriesList").then((result: getType) => {
      setObject(JSON.parse(stringify(result.resultSent)));
      console.log("result is:", result);
    });

    setObject(theObject);
  }, []);

  return <MediaItems list={theObject} />;
};
interface MediaProps {
  list: HereInterface | null;
}
const MediaItems = ({ list }: MediaProps) => {
  let galleryInputList = list != null ? Object.values(list) : null;
  return (
    <div className={styles.helloDarker}>{galleryInputList && <ElasticGallery galleryList={galleryInputList} />}</div>
  );
};
export default HelloAll;
