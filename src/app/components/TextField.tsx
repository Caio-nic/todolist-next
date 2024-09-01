import React, { ChangeEvent } from "react";
import styles from "../styles/TextField.module.css";

interface TextFieldProps {
  type: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  [key: string]: any;
}

const TextField: React.FC<TextFieldProps> = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  className, 
  ...props 
}) => {
  return (
    <input
      className={`${styles.container} ${className || ''}`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default TextField;
