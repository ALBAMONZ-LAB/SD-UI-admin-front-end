import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import { getEventDetailPage, patchEventPage, postEventPage } from '@sd-ui-admin/api/event/event.api';
import { EventDetailResponse, EventRequest } from '@sd-ui-admin/types';

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

export const useGetEventPage = (eventId: number, options = {}): UseQueryResult<EventDetailResponse, any> => {
  return useQuery({ queryKey: ['event', eventId], queryFn: () => getEventDetailPage(eventId), ...options });
};

export const usePostEventPage = (): UseMutationResult<any, any, EventRequest, unknown> => {
  return useMutation({
    mutationFn: (body: EventRequest) => postEventPage(body),
    onSuccess: () => {
      alert('이벤트 등록에 성공 하였습니다.');
    },
    onError: error => {
      alert(`Failed to post event page: ${error.message}`);
    },
  });
};

export const usePatchEventPage = (): UseMutationResult<any, any, { eventId: number; body: EventRequest }, unknown> => {
  return useMutation({
    mutationFn: ({ eventId, body }) => patchEventPage(eventId, body),
    onSuccess: () => {
      alert('이벤트 수정에 성공 하였습니다.');
    },
    onError: error => {
      alert(`Failed to post event page: ${error.message}`);
    },
  });
};
