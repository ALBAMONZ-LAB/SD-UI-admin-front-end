'use client';

import { EventFormSection, TextInputForm } from '@sd-ui-admin/components';
import { ADD_DEFAULT_BODY_DATA, DEFAULT_STYLE, FORM_FIELD_TITLE } from '@sd-ui-admin/constant';
import {
  EventRequest,
  FormContentsRegisterNameType,
  FormStyleRegisterType,
  PageJsonBodyItemType,
  ShowStyleFieldsType,
  StyleFormRegisterFieldType,
} from '@sd-ui-admin/types';
import { useCallback, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as styles from './index.css';

export function EventRegisterClient() {
  const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
    image: false,
    button: false,
    carousel: false,
    footer: false,
  });
  const [formDataState, setFormDataState] = useState<EventRequest>();
  const [selectedSection, setSelectedSection] = useState<PageJsonBodyItemType>('image');

  const { register, handleSubmit, control } = useForm<EventRequest>({
    defaultValues: {
      eventTitle: '',
      description: '',
      pageJson: {
        header: '',
        body: [],
        footer: {},
      },
    },
  });

  const { fields: contentsFields, append: appendContents } = useFieldArray({
    control,
    name: 'pageJson.body',
  });

  const toggleStyleFields = (field: PageJsonBodyItemType) => {
    setShowStyleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (formData: EventRequest) => {
    setFormDataState(formData);
  };

  const handleStyleFields = useCallback(
    (fieldPrefix: FormStyleRegisterType) => {
      console.log(fieldPrefix);
      return Object.keys(DEFAULT_STYLE).reduce((acc, styleKey) => {
        acc[styleKey as FormStyleRegisterType] = register(`${fieldPrefix}.${styleKey}` as FormStyleRegisterType);
        return acc;
      }, {} as StyleFormRegisterFieldType);
    },
    [register],
  );

  const handleAddSection = () => {
    const nextOrderNo = Math.max(...contentsFields.map(f => f.orderNo ?? -1), -1) + 1;

    appendContents({ orderNo: nextOrderNo, ...ADD_DEFAULT_BODY_DATA[selectedSection] });
  };
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.addSection}>
          <h3>콘텐츠 추가</h3>
          <div className={styles.addSectionField}>
            <select
              className={styles.addSectionSelect}
              value={selectedSection}
              onChange={e => setSelectedSection(e.target.value as PageJsonBodyItemType)}
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
          <TextInputForm label="헤더(Header)" name={'pageJson.header'} register={register('pageJson.header')} />

          {contentsFields.map(field => {
            const label = FORM_FIELD_TITLE[field.fieldType];
            let registerName = `pageJson.body.${field.orderNo}.contents`;
            let placeholder;
            switch (field.fieldType) {
              case 'button':
                registerName += '.text';
                placeholder = '서비스 시작';
                break;
              case 'carousel':
              case 'image':
                registerName += '.src';
                placeholder = 'https://example.com/image.jpg';
                break;
              default:
                registerName += '.text';
                placeholder = '입력';
                break;
            }

            return (
              <EventFormSection
                key={field.id}
                label={`${label} ${field.orderNo! + 1}`}
                textInputName={registerName}
                register={register(registerName as FormContentsRegisterNameType)}
                styleFields={handleStyleFields(`pageJson.body.${field.orderNo}.style`)}
                showStyleFields={showStyleFields[field.fieldType]}
                toggleStyleFields={() => toggleStyleFields(field.fieldType)}
                placeholder={placeholder}
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
