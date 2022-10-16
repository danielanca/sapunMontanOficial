import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { blogs } from "../../data/blogStrings";
import styles from "./../../components/ConstantComponents/BlogItem.module.scss";
import strings from "../../data/strings.json";

interface BlogProps {
  data: string;
}
interface BlogItemsProps {
  title: string;
  firstDescription: string;
  jsonContent: string;
  link: string;
  image: string;
}

const BlogItem = ({ data }: BlogProps) => {
  let { blogsArea: blogStr } = strings;
  var blogData: BlogItemsProps = JSON.parse(data);
  console.log("BLOG ITEM:", blogData.link);
  console.log("BLOG image:", blogs.posts[blogData.link].image);

  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.blogItem}>
      <NavHashLink
        onClick={gotoElement}
        className={styles.HashLinkStyle}
        to={`/${blogStr.blogURLSuffix}/` + blogData.link}
      >
        <div className={styles.topPart}>
          <img alt={blogData.link} className={styles.thumbnailImage} src={blogs.posts[blogData.link].image} />
        </div>
        <div className={styles.bottomPart}>
          <h3 className={styles.titlePost}>{blogData.title}</h3>
          <div className={styles.previewPost}>
            <p>{blogData.firstDescription}</p>
            <span className={styles.readMore}>{blogStr.blogsInner.readArticle}</span>
          </div>
        </div>
      </NavHashLink>
    </div>
  );
};

export default BlogItem;
