import { UseFormRegisterReturn } from 'react-hook-form';

export type StyleType = 'padding' | 'margin' | 'background' | 'fontSize' | 'border' | 'borderRadius' | 'color';
export type PageJsonStyleKeys = Exclude<
  {
    [K in keyof PageJson]: PageJson[K] extends string | undefined | number ? never : K;
  }[keyof PageJson],
  undefined
>;
export type StyleConfig = Record<StyleType, string>;
export type StyleFormRegisterArrayType =`${PageJsonStyleKeys}.${number}`;
export type StyleFormRegisterFieldType = Record<StyleFormRegisterArrayType, UseFormRegisterReturn>;
export type ShowStyleFieldsType = Record<PageJsonStyleKeys, boolean>;

export interface DefaultStyleConfig {
  orderNo: number;
  style: StyleConfig;
  fieldType: PageJsonStyleKeys;
}

export interface ImageConfig extends DefaultStyleConfig {
  src: string;
}

export interface IconType {
  iconName: string;
  size: number;
}

export interface ButtonConfig extends DefaultStyleConfig {
  text: string;
  icon?: IconType;
}

export interface CarouselConfig extends DefaultStyleConfig {
  src: string[];
}

export interface PageJson {
  header: string;
  image?: ImageConfig[];
  button?: ButtonConfig[];
  carousel?: CarouselConfig[];
  footer: ImageConfig[];
}

export interface EventDetailResponse {
  id: number;
  eventId: number;
  eventTitle: string;
  pageJson: PageJson;
  createdAt: string;
}

export interface EventRequest extends PageJson {
  eventTitle: string;
  description: string;
}
