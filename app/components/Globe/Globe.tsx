import React from "react";
import styles from "./Globe.module.css";

const Globe = () => {
  return (
    <div className={styles.globeRoot}>
      <div className={styles.globe}>
        <div className={styles.globe__wrapper}>
          <div className={styles.globe__circle} />
          <div className={styles.globe__circle} />
          <div className={styles.globe__circle} />
          <div
            className={`${styles.globe__circle} ${styles["globe__circle--hor"]}`}
          />
          <div
            className={`${styles.globe__circle} ${styles["globe__circle--horMiddle"]}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Globe;
