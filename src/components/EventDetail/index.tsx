'use client';

import { useEventPages } from '@sd-ui-admin/api/event/event.queries';

export interface EventDetailProps {
  id: number;
}

export function EventDetail({ id }: EventDetailProps) {
  const { data, loading: isLoading, error } = useEventPages(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>EventDetail</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default EventDetail;
