'use client';

import { EventFormSection, TextInputForm } from '@sd-ui-admin/components';
import { ADD_DEFAULT_BODY_DATA, DEFAULT_STYLE, FORM_FIELD_TITLE } from '@sd-ui-admin/constant';
import {
  EventFormType,
  FormContentsRegisterNameType,
  FormStyleRegisterType,
  PageJsonBodyItemType,
  ShowStyleFieldsType,
  StyleFormRegisterFieldType,
} from '@sd-ui-admin/types';
import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as styles from './index.css';
import { usePostEventPage } from '@sd-ui-admin/api/event/event.queries';

export function EventRegisterClient() {
  const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
    image: false,
    button: false,
    carousel: false,
  });
  const [formDataState, setFormDataState] = useState<EventFormType>();
  const [selectedSection, setSelectedSection] = useState<PageJsonBodyItemType>('image');
  const { mutate } = usePostEventPage();

  const { register, handleSubmit, control, watch, setValue } = useForm<EventFormType>({
    defaultValues: {
      eventTitle: '',
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

  useEffect(() => {
    setFormDataState(watch());
  }, [watch]);

  const toggleStyleFields = (field: PageJsonBodyItemType) => {
    setShowStyleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (formData: EventFormType) => {
    const formDataWithStringPageJson = {
      ...formData,
      pageJson: JSON.stringify(formData.pageJson),
    };
    mutate({ ...formDataWithStringPageJson, eventId: 2000 });
  };

  const handleStyleFields = useCallback(
    (fieldPrefix: FormStyleRegisterType) => {
      return Object.keys(DEFAULT_STYLE).reduce((acc, styleKey) => {
        acc[styleKey as FormStyleRegisterType] = register(`${fieldPrefix}.${styleKey}` as FormStyleRegisterType);
        return acc;
      }, {} as StyleFormRegisterFieldType);
    },
    [register],
  );

  function getRegisterNameAndPlaceholder(fieldType: PageJsonBodyItemType, orderNo: number) {
    const label = FORM_FIELD_TITLE[fieldType];
    let registerName = `pageJson.body.${orderNo}.contents`;
    let placeholder;
    let isArray = false;
    switch (fieldType) {
      case 'button':
        registerName += '.text';
        placeholder = '서비스 시작';
        break;
      case 'carousel':
        registerName += '.src';
        placeholder = '이미지 URL, 이미지 URL (\',\') 구분';
        isArray = true;
        break;
      case 'image':
        registerName += '.src';
        placeholder = 'https://example.com/image.jpg';
        break;
      default:
        registerName += '.text';
        placeholder = '입력';
        break;
    }
    return { label, registerName, placeholder, isArray };
  }

  const handleAddSection = () => {
    const nextOrderNo = Math.max(...contentsFields.map(f => f.orderNo ?? -1), -1) + 1;
    appendContents({ orderNo: nextOrderNo, ...ADD_DEFAULT_BODY_DATA[selectedSection] });
  };

  const handleOrderNoChange = (currentOrderNo: number, newOrderNo: number) => {
    const updatedFields = [...contentsFields].map(({ id, ...rest }) => rest);
    updatedFields[currentOrderNo].orderNo = newOrderNo;

    updatedFields.forEach((field, i) => {
      if (i !== currentOrderNo) {
        if (currentOrderNo < newOrderNo && field.orderNo > currentOrderNo && field.orderNo <= newOrderNo) {
          field.orderNo -= 1;
        } else if (currentOrderNo > newOrderNo && field.orderNo < currentOrderNo && field.orderNo >= newOrderNo) {
          field.orderNo += 1;
        }
      }
    });

    updatedFields.sort((a, b) => a.orderNo - b.orderNo);
    setValue('pageJson.body', updatedFields);
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
          <TextInputForm label="헤더(Header)" name={'pageJson.header'} register={register('pageJson.header')} />

          {contentsFields.map(field => {
            const { label, registerName, placeholder, isArray } = getRegisterNameAndPlaceholder(
              field.fieldType,
              field.orderNo,
            );

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
                orderNo={field.orderNo}
                onOrderNoChange={(newOrderNo: number) => handleOrderNoChange(field.orderNo, newOrderNo)}
                maxOrderNo={contentsFields.length - 1}
                isArray={isArray}
              />
            );
          })}
          <div className={styles.saveButtonContainer}>
            <button type="submit" className={styles.addSectionButton}>
              이벤트 등록
            </button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Request Body</h2>
        <pre>{JSON.stringify(formDataState, null, 2)}</pre>
      </section>
    </div>
  );
}

export default EventRegisterClient;
