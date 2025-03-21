import { PageBodyType, PageJsonBodyItemType, StyleConfig } from '@sd-ui-admin/types';

export const DEFAULT_BUTTON_STYLE: StyleConfig = {
  padding: '10px',
  margin: '0',
  background: '#f10b',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
};

export const DEFAULT_IMAGE_STYLE: StyleConfig = {
  padding: '0',
  margin: '20px',
  background: 'transparent',
  fontSize: '0',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
};
export const DEFAULT_CAROUSEL_STYLE: StyleConfig = {
  padding: '0',
  margin: '20px',
  background: 'transparent',
  fontSize: '0',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
};

export const DEFAULT_FOOTER_STYLE: StyleConfig = {
  padding: '0',
  margin: '0',
  background: '#eee',
  fontSize: '16px',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
};

export const DEFAULT_STYLE: StyleConfig = {
  padding: '',
  margin: '',
  background: '',
  fontSize: '',
  border: '',
  borderRadius: '',
  color: '',
};
export const ADD_DEFAULT_BODY_DATA: Record<PageJsonBodyItemType, Omit<PageBodyType, 'orderNo'>> = {
  image: { contents: { src: '' }, style: DEFAULT_IMAGE_STYLE, fieldType: 'image' },
  button: { contents: { text: '', icon: undefined }, style: DEFAULT_BUTTON_STYLE, fieldType: 'button' },
  carousel: { contents: { src: [] }, style: DEFAULT_CAROUSEL_STYLE, fieldType: 'carousel' },
  footer: { contents: { src: [] }, style: DEFAULT_FOOTER_STYLE, fieldType: 'footer' },
};

export const FORM_FIELD_TITLE = {
  image: '이미지(Image)',
  button: '버튼(Button)',
  carousel: '캐러셀(Carousel)',
  footer: '푸터(Footer)',
} as const;
