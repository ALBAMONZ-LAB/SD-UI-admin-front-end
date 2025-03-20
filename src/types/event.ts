import { UseFormRegisterReturn } from 'react-hook-form';

export type StyleType = 'padding' | 'margin' | 'background' | 'fontSize' | 'border' | 'borderRadius' | 'color';
export type PageJsonStyleKeys = Exclude<
  {
    [K in keyof PageJson]: PageJson[K] extends string | undefined ? never : K;
  }[keyof PageJson],
  undefined
>;
export type StyleConfig = Record<StyleType, string>;
export type StyleFormRegisterFieldType = Record<PageJsonStyleKeys, UseFormRegisterReturn>;

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
