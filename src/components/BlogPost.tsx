import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./BlogPost.module.scss";
import { NavHashLink } from "react-router-hash-link";
import { blogs } from "./../data/blogStrings";

interface BlogContent {
  link: string;
  title: string;
  postedDate: string;
  firstDescription: string;
  jsonContent: string;
}

const BlogPost = () => {
  let params = useParams();
  var blogLinkBro = "";
  blogLinkBro = params.blogLink != undefined ? params.blogLink : "";
  console.log("BlogPost saying:", blogLinkBro);

  var dani: BlogContent = blogs.posts[blogLinkBro];
  if (blogs.posts[blogLinkBro] != null) {
  }
  const gotoElement = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={"container "}>
        <div className={styles.blogPostCont}>
          <div className={styles.topTitle}>
            <h3 className={styles.centerTitle}>{dani.title}</h3>
            <span className={styles.date}>{dani.postedDate}</span>
            <span className={styles.fineLine} />
            <span className={styles.postcategory}>{"Ingrijire personala, cosmetice"}</span>
          </div>
          <div className={styles.previewArea}>
            <p className={styles.firstWords}>{}</p>
          </div>
        </div>
        <div className={styles.actualBlogContent}>
          {parse(dani.jsonContent)}

          <div className={styles.endOfPost}>
            <p className={styles.tags}>{"Tags:  "}</p>
            <p className={styles.tags}>{"dermatita, "}</p>
            <p className={styles.tags}>{"sanatate, "}</p>
            <p className={styles.tags}>{"cosuri, "}</p>
          </div>
        </div>
        <div className={styles.endOfLine} />
        <div className={styles.relatedContainer}>
          <h3>{"Subiecte similare"}</h3>
          <div className={"row " + styles.relatedListing}>
            <div className={styles.relPostItem}>
              <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/blogid/2"}>
                <img
                  className={styles.pictureStyle}
                  src="https://htmlguru.net/genial/assets/img/post-details/related-01.jpg"
                />
                <h3>{"Titlu pentru acest post"}</h3>
              </NavHashLink>
            </div>
            <div className={styles.relPostItem}>
              <NavHashLink onClick={gotoElement} className={styles.HashLinkStyle} to={"/blogid/2"}>
                <img
                  className={styles.pictureStyle}
                  src="https://htmlguru.net/genial/assets/img/post-details/related-01.jpg"
                />
                <h3>{"Titlu pentru acest post"}</h3>
              </NavHashLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
