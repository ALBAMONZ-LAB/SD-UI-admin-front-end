import { EventDetail } from '@sd-ui-admin/components';
import { notFound } from 'next/navigation';

interface EventDetailPageProps {
  params?: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number((await params)?.id);

  if (!eventId || isNaN(eventId)) {
    return notFound();
  }

  return (
    <>
      <h1>디테일 페이지</h1>
      <EventDetail id={eventId} />
    </>
  );
}
