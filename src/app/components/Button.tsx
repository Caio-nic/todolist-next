import React from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  onClick: () => void;
  titleButton: string;
  className?: string;
  disabled?: boolean;  
}

const Button: React.FC<ButtonProps> = ({ onClick, titleButton, className, disabled }) => {
  return (
    <button
      className={`${styles.container} ${className || ''} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
      >
      <p className={styles.title}>{titleButton}</p>
  </button>
  );
};

export default Button;
