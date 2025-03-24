import StyleInputForm from '@sd-ui-admin/components/StyleInputForm';
import TextInputForm from '@sd-ui-admin/components/TextInputForm';
import { ContentsStyleFormType, SectionStyleFormType } from '@sd-ui-admin/types';
import { UseFormRegisterReturn } from 'react-hook-form';
import * as styles from './index.css';

interface EventFormSectionProps {
  label: string;
  textInputName: string;
  sectionStyleFields: SectionStyleFormType;
  contentsStyleFields: ContentsStyleFormType;
  register: UseFormRegisterReturn;
  showStyleFields: boolean;
  toggleStyleFields: (orderNo: number) => void;
  placeholder?: string;
  orderNo: number;
  onOrderNoChange: (orderNo: number) => void;
  onDelete: (orderNo: number) => void;
  maxOrderNo: number;
  isArray?: boolean;
}

export function EventFormSection({
  label,
  textInputName,
  sectionStyleFields,
  contentsStyleFields,
  register,
  showStyleFields,
  toggleStyleFields,
  placeholder,
  orderNo,
  onOrderNoChange,
  onDelete,
  maxOrderNo,
  isArray = false,
}: EventFormSectionProps) {
  return (
    <div className={styles.eventFormSection}>
      <div className={styles.inputFormWrapper}>
        <TextInputForm
          label={label}
          name={textInputName}
          register={register}
          onButtonClick={() => toggleStyleFields(orderNo)}
          placeholder={placeholder}
          isArray={isArray}
        />
        <select className={styles.selectBox} value={orderNo} onChange={e => onOrderNoChange(Number(e.target.value))}>
          {Array.from({ length: maxOrderNo + 1 }, (_, i) => (
            <option key={i} value={i}>
              위치 순서: {i}
            </option>
          ))}
        </select>
        <button type="button" className={styles.deleteButton} onClick={() => onDelete(orderNo)}>
          삭제 X
        </button>
      </div>
      {showStyleFields && (
        <StyleInputForm contentsStyleFields={contentsStyleFields} sectionStyleFields={sectionStyleFields} />
      )}
    </div>
  );
}

export default EventFormSection;
