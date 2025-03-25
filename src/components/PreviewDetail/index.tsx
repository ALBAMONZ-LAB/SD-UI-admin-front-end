import { EventFormType, PageJsonContentsItem, StyleConfig } from '@sd-ui-admin/types';
import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';
import {
  Header,
  ImageWithChildren,
  Image,
  Group,
  Button,
  Carousel,
  CarouselProps,
  FloatingButton,
  Footer,
  HeaderProps,
  ImageProps,
  FooterProps,
  ButtonProps,
  FloatingButtonProps,
} from '@sd-ui-admin/components/DynamicComponents';

interface PreviewDetailProps {
  eventBackground?: string;
}

// event title... ?
const MAPPED_COMPONENTS = {
  HEADER: Header,
  // IMAGE_WITH_CHILDREN: ImageWithChildren,
  // GROUP: Group,
  IMAGE: Image,
  BUTTON: Button,
  CAROUSEL: Carousel,
  FLOATINGBUTTON: FloatingButton,
  FOOTER: Footer,
};

type ComponentPropsMap = {
  HEADER: HeaderProps;
  IMAGE: ImageProps;
  BUTTON: ButtonProps;
  CAROUSEL: CarouselProps;
  FLOATINGBUTTON: FloatingButtonProps;
  FOOTER: FooterProps;
};

interface ComponentData {
  type: keyof typeof MAPPED_COMPONENTS;
  orderNo: number;
  children?: ComponentData[];
  contents: PageJsonContentsItem;
  sectionStyle: Partial<StyleConfig>;
}

//  TODO type 맞추기
const fieldTypeToComponentType = (sectionType: string): keyof typeof MAPPED_COMPONENTS => {
  return sectionType.toUpperCase() as keyof typeof MAPPED_COMPONENTS;
};

export const PreviewDetail = React.memo(function PreviewDetail({ eventBackground }: PreviewDetailProps) {
  const { control } = useFormContext<EventFormType>();
  const [eventTitle, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson'],
  });

  const { header, body, footer } = pageJson;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '360px',
        margin: 'auto',
      }}
    >
      <h2>페이지 미리보기</h2>
      {eventTitle}
      {/*<pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>*/}
      {/*  {JSON.stringify(pageJson, null, 2)}*/}
      {/*</pre>*/}
      <div
        style={{
          width: '360px',
        }}
      >
        {/*<h3 style={{ margin: '0', padding: '20px', background: '#ffffff' }}>{pageJson.header}</h3>*/}
        {header && <header>{/*<RenderComponent type={fieldTypeToComponentType('header')} text={header} />*/}</header>}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: eventBackground }}>
          {Array.isArray(body) && body.length > 0 ? (
            body
              .filter(item => item.sectionType !== 'floatingButton')
              .map((item, index) => (
                <section key={`${item.sectionType}_${index}`} style={item.sectionStyle}>
                  <RenderComponent {...item} type={fieldTypeToComponentType(item.sectionType)} />
                </section>
              ))
          ) : (
            <p>Empty body...</p>
          )}
        </div>
      </div>
      {/*임시로 플로팅 영역 만들어 놨습니다.*/}
      {Array.isArray(body) &&
        body.length > 0 &&
        body
          .filter(item => item.sectionType === 'floatingButton')
          .map((item, index) => (
            <section
              key={`${item.sectionType}_${index}`}
              style={{ ...item.sectionStyle, position: 'absolute', width: '360px' }}
            >
              <RenderComponent {...item} type={fieldTypeToComponentType(item.sectionType)} />
            </section>
          ))}
    </div>
  );
});

export default PreviewDetail;

const RenderComponent = ({ type, orderNo, children, ...data }: ComponentData) => {
  if (!type) return null;

  const Component = MAPPED_COMPONENTS[type];
  if (!Component) return null;

  const props = getComponentProps({ type, orderNo, ...data });

  return (
    <Component {...props}>
      {(children || []).map((child: ComponentData, index: number) => (
        <RenderComponent key={`${child.type}_${index}`} {...child} />
      ))}
    </Component>
  );
};

const getComponentProps = (data: ComponentData) => {
  const common = {
    sectionStyle: data.sectionStyle,
    orderNo: data.orderNo,
    contents: {
      text: data.contents?.text || '',
      src: data.contents?.src || '',
      style: data.contents?.style,
    },
    items: [],
  };
  switch (data.type) {
    case 'CAROUSEL':
      // TODO 이거 타입.. 이대로 할건지.. 여쭤보기 ..
      return {
        ...common,
        items: data.contents?.src ? data.contents.src.split(',').map(url => url.trim()) : [],
      };
    case 'BUTTON':
      return {
        ...common,
        text: data.contents?.text,
      };
    case 'IMAGE':
      return {
        ...common,
        src: data.contents?.src || '',
      };
    case 'FLOATINGBUTTON':
      return {
        ...common,
        src: data.contents?.text || '',
      };
    default:
      return common;
  }
};
