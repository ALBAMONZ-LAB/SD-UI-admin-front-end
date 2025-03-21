import { EventFormType } from '@sd-ui-admin/types';
import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventFormType>();
  const [eventTitle, eventId, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson', 'eventId'],
  });

  return <>{eventTitle}</>;
});

export default PreviewDetail;
