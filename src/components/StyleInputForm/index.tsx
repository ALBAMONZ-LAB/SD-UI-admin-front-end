// src/components/StyleInputForm/index.tsx
import * as styles from './index.css';
import { UseFormRegisterReturn } from "react-hook-form";

interface StyleInputFormProps {
  styleFields: { [key: string]: UseFormRegisterReturn };
}

export function StyleInputForm({ styleFields }: StyleInputFormProps) {
  return (
    <div className={styles.styleGrid}>
      {Object.keys(styleFields).map((styleKey) => (
        <div key={styleKey} className={styles.styleInput}>
          <label>{styleKey}</label>
          <input {...styleFields[styleKey]} />
        </div>
      ))}
    </div>
  );
}

export default StyleInputForm;