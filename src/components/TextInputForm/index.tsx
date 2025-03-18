import { UseFormRegisterReturn } from "react-hook-form";
import * as styles from './index.css';
import { InputHTMLAttributes } from 'react';

interface TextInputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register?: UseFormRegisterReturn;
}

export function TextInputForm({ label, name, register, ...inputProps }: TextInputFormProps) {
  return (
    <div className={styles.inputGroup}>
      <label>{label}</label>
      <input {...register} {...inputProps} />
    </div>
  );
}

export default TextInputForm;
