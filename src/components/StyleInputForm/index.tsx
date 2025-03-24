import * as styles from './index.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface StyleInputFormProps {
  sectionStyleFields: { [key: string]: UseFormRegisterReturn };
  contentsStyleFields: { [key: string]: UseFormRegisterReturn };
}

const styleExamples: { [key: string]: string } = {
  padding: '(예: 10px 10px 10px 10px)',
  margin: '(예: 10px 10px 10px 10px)',
  background: '(예: #ffffff)',
  fontSize: '(예: 16px)',
  border: '(예: 1px solid #000)',
  borderRadius: '(예: 5px)',
  color: '(예: #ff0000)',
};

const renderStyleFields = (styleFields: { [key: string]: UseFormRegisterReturn }) => {
  return Object.keys(styleFields).map(styleKey => (
    <div key={styleKey} className={styles.styleInput}>
      <label>
        {styleKey}
        <span className={styles.subLabel}> {styleExamples[styleKey] || ''}</span>
      </label>
      <input {...styleFields[styleKey]} />
    </div>
  ));
};

export function StyleInputForm({ sectionStyleFields, contentsStyleFields }: StyleInputFormProps) {
  return (
    <div>
      <h3 className={styles.header} style={{marginTop:'0'}}>섹션 영역</h3>
      <div className={styles.styleGrid}>{renderStyleFields(sectionStyleFields)}</div>
      <h3 className={styles.header}>콘텐츠 영역</h3>
      <div className={styles.styleGrid}>{renderStyleFields(contentsStyleFields)}</div>
    </div>
  );
}

export default StyleInputForm;
