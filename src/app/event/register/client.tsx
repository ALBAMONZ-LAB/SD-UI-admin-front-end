'use client';

import { usePostEventPage } from '@sd-ui-admin/api/event/event.queries';
import { EventRequest } from '@sd-ui-admin/types';
import { useRouter } from 'next/navigation';
import { EventFormTemplate } from '@sd-ui-templates';

export function EventRegisterClient() {
  const router = useRouter();
  const { mutate } = usePostEventPage();
  const handleSubmit = (data: EventRequest) => {
    mutate(data, {
      onSuccess() {
        router.push('/event');
      },
    });
  };
  return <EventFormTemplate ouMutate={handleSubmit} />;
}

export default EventRegisterClient;
