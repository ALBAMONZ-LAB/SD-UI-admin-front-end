'use client';

import {
  DEFAULT_BUTTON_DATA,
  DEFAULT_CAROUSEL_DATA,
  DEFAULT_IMAGE_DATA,
  DEFAULT_STYLE,
  FORM_FIELD_TITLE,
} from '@sd-ui-admin/constant';
import {
  EventRequest,
  PageJsonStyleKeys,
  ShowStyleFieldsType,
  StyleFormRegisterArrayType,
  StyleFormRegisterFieldType,
  StyleType,
} from '@sd-ui-admin/types';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as styles from './index.css';
import { EventFormSection, TextInputForm } from '@sd-ui-admin/components';

export function EventRegisterClient() {
  const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
    image: false,
    button: false,
    carousel: false,
    footer: false,
  });
  const [formDataState, setFormDataState] = useState<EventRequest>();
  const [selectedSection, setSelectedSection] = useState<PageJsonStyleKeys>('image');

  const { register, handleSubmit, control, setValue } = useForm<EventRequest>({
    mode: 'onSubmit',
    defaultValues: {
      eventTitle: '',
      header: '',
      description: '',
    },
  });

  const { fields: imageFields, append: appendImage } = useFieldArray({
    control,
    name: 'image',
  });

  const { fields: buttonFields, append: appendButton } = useFieldArray({
    control,
    name: 'button',
  });

  const { fields: carouselFields, append: appendCarousel } = useFieldArray({
    control,
    name: 'carousel',
  });

  const toggleStyleFields = (field: PageJsonStyleKeys) => {
    setShowStyleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (formData: EventRequest) => {
    setFormDataState(formData);
    console.log('Updated Event (JSON format):', JSON.stringify(formData, null, 2));
  };

  const handleStyleFields = (fieldPrefix: StyleFormRegisterArrayType) => {
    return Object.keys(DEFAULT_STYLE).reduce((acc, styleKey) => {
      acc[styleKey as StyleFormRegisterArrayType] = register(`${fieldPrefix}.style.${styleKey as StyleType}`);
      return acc;
    }, {} as StyleFormRegisterFieldType);
  };

  const handleAddSection = () => {
    const nextOrderNo =
      Math.max(
        ...imageFields.map(f => f.orderNo),
        ...buttonFields.map(f => f.orderNo),
        ...carouselFields.map(f => f.orderNo),
        -1,
      ) + 1;
    if (selectedSection === 'image') {
      appendImage({ orderNo: nextOrderNo, ...DEFAULT_IMAGE_DATA });
    } else if (selectedSection === 'button') {
      appendButton({ orderNo: nextOrderNo, ...DEFAULT_BUTTON_DATA });
    } else if (selectedSection === 'carousel') {
      appendCarousel({ orderNo: nextOrderNo, ...DEFAULT_CAROUSEL_DATA });
    }
  };

  const sortedFields = [...imageFields, ...buttonFields, ...carouselFields].sort((a, b) => a.orderNo - b.orderNo);
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.addSection}>
          <h3>콘텐츠 추가</h3>
          <div className={styles.addSectionField}>
            <select
              className={styles.addSectionSelect}
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value as PageJsonStyleKeys)}
            >
              <option value="image">이미지</option>
              <option value="button">버튼</option>
              <option value="carousel">캐러셀</option>
            </select>
            <button className={styles.addSectionButton} type="button" onClick={handleAddSection}>
              추가
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInputForm label="이벤트 제목" name={'eventTitle'} register={register('eventTitle')} />
          <TextInputForm label="설명" name={'description'} register={register('description')} />
          <TextInputForm label="헤더(Header)" name={'header'} register={register('header')} />

          {sortedFields.map((field, i) => {
            const label = FORM_FIELD_TITLE[field.fieldType];
            let registerName;
            if (field.fieldType === 'button') {
              registerName = `${field.fieldType}.${field.orderNo}.text`;
            } else {
              registerName = `${field.fieldType}.${field.orderNo}.src`;
            }
            return (
              <EventFormSection
                key={field.id}
                label={`${label} ${field.orderNo + 1}`}
                textInputName={registerName}
                register={register(registerName as StyleFormRegisterArrayType)}
                styleFields={handleStyleFields(`${field.fieldType}.${field.orderNo}`)}
                showStyleFields={showStyleFields['image']}
                toggleStyleFields={() => toggleStyleFields('image')}
              />
            );
          })}
          <div className={styles.saveButtonContainer}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>PageJSON</h2>
        <pre>{JSON.stringify(formDataState, null, 2)}</pre>
      </section>
    </div>
  );
}

export default EventRegisterClient;
