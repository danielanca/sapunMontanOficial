import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.oneRow}>Text</div>
      <div className={styles.oneRow}>Name Area</div>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default Sidebar;
