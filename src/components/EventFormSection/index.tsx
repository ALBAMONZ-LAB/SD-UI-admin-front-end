import { UseFormRegisterReturn } from 'react-hook-form';
import TextInputForm from '@sd-ui-admin/components/TextInputForm';
import StyleInputForm from '@sd-ui-admin/components/StyleInputForm';
import * as styles from './index.css';
import { StyleFormRegisterFieldType } from '@sd-ui-admin/types';

interface EventFormSectionProps {
  label: string;
  textInputName: string;
  styleFields?: StyleFormRegisterFieldType;
  register: UseFormRegisterReturn;
  showStyleFields: boolean;
  toggleStyleFields: () => void;
}

export function EventFormSection({
  label,
  textInputName,
  styleFields,
  register,
  showStyleFields,
  toggleStyleFields,
}: EventFormSectionProps) {
  return (
    <div className={styles.eventFormSection}>
      <div className={styles.eventFormMain}>
        <TextInputForm label={label} name={textInputName} register={register} />
        <button type="button" onClick={toggleStyleFields}>
          Toggle {label} Style
        </button>
      </div>
      {showStyleFields && styleFields && <StyleInputForm styleFields={styleFields} />}
    </div>
  );
}

export default EventFormSection;
