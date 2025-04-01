import {
  Button,
  Carousel,
  CustomizedComponent,
  FloatingButton,
  Footer,
  Header,
  Image,
} from '@sd-ui-admin/components/DynamicComponents';
import { EventFormType, PageJsonContentsItem, StyleConfig } from '@sd-ui-admin/types';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface PreviewDetailProps {
  eventBackground?: string;
}

const MAPPED_COMPONENTS = {
  HEADER: Header,
  IMAGE: Image,
  BUTTON: Button,
  CAROUSEL: Carousel,
  FLOATINGBUTTON: FloatingButton,
  FOOTER: Footer,
  CUSTOM: CustomizedComponent,
};

interface ComponentData {
  type: keyof typeof MAPPED_COMPONENTS;
  orderNo?: number;
  children?: ComponentData[];
  contents: Partial<PageJsonContentsItem>;
  sectionStyle?: Partial<StyleConfig>;
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
          position: 'relative',
        }}
      >
        {header && (
          <header>
            <RenderComponent type={fieldTypeToComponentType('header')} contents={{ text: header }} />
          </header>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: eventBackground,
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maxHeight: '750px',
          }}
        >
          {Array.isArray(body) && body.length > 0 ? (
            body
              .filter(item => item.sectionType !== 'floatingButton')
              .map((item, index) => (
                <section
                  key={`${item.sectionType}_${index}`}
                  style={{
                    ...item.sectionStyle,
                    ...(item.sectionType === 'floatingButton' && { position: 'absolute', width: '360px' }),
                  }}
                >
                  <RenderComponent {...item} type={fieldTypeToComponentType(item.sectionType)} />
                </section>
              ))
          ) : (
            <p>Empty body...</p>
          )}
        </div>
        {Array.isArray(body) &&
          body.length > 0 &&
          body.some(item => item.sectionType === 'floatingButton') &&
          body
            .filter(item => item.sectionType === 'floatingButton')
            .map((item, index) => (
              <section
                key={`${item.sectionType}_${index}`}
                style={{
                  ...item.sectionStyle,
                  position: 'absolute',
                  width: '360px',
                }}
              >
                <RenderComponent {...item} type={fieldTypeToComponentType(item.sectionType)} />
              </section>
            ))}
      </div>
      {/* TODO footer type 이상해요.. src있어요 */}
      {footer && <RenderComponent type={fieldTypeToComponentType('footer')} contents={{ ...footer.contents }} />}
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
  const defaultStyle: StyleConfig = {
    padding: '',
    margin: '',
    background: '',
    width: '',
    height: '',
    color: '',
    fontSize: '',
    fontWeight: '',
    textAlign: 'left',
    lineHeight: '',
    border: '',
    borderRadius: '',
    display: '',
  };

  const common = {
    sectionStyle: data.sectionStyle,
    orderNo: data.orderNo,
    contents: {
      text: data.contents?.text || '',
      src: data.contents?.src || '',
      style: data.contents?.style || defaultStyle,
    },
    items: [],
  };
  switch (data.type) {
    case 'CAROUSEL':
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
