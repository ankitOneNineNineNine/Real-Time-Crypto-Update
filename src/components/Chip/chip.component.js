import React from "react";
import styles from "./chip.module.css";

/**
 * React Component for displaying chip for filter
 * @param {function} onFilter
 * @param {string} id
 * @param {boolean} filtered
 * @returns {JSX}
 */
export const Chip = ({ onFilter, id, filtered }) => {
  return (
    <div className={styles.chip}>
      <div className={styles["chip-content"]}>{id}</div>
      {!filtered ? (
        <div onClick={onFilter(id, "add")}>
          <svg
            className={styles["chip-svg"]}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
          </svg>
        </div>
      ) : (
        <div onClick={onFilter(id, "remove")}>
          <svg
            className={styles["chip-svg"]}
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
          </svg>
        </div>
      )}
    </div>
  );
};
