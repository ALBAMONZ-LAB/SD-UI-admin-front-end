'use client';

import { useEventPages } from '@sd-ui-admin/api/event/event.queries';

export default function EventList() {
  const { data, loading: isLoading, error } = useEventPages(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Event List</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
