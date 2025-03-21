import { UseFormRegisterReturn } from 'react-hook-form';
import * as styles from './index.css';
import { InputHTMLAttributes, MouseEventHandler } from 'react';

interface TextInputFormProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register?: UseFormRegisterReturn;
  onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export function TextInputForm({ label, name, register, onButtonClick, ...rest }: TextInputFormProps) {
  return (
    <div className={styles.inputGroup}>
      <div className={styles.inputTitle}>
        <label>{label}</label>
        {onButtonClick && (
          <button type="button" className={styles.toggleButton} onClick={onButtonClick}>
            스타일 설정
          </button>
        )}
      </div>
      <input {...register} id={name} {...rest} />
    </div>
  );
}

export default TextInputForm;
