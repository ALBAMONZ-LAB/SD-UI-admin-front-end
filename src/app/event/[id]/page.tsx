import { notFound } from 'next/navigation';
import ContentLayout from '@sd-ui-admin/layout/ContentLayout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getEventDetailPage } from '@sd-ui-admin/api/event/event.api';
import EventDetailPageClient from "@sd-ui-admin/app/event/[id]/client";

interface EventDetailPageProps {
  params?: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = Number((await params)?.id);

  if (!eventId || isNaN(eventId)) {
    return notFound();
  }
  const queryClient = new QueryClient();
  // 서버에서 prefetch
  await queryClient.fetchQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEventDetailPage(eventId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ContentLayout title={'이벤트 상세'}>
      <HydrationBoundary state={dehydratedState}>
        <EventDetailPageClient eventId={eventId}/>
      </HydrationBoundary>
    </ContentLayout>
  );
}
