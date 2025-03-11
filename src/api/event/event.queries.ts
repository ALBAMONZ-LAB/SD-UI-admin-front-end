import { gql, useQuery } from '@apollo/client';

export const GET_EVENT_DETAIL_PAGE = gql`
  query GetEventPageComponents($eventId: Int!) {
    getEventPageComponents(eventId: $eventId) {
      id
      eventId
      pageJson
      createdAt
    }
  }
`;

export function useEventPages(eventId: number) {
  return useQuery(GET_EVENT_DETAIL_PAGE, {
    variables: { eventId },
    skip: !eventId,
  });
}
