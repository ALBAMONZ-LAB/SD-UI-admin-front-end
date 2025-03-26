import { PageBodyType, PageJsonBodyItemType, StyleConfig } from '@sd-ui-admin/types';

export const DEFAULT_BUTTON_STYLE: StyleConfig = {
  padding: '0',
  margin: '0',
  background: '#ff501b',
  width: '80%',
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
  fontSize: '12px',
  border: 'none',
  borderRadius: '0',
  color: '#6a6a6a',
  display: 'block',
};

export const DEFAULT_SECTION_STYLE: Partial<StyleConfig> = {
  padding: '0',
  margin: '0',
  width: '100%',
  background: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const DEFAULT_FIXED_SECTION_STYLE: Partial<StyleConfig> = {
  ...DEFAULT_SECTION_STYLE,
  position: 'fixed',
  bottom: '15px',
  zIndex: '1000',
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
    contents: {
      src: '/images/events/tvcEvent/swiper-1.png,/images/events/tvcEvent/swiper-2.png,/images/events/tvcEvent/swiper-3.png',
      style: DEFAULT_CAROUSEL_STYLE,
    },
    sectionStyle: DEFAULT_SECTION_STYLE,
    sectionType: 'carousel',
  },
  floatingButton: {
    contents: { text: '', style: DEFAULT_BUTTON_STYLE },
    sectionStyle: DEFAULT_FIXED_SECTION_STYLE,
    sectionType: 'floatingButton',
  },
  custom: {
    contents: { style: DEFAULT_STYLE },
    sectionStyle: DEFAULT_SECTION_STYLE,
    sectionType: 'custom',
  },
};

export const FORM_FIELD_TITLE: Record<PageJsonBodyItemType, string> = {
  image: '이미지(Image)',
  button: '버튼(Button)',
  carousel: '캐러셀(Carousel)',
  floatingButton: '플로팅 버튼(Floating Button)',
  custom: '커스텀(Custom)',
};
