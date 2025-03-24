import { EventDetailResponse, EventRequest } from '@sd-ui-admin/types';
import { axiosInstance } from '../axiosInstance';
// import { GET_EVENT_DETAIL_PAGE } from "@sd-ui-admin/api/event/event.queries";

// export async function getEventPages() {
//   return graphqlFetcher<{ eventPages: any[] }>(GET_EVENT_DETAIL_PAGE);
// }

export const getEventDetailPage = async (eventId: number): Promise<EventDetailResponse> => {
  const { data } = await axiosInstance.get(`/event-pages/${eventId}`);
  return data;
};

export const postEventPage = async (body: EventRequest) => {
  const { data } = await axiosInstance.post('/event-pages', body);
  return data;
};

export const patchEventPage = async (eventId: number, body: EventRequest) => {
  const { data } = await axiosInstance.patch(`/event-pages/${eventId}`, body);
  return data;
};
