import { axiosInstance } from '../axiosInstance';
import { EventDetailResponse } from '@sd-ui-admin/types';
import { graphqlFetcher } from '@sd-ui-admin/api/graphqlFetcher';
// import { GET_EVENT_DETAIL_PAGE } from "@sd-ui-admin/api/event/event.queries";

// export async function getEventPages() {
//   return graphqlFetcher<{ eventPages: any[] }>(GET_EVENT_DETAIL_PAGE);
// }

export const getEventDetailPage = async (eventId: number) => {
  const { data } = await axiosInstance.get(`/event-pages/${eventId}`);
  return data;
};
