'use client'

import { useGetEventPage } from '@sd-ui-admin/api/event/event.queries';
import TextInputForm from '@sd-ui-admin/components/TextInputForm';
import { DEFAULT_BUTTON_STYLE, DEFAULT_CAROUSEL_STYLE, DEFAULT_IMAGE_STYLE } from '@sd-ui-admin/constant';
import { ButtonConfig, CarouselConfig, EventDetailRequest, ImageConfig, StyleConfig } from '@sd-ui-admin/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as styles from './index.css';

export interface EventDetailProps {
  id: number;
}


const defaultStyle: StyleConfig = {
  padding: '',
  margin: '',
  background: '',
  fontsize: '',
  border: '',
  borderRadius: '',
  color: ''
};

const defaultImage: ImageConfig = { src: '', style: DEFAULT_IMAGE_STYLE };
const defaultButton: ButtonConfig = { text: '', style: DEFAULT_BUTTON_STYLE };
const defaultCarousel: CarouselConfig = { src: [], style: DEFAULT_CAROUSEL_STYLE };

export function EventDetail({ id }: EventDetailProps) {
  const { data, isLoading, isError, error } = useGetEventPage(id);
  const [showStyleFields, setShowStyleFields] = useState<{ [key: string]: boolean }>({});

  const { register, handleSubmit, setValue, watch } = useForm<EventDetailRequest>({
    mode: "onBlur",
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

  const toggleStyleFields = (field: string) => {
    setShowStyleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const onSubmit = (formData: EventDetailRequest) => {
    console.log('showStyleFields:', showStyleFields);
    console.log('Updated Event (JSON format):', JSON.stringify(formData, null, 2));
  };

  if (isLoading || !data) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Event Detail Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.readOnlyFields}>
            <p>Event ID: {data?.eventId}</p>
            <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
            <p>Description: {data?.pageJson.description}</p>
          </div>

          <TextInputForm label="EventTitle" name={'eventTitle'} register={register('eventTitle')} />
          <TextInputForm label="Description" name={'description'} register={register('description')} />
          <TextInputForm label="Header" name={'header'} register={register('header')} />
          
          <TextInputForm label="Image Source" name={'image.src'} register={register('image.src')} />
          <button type="button" onClick={() => toggleStyleFields('image')}>Toggle Image Style</button>
          {showStyleFields['image'] && Object.keys(defaultStyle).map((styleKey) => (
            <TextInputForm key={styleKey} label={`Image ${styleKey}`} name={`image.style.${styleKey}`} register={register(`image.style.${styleKey}`)} />
          ))}

          <TextInputForm label="Button Text" name={'button.text'} register={register('button.text')} />
          <button type="button" onClick={() => toggleStyleFields('button')}>Toggle Button Style</button>
          {showStyleFields['button'] && Object.keys(defaultStyle).map((styleKey) => (
            <TextInputForm key={styleKey} label={`Button ${styleKey}`} name={`button.style.${styleKey}`} register={register(`button.style.${styleKey}`)} />
          ))}

          <TextInputForm label="Carousel Style" name={'carousel.style'} register={register('carousel.style')} />
          <button type="button" onClick={() => toggleStyleFields('carousel')}>Toggle Carousel Style</button>
          {showStyleFields['carousel'] && Object.keys(defaultStyle).map((styleKey) => (
            <TextInputForm key={styleKey} label={`Carousel ${styleKey}`} name={`carousel.style.${styleKey}`} register={register(`carousel.style.${styleKey}`)} />
          ))}

          <TextInputForm label="Footer" name={'footer'} register={register('footer')} />

          <div className={styles.saveButtonContainer}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>PageJSON</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </div>
  );
}

export default EventDetail;
