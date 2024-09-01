import React from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  onClick: () => void;
  titleButton: string;
  className?: string;  // Torna className opcional
  disabled?: boolean;  // Adiciona a propriedade disabled
}

const Button: React.FC<ButtonProps> = ({ onClick, titleButton, className, disabled }) => {
  return (
    <div
      className={`${styles.container} ${className || ''} ${disabled ? styles.disabled : ''}`} // Adiciona uma classe para botão desativado
      onClick={disabled ? undefined : onClick} // Evita a ação de clique se desativado
    >
      <p className={styles.title}>{titleButton}</p>
    </div>
  );
};

export default Button;
