import { UseFormRegisterReturn } from 'react-hook-form';
import TextInputForm from '@sd-ui-admin/components/TextInputForm';
import StyleInputForm from '@sd-ui-admin/components/StyleInputForm';
import * as styles from './index.css';
import { StyleFormRegisterFieldType } from '@sd-ui-admin/types';
import { selectBox } from "./index.css";

interface EventFormSectionProps {
  label: string;
  textInputName: string;
  styleFields?: StyleFormRegisterFieldType;
  register: UseFormRegisterReturn;
  showStyleFields: boolean;
  toggleStyleFields: () => void;
  placeholder?: string;
  orderNo: number;
  onOrderNoChange: (orderNo: number) => void;
  maxOrderNo: number;
}

export function EventFormSection({
  label,
  textInputName,
  styleFields,
  register,
  showStyleFields,
  toggleStyleFields,
  placeholder,
  orderNo,
  onOrderNoChange,
  maxOrderNo,
}: EventFormSectionProps) {
  return (
    <div className={styles.eventFormSection}>
      <div className={styles.inputFormWrapper}>
        <TextInputForm
          label={label}
          name={textInputName}
          register={register}
          onButtonClick={toggleStyleFields}
          placeholder={placeholder}
        />
        <select className={styles.selectBox} value={orderNo} onChange={e => onOrderNoChange(Number(e.target.value))}>
          {Array.from({ length: maxOrderNo + 1 }, (_, i) => (
            <option key={i} value={i}>
              위치 순서: {i}
            </option>
          ))}
        </select>
      </div>
      {showStyleFields && styleFields && <StyleInputForm styleFields={styleFields} />}
    </div>
  );
}

export default EventFormSection;
