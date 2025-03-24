import { PageJson } from '@sd-ui-admin/types/event';

export interface EventDetailResponse {
  id: number;
  eventTitle: string;
  pageJson: PageJson;
  createdAt: string;
}
export interface EventRequest {
  eventTitle: string;
  pageJson: string;
}
