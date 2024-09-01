import React, { ReactNode } from "react";
import styles from "../styles/FormsCard.module.css";

interface FormsCardProps {
  titleCard: string;
  subTitle: string;
  children: ReactNode;
  identification?: boolean;
}

export const FormsCard: React.FC<FormsCardProps> = ({
  titleCard,
  subTitle,
  children,
  identification = false
}) => {
  return (
    <div className={styles.cardLogin}>
      {identification ? (
        <div>
          <div className={styles.firstBlock}></div>
          <div className={styles.secondBlock}>
            <p className={styles.title}>{titleCard}</p>
            <p className={styles.subTitle}>{subTitle}</p>
            {children}
          </div>
        </div>
      ) : (
        <div className={styles.cardHeader}>
          <p>{titleCard}</p>
          <p>{subTitle}</p>
          {children}
        </div>
      )}
    </div>
  );
};

export default FormsCard;

