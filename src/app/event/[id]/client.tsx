'use client';

import { useGetEventPage, usePatchEventPage } from '@sd-ui-admin/api/event/event.queries';
import { EventRequest } from '@sd-ui-admin/types';
import { EventFormTemplate } from '@sd-ui-templates';

interface EventDetailPageClientProps {
  eventId: number;
}

export function EventDetailPageClient({ eventId }: EventDetailPageClientProps) {
  const { data } = useGetEventPage(eventId, { suspense: true });
  const { mutate } = usePatchEventPage();
  const handleSubmit = (data: EventRequest) => {
    mutate({ eventId, body: data });
  };
  return <EventFormTemplate data={data} ouMutate={handleSubmit} />;
}

export default EventDetailPageClient;
