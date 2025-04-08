import { PageJson } from '@sd-ui-admin/types/event';

export interface EventDetailResponse {
  id: number;
  eventTitle: string;
  eventRoute: string;
  pageJson: PageJson;
  isPublished: boolean;
  eventStartDate: string;
  eventEndDate: string;
  createdAt: string;
}
export interface EventRequest {
  eventTitle: string;
  eventRoute: string;
  pageJson: string;
  isPublished: boolean;
  eventStartDate: string;
  eventEndDate: string;
}
