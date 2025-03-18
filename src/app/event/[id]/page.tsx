import { EventDetail } from '@sd-ui-admin/components';
import { notFound } from 'next/navigation';
import ContentLayout from '@sd-ui-admin/layout/ContentLayout';

interface EventDetailPageProps {
  params?: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number((await params)?.id);

  if (!eventId || isNaN(eventId)) {
    return notFound();
  }

  return (
    <ContentLayout title={'이벤트 상세'}>
      <EventDetail id={eventId} />
    </ContentLayout>
  );
}
