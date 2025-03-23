import { EventFormType } from '@sd-ui-admin/types';
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
  text?: string;
  contents?: {
    text?: string;
    src?: string;
  };
  style?: Record<string, string>;
}

//  TODO type 맞추기
const fieldTypeToComponentType = (fieldType: string): keyof typeof MAPPED_COMPONENTS => {
  return fieldType.toUpperCase() as keyof typeof MAPPED_COMPONENTS;
};

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventFormType>();
  const [eventTitle, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson'],
  });

  const body = pageJson?.body || [];

  return (
    <div>
      <h2>페이지 미리보기</h2>
      {eventTitle}
      {/* <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
        {JSON.stringify(pageJson, null, 2)}
      </pre> */}
      <div>
        {Array.isArray(body) && body.length > 0 ? (
          body.map((item, index) => (
            <RenderComponent
              key={`${item.fieldType}_${index}`}
              {...item}
              type={fieldTypeToComponentType(item.fieldType)}
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

const RenderComponent = ({ type, style, orderNo, contents, children, ...data }: ComponentData) => {
  if (!type) return null;

  const Component = MAPPED_COMPONENTS[type];
  if (!Component) return null;

  const props = {
    ...data,
    text: '',
    src: contents?.src || '',
    style: style,
  };

  return (
    <Component {...props}>
      {(children || []).map((child: ComponentData, index: number) => (
        <RenderComponent key={`${child.type}_${index}`} {...child} />
      ))}
    </Component>
  );
};
