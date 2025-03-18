import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getEventDetailPage } from '@sd-ui-admin/api/event/event.api';
import { EventDetailResponse } from '@sd-ui-admin/types';

// export const GET_EVENT_DETAIL_PAGE = gql`
//   query GetEventPageComponents($eventId: Float!) {
//     getEventPageComponents(eventId: $eventId) {
//       id
//       eventId
//       pageJson
//       createdAt
//     }
//   }
// `;
// export function useEventPages(eventId: number) {
//   return useQuery<any>(GET_EVENT_DETAIL_PAGE, {
//     variables: { eventId },
//     skip: !eventId,
//   });
// }

export const useGetEventPage = (eventId: number): UseQueryResult<EventDetailResponse,any> => {
  return useQuery({ queryKey: ['event', eventId], queryFn: () => getEventDetailPage(eventId) });
};
