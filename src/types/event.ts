export interface PageJson {
  title: string;
  header: string;
  image: string;
  button: string;
  carousel: string;
  footer: string;
  description: string;
}
export interface EventDetailResponse {
  id: number;
  eventId: number;
  eventTitle: string;
  pageJson: PageJson;
  createdAt: string;
}