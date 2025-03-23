import { notFound } from 'next/navigation';
import Link from 'next/link';
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
      <Link href={`/event/register/${eventId}`}>수정하기</Link>
      <div>/event/register 등록페이지 작업 후 작업예정</div>
    </ContentLayout>
  );
}
