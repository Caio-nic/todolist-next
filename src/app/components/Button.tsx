import React from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  onClick: () => void;
  titleButton: string;
  className?: string;  // Torna className opcional
}

const Button: React.FC<ButtonProps> = ({ onClick, titleButton, className }) => {
  return (
    <div className={`${styles.container} ${className || ''}`} onClick={onClick}>
      <p className={styles.title}>{titleButton}</p>
    </div>
  );
};

export default Button;
