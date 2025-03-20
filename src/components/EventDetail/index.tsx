// 'use client';
//
// import { useGetEventPage } from '@sd-ui-admin/api/event/event.queries';
// import {
//   EventRequest,
//   PageJsonStyleKeys,
//   ShowStyleFieldsType,
//   StyleFormRegisterFieldType,
//   StyleType,
// } from "@sd-ui-admin/types";
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as styles from './index.css';
// import { EventFormSection, TextInputForm } from '@sd-ui-admin/components';
// import { DEFAULT_STYLE } from '@sd-ui-admin/constant';
//
// export interface EventDetailProps {
//   id: number;
// }
//
// export function EventDetail({ id }: EventDetailProps) {
//   const { data, isLoading, isError, error } = useGetEventPage(id);
//   const [showStyleFields, setShowStyleFields] = useState<ShowStyleFieldsType>({
//     image: false,
//     button: false,
//     carousel: false,
//     footer: false,
//   });
//   const [formDataState, setFormDataState] = useState<EventRequest>();
//
//   const { register, handleSubmit, setValue } = useForm<EventRequest>({
//     mode: 'onBlur',
//     defaultValues: {
//       eventTitle: '',
//       header: '',
//       button: {},
//       carousel: {},
//       footer: {},
//       description: '',
//     },
//   });
//
//   useEffect(() => {
//     if (data) {
//       // setValue('header', data.pageJson.header);
//       // setValue('image', data.pageJson.image || defaultImage);
//       // setValue('button', data.pageJson.button || defaultButton);
//       // setValue('carousel', data.pageJson.carousel || defaultCarousel);
//       // setValue('footer', data.pageJson.footer);
//       // setValue('description', data.pageJson.description);
//       // setValue('eventTitle', data.eventTitle);
//     }
//   }, [data, setValue]);
//   const toggleStyleFields = (field: PageJsonStyleKeys) => {
//     setShowStyleFields(prev => ({ ...prev, [field]: !prev[field] }));
//   };
//
//   const onSubmit = (formData: EventRequest) => {
//     setFormDataState(formData);
//     console.log('Updated Event (JSON format):', JSON.stringify(formData, null, 2));
//   };
//
//   const handleStyleFields = (fieldPrefix: PageJsonStyleKeys) => {
//     return Object.keys(DEFAULT_STYLE).reduce((acc, styleKey) => {
//       acc[styleKey as PageJsonStyleKeys] = register(`${fieldPrefix}.style.${styleKey as StyleType}`);
//       return acc;
//     }, {} as StyleFormRegisterFieldType);
//   };
//
//   if (isLoading || !data) {
//     return <p>Loading...</p>;
//   }
//
//   if (isError) {
//     return <p>Error: {error.message}</p>;
//   }
//
//   return (
//     <div className={styles.container}>
//       <section className={styles.section}>
//         <h2>Event Detail Form</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className={styles.readOnlyFields}>
//             <p>Event ID: {data?.eventId}</p>
//             <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
//             <p>Description: {data?.pageJson.description}</p>
//           </div>
//           <TextInputForm label="이벤트 제목" name={'eventTitle'} register={register('eventTitle')} />
//           <TextInputForm label="설명" name={'description'} register={register('description')} />
//           <TextInputForm label="헤더(Header)" name={'header'} register={register('header')} />
//
//           <div className={styles.saveButtonContainer}>
//             <button type="submit">Save Changes</button>
//           </div>
//         </form>
//       </section>
//
//       <section className={styles.section}>
//         <h2>PageJSON</h2>
//         <pre>{JSON.stringify(formDataState, null, 2)}</pre>
//       </section>
//     </div>
//   );
// }
//
// export default EventDetail;
