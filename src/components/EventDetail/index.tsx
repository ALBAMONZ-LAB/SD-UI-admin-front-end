'use client'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetEventPage } from '@sd-ui-admin/api/event/event.queries';
import * as styles from './index.css';
import TextInputForm from '@sd-ui-admin/components/TextInputForm';
import { EventDetailResponse, EventDetailRequest } from '@sd-ui-admin/types';

export interface EventDetailProps {
  id: number;
}

export function EventDetail({ id }: EventDetailProps) {
  const { data, isLoading, isError, error } = useGetEventPage(id);

  // useForm에 제네릭 타입을 제대로 설정합니다.
  const { register, handleSubmit, setValue, getValues, watch } = useForm<EventDetailRequest>({
    mode: "onBlur",
    defaultValues: {
      eventTitle: '',
      header: '',
      image: '',
      button: '',
      carousel: '',
      footer: '',
      description: '',
    },
  });

  // data가 로드되었을 때 setValue로 폼 필드를 업데이트
  useEffect(() => {
    if (data) {
      setValue('header', data.pageJson.header );
      setValue('image', data.pageJson.image);
      setValue('button', data.pageJson.button);
      setValue('carousel', data.pageJson.carousel);
      setValue('footer', 'ss');
      setValue('description', data.pageJson.description);
      setValue('eventTitle', 'sdasd');
    }
  }, [data, setValue]);


  const onSubmit = (formData: EventDetailRequest) => {
    console.log('getValues:', watch());
    console.log('Updated Event:', formData);
    console.log(register);
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
          <TextInputForm label="Image" name={'image'} register={register('image')} />
          <TextInputForm label="Button" name={'button'} register={register('button')} />
          <TextInputForm label="Carousel" name={'carousel'} register={register('carousel')} />
          <TextInputForm label="Footer" name={'footer'} register={register('footer')} />

          <div className={styles.saveButtonContainer}>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </section>

      <section className={styles.section}>
        <h2>Preview</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </section>
    </div>
  );
}

export default EventDetail;
