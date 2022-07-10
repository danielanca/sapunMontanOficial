import React from "react";
import { NavHashLink } from "react-router-hash-link";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./BlogPost.module.scss";
import { uniqueId } from "lodash";
import { blogs } from "./../data/blogStrings";

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
  let params = useParams();
  var blogLinkBro = "";
  blogLinkBro = params.blogLink != undefined ? params.blogLink : "";
  console.log("BlogPost saying:", blogLinkBro);

  var dani: BlogContent = blogs.posts[blogLinkBro];
  if (blogs.posts[blogLinkBro] != null) {
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.blogPostCont}>
          <div className={styles.topTitle}>
            <h3 className={styles.centerTitle}>{dani.title}</h3>
            <span className={styles.date}>{dani.postedDate}</span>
            <span className={styles.fineLine} />
            {blogs.posts[blogLinkBro].postCategory != null && (
              <span className={styles.postcategory}>{blogs.posts[blogLinkBro].postCategory}</span>
            )}
          </div>
          <div className={styles.previewArea}>
            <p className={styles.firstWords}>{}</p>
          </div>
        </div>
        <div className={styles.actualBlogContent}>{parse(dani.jsonContent)}</div>
        <div className={styles.endOfLine} />
        <div className={styles.relatedContainer}>
          <h3>{"Subiecte similare"}</h3>
          <div className={styles.relatedListing}>
            {Object.keys(blogs.posts).map((key) => (
              <RelatedPost key={uniqueId()} blogLink={key} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const RelatedPost = ({ blogLink }: RelatedPostProps) => {
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.relPostItem}>
      <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={`/blogid/${blogLink}`}>
        <div className={styles.pictureWrapper}>
          <img className={styles.pictureStyle} src={blogs.posts[blogLink].image} />
        </div>
        <div>
          <h3 className={styles.titlePost}>{blogs.posts[blogLink].title}</h3>
        </div>
      </NavHashLink>
    </div>
  );
};

export default BlogPost;
