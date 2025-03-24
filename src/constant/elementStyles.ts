import { PageBodyType, PageJsonBodyItemType, StyleConfig } from '@sd-ui-admin/types';

export const DEFAULT_BUTTON_STYLE: StyleConfig = {
  padding: '10px',
  margin: '0',
  background: '#f10b',
  width: '100%',
  height: '48px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'block',
};

export const DEFAULT_IMAGE_STYLE: StyleConfig = {
  padding: '0',
  margin: '0',
  background: 'transparent',
  width: '100%',
  height: 'auto',
  fontSize: '0',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
  display: 'block',
};
export const DEFAULT_CAROUSEL_STYLE: StyleConfig = {
  padding: '0',
  margin: '0',
  background: 'transparent',
  width: '100%',
  height: 'auto',
  fontSize: '0',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
  display: 'inline-block',
};

export const DEFAULT_FOOTER_STYLE: StyleConfig = {
  padding: '0',
  margin: '0',
  background: '#eee',
  width: '100%',
  height: 'auto',
  fontSize: '16px',
  border: 'none',
  borderRadius: '0',
  color: '#ffffff',
  display: 'block',
};

export const DEFAULT_SECTION_STYLE: Partial<StyleConfig> = {
  padding: '0',
  margin: '0',
  background: 'transparent',
  display: 'block',
};

export const DEFAULT_STYLE: StyleConfig = {
  padding: '',
  margin: '',
  background: '',
  width: '',
  height: '',
  fontSize: '',
  border: '',
  borderRadius: '',
  color: '',
  display: '',
};
export const ADD_DEFAULT_BODY_DATA: Record<PageJsonBodyItemType, Omit<PageBodyType, 'orderNo'>> = {
  image: {
    contents: { src: '/images/events/tvcEvent/', style: DEFAULT_IMAGE_STYLE },
    sectionStyle: DEFAULT_SECTION_STYLE,
    sectionType: 'image',
  },
  button: {
    contents: { text: '', style: DEFAULT_BUTTON_STYLE },
    sectionStyle: DEFAULT_SECTION_STYLE,
    sectionType: 'button',
  },
  carousel: {
    contents: { src: '', style: DEFAULT_CAROUSEL_STYLE },
    sectionStyle: DEFAULT_SECTION_STYLE,
    sectionType: 'carousel',
  },
};

export const FORM_FIELD_TITLE = {
  image: '이미지(Image)',
  button: '버튼(Button)',
  carousel: '캐러셀(Carousel)',
} as const;
