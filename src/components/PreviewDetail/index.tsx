import { EventFormType, PageJsonContentsItem } from "@sd-ui-admin/types";
import { useFormContext, useWatch } from 'react-hook-form';
import React from 'react';
import {
  Title,
  ImageWithChildren,
  Image,
  Group,
  Button,
  Carousel,
  FloatingButton,
  Footer,
} from '@sd-ui-admin/components/DynamicComponents';

// header
// event title... ?
const MAPPED_COMPONENTS = {
  TITLE: Title,
  IMAGE_WITH_CHILDREN: ImageWithChildren,
  GROUP: Group,
  IMAGE: Image,
  BUTTON: Button,
  CAROUSEL: Carousel,
  FLOATING_BUTTON: FloatingButton,
  FOOTER: Footer,
};

interface ComponentData {
  type: keyof typeof MAPPED_COMPONENTS;
  orderNo: number;
  children?: ComponentData[];
  contents: PageJsonContentsItem;
  style?: Record<string, string>;
}

//  TODO type 맞추기
const fieldTypeToComponentType = (sectionType: string): keyof typeof MAPPED_COMPONENTS => {
  return sectionType.toUpperCase() as keyof typeof MAPPED_COMPONENTS;
};

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventFormType>();
  const [eventTitle, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson'],
  });

  const body = pageJson?.body || [];

  return (
    <div
      // TODO width 논의 필요
      style={{
        maxWidth: '600px',
      }}
    >
      <h2>페이지 미리보기</h2>
      {eventTitle}
      {/* <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
        {JSON.stringify(pageJson, null, 2)}
      </pre> */}
      <div>
        {Array.isArray(body) && body.length > 0 ? (
          body.map((item, index) => (
            <RenderComponent
              key={`${item.sectionType}_${index}`}
              {...item}
              type={fieldTypeToComponentType(item.sectionType)}
            />
          ))
        ) : (
          <p>Empty here...</p>
        )}
      </div>
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
    style: data.contents?.style,
    orderNo: data.orderNo,
    contents: {
      text: data.contents?.text || '',
      src: data.contents?.src || '',
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
    default:
      return common;
  }
};
