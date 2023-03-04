import React, { useEffect, useState } from "react";
import styles from "./HelloAll.module.scss";
import { HereInterface } from "../components/AdminArea/EditStrings/TableTypes";
import ElasticGallery from "./ElasticGallery";
import { getStringsList } from "../services/emails";
import stringify from "json-stable-stringify";

const HelloAll = () => {
  const [theObject, setObject] = useState<HereInterface | null>(null);

  useEffect(() => {
    const fetchFrontCategories = async () => {
      getStringsList("categoriesList")
        .then((result) => result)
        .then((answer) => {
          setObject(JSON.parse(stringify(answer.resultSent)));
          console.log("Answer is ", answer.resultSent);
        });
      // setObject(JSON.parse(stringify(fetchResult.resultSent)));
      // console.log("HelloAll message:", stringify(fetchResult.resultSent));
    };
    fetchFrontCategories();
  }, []);

  useEffect(() => {
    console.log("theObject:", theObject);
  }, [theObject]);

  return <MediaItems list={theObject} />;
};
interface MediaProps {
  list: HereInterface | null;
}
const MediaItems = ({ list }: MediaProps) => {
  console.log("Media Items:", list);
  return <div className={styles.helloDarker}>{<ElasticGallery galleryList={list} />}</div>;
};
export default HelloAll;
