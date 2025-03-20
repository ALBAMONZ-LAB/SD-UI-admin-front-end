'use client';

import { useGetEventPage } from '@sd-ui-admin/api/event/event.queries';
import { DEFAULT_BUTTON_STYLE, DEFAULT_CAROUSEL_STYLE, DEFAULT_IMAGE_STYLE } from '@sd-ui-admin/constant';
import {
  ButtonConfig,
  CarouselConfig,
  EventDetailRequest,
  ImageConfig,
  PageJsonStyleKeys,
  StyleConfig,
  StyleFormRegisterFieldType,
  StyleType,
  EventDetailResponse
} from '@sd-ui-admin/types';
import { useEffect, useState } from 'react';
import { useForm, FormProvider} from 'react-hook-form';
import * as styles from './index.css';
import { EventFormSection, TextInputForm } from '@sd-ui-admin/components';
import { PreviewDetail } from "@sd-ui-admin/components";

export interface EventDetailProps {
  id: number;
}

type ShowStyleFieldsType = Record<PageJsonStyleKeys, boolean>;

const defaultStyle: StyleConfig = {
  padding: '',
  margin: '',
  background: '',
  fontSize: '',
  border: '',
  borderRadius: '',
  color: '',
};
const defaultImage: ImageConfig = { src: '', style: DEFAULT_IMAGE_STYLE };
const defaultButton: ButtonConfig = { text: '', style: DEFAULT_BUTTON_STYLE };
const defaultCarousel: CarouselConfig = { src: [], style: DEFAULT_CAROUSEL_STYLE };

export function EventDetail({ id }: EventDetailProps) {
  const { data, isLoading, isError, error } = useGetEventPage(id);
  const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
    image: false,
    button: false,
    carousel: false,
  });

  // useForm에 제네릭 타입을 제대로 설정합니다.
  const methods = useForm<EventDetailRequest>({
    mode: 'onBlur',
    defaultValues: {
      eventTitle: '',
      header: '',
      image: defaultImage,
      button: defaultButton,
      carousel: defaultCarousel,
      footer: '',
      description: '',
    },
  });

  const { register, handleSubmit, setValue, getValues, watch } = methods;

  // data가 로드되었을 때 setValue로 폼 필드를 업데이트
  useEffect(() => {
    if (data) {
      setValue('header', data.pageJson.header);
      setValue('image', data.pageJson.image || defaultImage);
      setValue('button', data.pageJson.button || defaultButton);
      setValue('carousel', data.pageJson.carousel || defaultCarousel);
      setValue('footer', data.pageJson.footer);
      setValue('description', data.pageJson.description);
      setValue('eventTitle', data.eventTitle);
    }
  }, [data, setValue]);
  const toggleStyleFields = (field: PageJsonStyleKeys) => {
    setShowStyleFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (formData: EventDetailRequest) => {
    console.log('showStyleFields:', showStyleFields);
    console.log('Updated Event (JSON format):', JSON.stringify(formData, null, 2));
  };

  const handleStyleFields = (fieldPrefix: PageJsonStyleKeys) => {
    return Object.keys(defaultStyle).reduce((acc, styleKey) => {
      acc[styleKey as PageJsonStyleKeys] = register(`${fieldPrefix}.style.${styleKey as StyleType}`);
      return acc;
    }, {} as StyleFormRegisterFieldType);
  };

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <FormProvider {...methods}>
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Event Detail Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.readOnlyFields}>
            <p>Event ID: {data?.eventId}</p>
            <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
            <p>Description: {data?.pageJson.description}</p>
          </div>
          <TextInputForm label="이벤트 제목" name={'eventTitle'} register={register('eventTitle')} />
          <TextInputForm label="설명" name={'description'} register={register('description')} />
          <TextInputForm label="헤더(Header)" name={'header'} register={register('header')} />

          <EventFormSection
            label="이미지(Image)"
            textInputName="image.src"
            register={register('image.src')}
            styleFields={handleStyleFields('image')}
            showStyleFields={showStyleFields['image']}
            toggleStyleFields={() => toggleStyleFields('image')}
          />

          <EventFormSection
            label="버튼(Button)"
            textInputName="button.text"
            register={register('button.text')}
            styleFields={handleStyleFields('button')}
            showStyleFields={showStyleFields['button']}
            toggleStyleFields={() => toggleStyleFields('button')}
          />

          <EventFormSection
            label="swiper(Carousel)"
            textInputName="carousel.src"
            register={register('carousel.src')}
            styleFields={handleStyleFields('carousel')}
            showStyleFields={showStyleFields['carousel']}
            toggleStyleFields={() => toggleStyleFields('carousel')}
          />

          <TextInputForm label="하단(Footer)" name={'footer'} register={register('footer')} />

            <div className={styles.saveButtonContainer}>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Preview</h2>
          <PreviewDetail />
        </section>
      </div>
    </FormProvider>
  );
}

export default EventDetail;
