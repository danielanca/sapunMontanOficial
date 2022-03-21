import Navbar from './Navbar';

import styles from './Navbar.module.scss';

const MontanLanding = () => {
  return (
    <div id={'home'} className={styles.heroSection}>
      <Navbar />
    </div>
  );
};

export default MontanLanding;
