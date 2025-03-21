import * as styles from './index.css';
import { UseFormRegisterReturn } from "react-hook-form";

interface StyleInputFormProps {
  styleFields: { [key: string]: UseFormRegisterReturn };
}

export function StyleInputForm({ styleFields }: StyleInputFormProps) {
  const styleExamples: { [key: string]: string } = {
    padding: '(예: 10px 10px 10px 10px)',
    margin: '(예: 10px 10px 10px 10px)',
    background: '(예: #ffffff)',
    fontSize: '(예: 16px)',
    border: '(예: 1px solid #000)',
    borderRadius: '(예: 5px)',
    color: '(예: #ff0000)',
  };

  return (
    <div className={styles.styleGrid}>
      {Object.keys(styleFields).map((styleKey) => (
        <div key={styleKey} className={styles.styleInput}>
          <label>
            {styleKey}
            <span className={styles.subLabel}> {styleExamples[styleKey] || ''}</span>
          </label>
          <input {...styleFields[styleKey]} />
        </div>
      ))}
    </div>
  );
}

export default StyleInputForm;