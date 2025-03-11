// import { axiosInstance } from '../axiosInstance';
import { graphqlFetcher } from "@sd-ui-admin/api/graphqlFetcher";
import { GET_EVENT_DETAIL_PAGE } from "@sd-ui-admin/api/event/event.queries";

export async function getEventPages() {
  return graphqlFetcher<{ eventPages: any[] }>(GET_EVENT_DETAIL_PAGE);
}

// export const getEvent = async () => {
//   const { data } = await axiosInstance.get('/users');
//   return data;
// };
