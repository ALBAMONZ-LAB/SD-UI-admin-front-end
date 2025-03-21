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
  placeholder?: string;
}

export function EventFormSection({
  label,
  textInputName,
  styleFields,
  register,
  showStyleFields,
  toggleStyleFields,
  placeholder,
}: EventFormSectionProps) {
  return (
    <div className={styles.eventFormSection}>
      <TextInputForm
        label={label}
        name={textInputName}
        register={register}
        onButtonClick={toggleStyleFields}
        placeholder={placeholder}
      />
      {showStyleFields && styleFields && <StyleInputForm styleFields={styleFields} />}
    </div>
  );
}

export default EventFormSection;
