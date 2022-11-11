import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./BlogPost.module.scss";
import { uniqueId } from "lodash";
import { blogs } from "./../data/blogStrings";
import HelmetHead from "./MiniComponents/HelmetHead/HelmetHead";
import strings from "./../data/strings.json";

interface BlogContent {
  link: string;
  title: string;
  postedDate: string;
  firstDescription: string;
  jsonContent: string;
  postCategory?: string;
}
interface RelatedPostProps {
  blogLink: string;
}

const BlogPost = () => {
  let { blogsArea: blogStr } = strings;
  let params = useParams();
  var thisBlogLink = "";
  thisBlogLink = params.blogLink !== undefined ? params.blogLink : "";

  var dani: BlogContent = blogs.posts[thisBlogLink];
  if (blogs.posts[thisBlogLink] !== null) {
  }

  return (
    <>
      <HelmetHead
        title={blogs.posts[thisBlogLink].title}
        description={blogs.posts[thisBlogLink].firstDescription.substr(0, 110)}
      />

      <div className={styles.container}>
        <div className={styles.blogPostCont}>
          <div className={styles.topTitle}>
            <h3 className={styles.centerTitle}>{dani.title}</h3>
            <span className={styles.date}>{dani.postedDate}</span>
            <span className={styles.fineLine} />
            {blogs.posts[thisBlogLink].postCategory !== null && (
              <span className={styles.postcategory}>{blogs.posts[thisBlogLink].postCategory}</span>
            )}
          </div>
          <div className={styles.previewArea}>
            <p className={styles.firstWords}>{}</p>
          </div>
        </div>
        <div className={styles.actualBlogContent}>{parse(dani.jsonContent)}</div>
        <div className={styles.endOfLine} />
        <div className={styles.relatedContainer}>
          <h3>{blogStr.blogsInner.similarPosts}</h3>
          <div className={styles.relatedListing}>
            {Object.keys(blogs.posts)
              .filter((key) => key !== thisBlogLink)
              .map((key, index) => {
                if (index < 2) {
                  return <RelatedPost key={uniqueId()} blogLink={key} />;
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};

const RelatedPost = ({ blogLink }: RelatedPostProps) => {
  let { blogsArea: blogStr } = strings;
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.relPostItem}>
      <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={`/${blogStr.blogURLSuffix}/${blogLink}`}>
        <div className={styles.pictureWrapper}>
          <img className={styles.pictureStyle} src={blogs.posts[blogLink].image} />
        </div>
        <div className={styles.titleWrapper}>
          <h3 className={styles.titlePost}>{blogs.posts[blogLink].title.substr(0, 29)}</h3>
        </div>
      </NavHashLink>
    </div>
  );
};

export default BlogPost;
