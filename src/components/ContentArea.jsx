import React from "react";
import { IoMdLock } from "react-icons/io";
import styles from "../pages/notes.module.css";

const ContentArea = () => {
  return (
    <div className={styles.contentArea}>
      <div className={styles.innerContentArea}>
        <div className={styles.bgPic}></div>
        <div className={styles.pocketNotesText}>Pocket Notes</div>
        <div className={styles.contentAreaSubheading}>
          Send and receive messages without keeping your phone online. Use
          Pocket Notes on up to 4 linked devices and 1 mobile phone
        </div>
        <div className={styles.encryptionText}>
          <IoMdLock />
          end-to-end encrypted
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
