import { UseFormRegisterReturn } from 'react-hook-form';

export type StyleType = 'padding' | 'margin' | 'background' | 'fontSize' | 'border' | 'borderRadius' | 'color';
export type PageJsonBodyItemType = 'image' | 'button' | 'carousel' | 'footer';
export type StyleConfig = Record<StyleType, string>;
export type FormStyleRegisterType = `pageJson.body.${number}.style`;
export type FormContentsRegisterNameType = `pageJson.body.${number}.contents.${string}`;
export type StyleFormRegisterFieldType = Record<FormStyleRegisterType, UseFormRegisterReturn>;
export type ShowStyleFieldsType = Record<PageJsonBodyItemType, boolean>;

export interface IconType {
  iconName: string;
  size: number;
}

export interface PageJsonContentsItem {
  src?: string | string[];
  text?: string;
  icon?: IconType;

  [key: string]: unknown;
}

export interface PageBodyType  {
  fieldType: PageJsonBodyItemType;
  orderNo: number;
  contents: PageJsonContentsItem;
  style: StyleConfig;
}

export interface PageJson {
  header: string;
  body?: PageBodyType[];
  footer: Omit<PageBodyType,'orderNo'>;
}



export interface EventFormType {
  eventTitle: string;
  pageJson: PageJson;
}
