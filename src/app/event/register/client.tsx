'use client';

import { usePostEventPage } from '@sd-ui-admin/api/event/event.queries';
import { EventFormSection, PreviewDetail, TextInputForm } from '@sd-ui-admin/components';
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
import { FieldErrors, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import * as styles from './index.css';

export function EventRegisterClient() {
  const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
    image: false,
    button: false,
    carousel: false,
  });
  const [formDataState, setFormDataState] = useState<EventFormType>();
  const [selectedSection, setSelectedSection] = useState<PageJsonBodyItemType>('image');
  const { mutate } = usePostEventPage();

  const methods = useForm<EventFormType>({
    mode: 'onSubmit',
    defaultValues: {
      eventTitle: '',
      pageJson: {
        header: '',
        body: [],
        footer: {},
      },
    },
  });

  const { register, handleSubmit, control, watch, setValue } = methods;

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
    if (!formData.pageJson?.body || formData.pageJson?.body.length < 1) {
      alert('하나 이상의 콘텐츠가 필요합니다.');
      return;
    }
    const formDataWithStringPageJson = {
      ...formData,
      pageJson: JSON.stringify(formData.pageJson),
    };
    mutate({ ...formDataWithStringPageJson });
  };

  function findFirstErrorMessage(errors: FieldErrors): string | null {
    for (const key in errors) {
      const error = errors[key];
      if (typeof error?.message === 'string') {
        return error.message;
      }

      if (typeof error === 'object') {
        const nestedMessage = findFirstErrorMessage(error as FieldErrors);
        if (nestedMessage) {
          return nestedMessage;
        }
      }
    }
    return null;
  }

  const onError = (errors: FieldErrors<EventFormType>) => {
    // 첫 번째 에러 메시지만 alert 띄우기
    const firstError = findFirstErrorMessage(errors);
    if (firstError) {
      alert(firstError);
    }
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
    const requiredOption = { required: `${label} 콘텐츠에 내용은 필수입니다` };

    switch (fieldType) {
      case 'button':
        registerName += '.text';
        placeholder = '서비스 시작';
        break;
      case 'carousel':
        registerName += '.src';
        placeholder = "이미지 URL, 이미지 URL (',') 구분";
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
    return { label, registerName, placeholder, isArray, requiredOption };
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
    <FormProvider {...methods}>
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
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextInputForm
              label="이벤트 제목"
              name={'eventTitle'}
              register={register('eventTitle', { required: '이벤트 제목을 입력해주세요.' })}
            />
            <TextInputForm
              label="헤더(Header)"
              name={'pageJson.header'}
              register={register('pageJson.header', { required: '헤더를 입력해 주세요.' })}
            />

            {contentsFields.map(field => {
              const { label, registerName, placeholder, isArray, requiredOption } = getRegisterNameAndPlaceholder(
                field.fieldType,
                field.orderNo,
              );

              return (
                <EventFormSection
                  key={field.id}
                  label={`${label} ${field.orderNo! + 1}`}
                  textInputName={registerName}
                  register={register(registerName as FormContentsRegisterNameType, { ...requiredOption })}
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
          <PreviewDetail />
          {/* <pre>{JSON.stringify(formDataState, null, 2)}</pre> */}
        </section>
      </div>
    </FormProvider>
  );
}

export default EventRegisterClient;
