import styles from './TheSeparator.module.scss';

interface SeparatorProps {
  anchorID?: string;
}
const TheSeparator = ({ anchorID }: SeparatorProps) => {
  return (
    <div id={anchorID} className={styles.KeepDistance}>
      <div className={styles.LinerShape}></div>
    </div>
  );
};

export default TheSeparator;
