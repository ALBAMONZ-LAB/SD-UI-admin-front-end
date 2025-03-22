import Link from 'next/link';
import ContentLayout from '@sd-ui-admin/layout/ContentLayout';

interface EventPage {
  id: number;
  eventTitle: string;
}

export default async function Event() {
  // pagination 목록으로 바꿔야함
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${baseUrl}/event-pages/all`, { cache: 'no-store' });
  const events = await res.json();

  return (
    <ContentLayout title={'이벤트 목록'}>
      <ul>
        {events.map((event: EventPage) => (
          <li key={event.id}>
            <Link href={`/event/${event.id}`}>{event.eventTitle}</Link>
          </li>
        ))}
      </ul>
    </ContentLayout>
  );
}
