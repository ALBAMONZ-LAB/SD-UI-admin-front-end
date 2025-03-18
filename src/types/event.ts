export interface StyleConfig {
  padding: string;
  margin: string;
  background: string;
  fontsize: string;
  border: string;
  borderRadius: string;
  color: string;
}

export interface ImageConfig {
  src: string;
  style: StyleConfig;
}

export interface IconType {
  iconName: string;
  size: number;
}

export interface ButtonConfig {
  text: string;
  icon?: IconType;
  style: StyleConfig;
}

export interface CarouselConfig {
  src: string[];
  style: StyleConfig;
}

export interface PageJson {
  header: string;
  image?: ImageConfig;
  button?: ButtonConfig;
  carousel?: CarouselConfig;
  footer: string;
  description?: string;
}

export interface EventDetailResponse {
  id: number;
  eventId: number;
  eventTitle: string;
  pageJson: PageJson;
  createdAt: string;
}

export interface EventDetailRequest extends PageJson {
  eventTitle: string;
}