'use client';

import { useGetEventPage, usePatchEventPage } from '@sd-ui-admin/api/event/event.queries';
import { EventFormSection, PreviewDetail, TextInputForm } from '@sd-ui-admin/components';
import {
  ADD_DEFAULT_BODY_DATA,
  DEFAULT_FIXED_SECTION_STYLE,
  DEFAULT_FOOTER_STYLE,
  DEFAULT_SECTION_STYLE,
  DEFAULT_STYLE,
  FORM_FIELD_TITLE,
} from '@sd-ui-admin/constant';
import {
  ContentsStyleRegisterType,
  EventFormType,
  FooterContentsStyleRegisterType,
  FooterStyleRegisterType,
  FormContentsRegisterNameType,
  PageJsonBodyItemType,
  SectionStyleRegisterType,
  StyleConfig,
} from '@sd-ui-admin/types';
import { useEffect, useState } from 'react';
import { FieldErrors, FormProvider, useFieldArray, useForm, UseFormRegisterReturn } from 'react-hook-form';
import * as styles from './index.css';

interface EventDetailPageClientProps {
  eventId: number;
}

export function EventDetailPageClient({ eventId }: EventDetailPageClientProps) {
  const [showStyleFields, setShowStyleFields] = useState<Record<number, boolean>>({});
  const { data } = useGetEventPage(eventId, { suspense: true });
  const [hasFooter, setHasFooter] = useState(false);
  const [footerShowStyleFields, setFooterShowStyleFields] = useState(false);
  const [selectedSection, setSelectedSection] = useState<PageJsonBodyItemType>('image');
  const [eventBackground, setEventBackground] = useState('#ffffff');
  const { mutate } = usePatchEventPage();

  const methods = useForm<EventFormType>({
    mode: 'onSubmit',
    defaultValues: {
      eventTitle: '',
      pageJson: {
        header: '',
        body: [],
      },
    },
  });

  const { register, handleSubmit, control, setValue, reset, watch } = methods;

  const { fields: contentsFields, append: appendContents } = useFieldArray({
    control,
    name: 'pageJson.body',
  });

  useEffect(() => {
    if (data) {
      setEventBackground(data.pageJson.body![0].sectionStyle.background as string);
      setHasFooter(!!data.pageJson.footer);
      reset(data);
    }
  }, [data, reset]);

  const toggleStyleFields = (orderNo: number) => {
    if (orderNo === -1) {
      setFooterShowStyleFields(!footerShowStyleFields);
      return;
    }
    setShowStyleFields(prev => ({
      ...prev,
      [orderNo]: !prev[orderNo],
    }));
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
    mutate({ eventId, body: formDataWithStringPageJson });
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

  function createStyleFieldRegister<
    T extends
      | ContentsStyleRegisterType
      | SectionStyleRegisterType
      | FooterStyleRegisterType
      | FooterContentsStyleRegisterType,
  >(fieldPrefix: T, defaultStyleObj: Partial<StyleConfig>): Record<T, UseFormRegisterReturn> {
    return Object.keys(defaultStyleObj).reduce(
      (acc, styleKey) => {
        acc[styleKey as T] = register(`${fieldPrefix}.${styleKey}` as T);
        return acc;
      },
      {} as Record<T, UseFormRegisterReturn>,
    );
  }

  const handleStyleFields = (fieldPrefix: ContentsStyleRegisterType) =>
    createStyleFieldRegister<ContentsStyleRegisterType>(fieldPrefix, DEFAULT_STYLE);

  const handleSectionStyleFields = (fieldPrefix: SectionStyleRegisterType, sectionType: PageJsonBodyItemType) =>
    createStyleFieldRegister<SectionStyleRegisterType>(
      fieldPrefix,
      sectionType === 'floatingButton' ? DEFAULT_FIXED_SECTION_STYLE : DEFAULT_SECTION_STYLE,
    );

  function getEventBodyFormData(sectionType: PageJsonBodyItemType, orderNo: number) {
    const label = FORM_FIELD_TITLE[sectionType];
    let registerName = `pageJson.body.${orderNo}.contents`;
    let placeholder;
    let isArray = false;
    const requiredOption = { required: `${label} 콘텐츠에 내용은 필수입니다` };

    switch (sectionType) {
      case 'floatingButton':
      case 'button':
        registerName += '.text';
        placeholder = '버튼이름';
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
        placeholder = '';
        break;
    }
    return { label, registerName, placeholder, isArray, requiredOption };
  }

  const handleAddSection = () => {
    const nextOrderNo = Math.max(...contentsFields.map(f => f.orderNo ?? -1), -1) + 1;
    appendContents({
      orderNo: nextOrderNo,
      ...ADD_DEFAULT_BODY_DATA[selectedSection],
      sectionStyle: {
        ...ADD_DEFAULT_BODY_DATA[selectedSection].sectionStyle,
        background: selectedSection === 'floatingButton' ? 'transparent' : eventBackground,
      },
    });
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

  const handleBackgroundChange = () => {
    const updatedFields = contentsFields.map(({ id, ...field }) => ({
      ...field,
      sectionStyle: {
        ...field.sectionStyle,
        background: field.sectionType === 'floatingButton' ? 'transparent' : eventBackground,
      },
    }));
    setValue('pageJson.body', updatedFields);
  };

  const handleRemoveSection = (targetOrderNo: number) => {
    if (!confirm('해당 콘텐츠를 삭제하시겠습니까?')) {
      return;
    }
    const updatedFields = contentsFields
      .filter(field => field.orderNo !== targetOrderNo)
      .map(({ id, ...rest }) => rest)
      .sort((a, b) => a.orderNo - b.orderNo)
      .map((field, i) => ({
        ...field,
        orderNo: i,
      }));
    setShowStyleFields([]);
    setValue('pageJson.body', updatedFields);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.container}>
        <section className={styles.section}>
          <div className={styles.addSection} style={{ marginBottom: '8px' }}>
            <h3 style={{ margin: '0' }}>Footer 추가</h3>
            <div className={styles.addSectionField}>
              <button
                className={styles.addSectionButton}
                type="button"
                onClick={() => {
                  setHasFooter(true);
                  setValue('pageJson.footer', {
                    contents: {
                      src: '',
                      style: DEFAULT_FOOTER_STYLE,
                    },
                    sectionStyle: DEFAULT_SECTION_STYLE,
                  });
                }}
              >
                추가
              </button>
            </div>
          </div>
          <div className={styles.addSection} style={{ marginBottom: '8px' }}>
            <h3 style={{ margin: '0' }}>콘텐츠 추가</h3>
            <div className={styles.addSectionField}>
              <select
                className={styles.addSectionSelect}
                value={selectedSection}
                onChange={e => setSelectedSection(e.target.value as PageJsonBodyItemType)}
              >
                <option value="image">이미지</option>
                <option value="button">버튼</option>
                <option value="carousel">캐러셀</option>
                <option value="floatingButton">플로팅 버튼</option>
                <option value="custom">커스텀</option>
              </select>
              <button className={styles.addSectionButton} type="button" onClick={handleAddSection}>
                추가
              </button>
            </div>
          </div>
          <div className={styles.addSection}>
            <h3 style={{ margin: '0' }}>배경 색</h3>
            <div className={styles.addSectionField}>
              <input
                type={'color'}
                style={{ height: '39px', background: '#fff' }}
                value={eventBackground}
                onChange={e => setEventBackground(e.target.value)}
              />
              <button className={styles.addSectionButton} type="button" onClick={handleBackgroundChange}>
                전체 섹션 적용
              </button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextInputForm
              label="이벤트 제목"
              register={register('eventTitle', { required: '이벤트 제목을 입력해주세요.' })}
            />
            <TextInputForm
              label="헤더(Header)"
              register={register('pageJson.header', { required: '헤더를 입력해 주세요.' })}
            />

            {contentsFields.map(field => {
              const { label, registerName, placeholder, isArray, requiredOption } = getEventBodyFormData(
                field.sectionType,
                field.orderNo,
              );

              return (
                <EventFormSection
                  key={field.id}
                  label={`${label} ${field.orderNo! + 1}`}
                  register={register(registerName as FormContentsRegisterNameType, { ...requiredOption })}
                  sectionStyleFields={handleSectionStyleFields(
                    `pageJson.body.${field.orderNo}.sectionStyle`,
                    field.sectionType,
                  )}
                  contentsStyleFields={handleStyleFields(`pageJson.body.${field.orderNo}.contents.style`)}
                  showStyleFields={showStyleFields[field.orderNo]}
                  toggleStyleFields={() => toggleStyleFields(field.orderNo)}
                  placeholder={placeholder}
                  readOnly={field.sectionType === 'custom'}
                  orderNo={field.orderNo}
                  onOrderNoChange={(newOrderNo: number) => handleOrderNoChange(field.orderNo, newOrderNo)}
                  onDelete={handleRemoveSection}
                  maxOrderNo={contentsFields.length - 1}
                  isArray={isArray}
                />
              );
            })}
            {hasFooter && (
              <EventFormSection
                label={'푸터(Footer)'}
                register={register('pageJson.footer.contents.src', {
                  required: hasFooter ? '푸터 내용을 입력해주세요.' : false,
                })}
                sectionStyleFields={createStyleFieldRegister<FooterStyleRegisterType>(
                  'pageJson.footer.sectionStyle',
                  DEFAULT_SECTION_STYLE,
                )}
                contentsStyleFields={createStyleFieldRegister<FooterContentsStyleRegisterType>(
                  'pageJson.footer.contents.style',
                  DEFAULT_STYLE,
                )}
                showStyleFields={footerShowStyleFields}
                onDelete={() => {
                  if (!confirm('푸터를 삭제하시겠습니까?')) return;
                  setHasFooter(false);
                  toggleStyleFields(-1);
                  setValue('pageJson.footer', undefined);
                }}
                orderNo={-1}
                toggleStyleFields={() => toggleStyleFields(-1)}
                placeholder={"본 이벤트 블라, 당첨자 블라  (',') 구분"}
                isArray={true}
              />
            )}
            <div className={styles.saveButtonContainer}>
              <button type="submit" className={styles.addSectionButton}>
                이벤트 수정
              </button>
            </div>
          </form>
        </section>

        <section className={styles.section}>
          <PreviewDetail eventBackground={watch('pageJson.body.0.sectionStyle.background')} />
        </section>
      </div>
    </FormProvider>
  );
}

export default EventDetailPageClient;
