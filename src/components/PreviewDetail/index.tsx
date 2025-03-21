import { EventRequest } from '@sd-ui-admin/types';
import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventRequest>();
  const [eventTitle, description, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson', 'description'],
  });

  return <>{eventTitle}</>;
});

export default PreviewDetail;
