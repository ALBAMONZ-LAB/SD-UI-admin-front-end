import { EventDetailRequest } from '@sd-ui-admin/types';
import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventDetailRequest>();
  const [eventTitle, header, image, description] = useWatch({
    control,
    name: ['eventTitle', 'header', 'image', 'description'],
  });

  return <>{header}</>;
});

export default PreviewDetail;
