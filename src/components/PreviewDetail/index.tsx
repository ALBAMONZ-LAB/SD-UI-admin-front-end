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
} from '@sd-ui-admin/components';

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
  children?: ComponentData[];
  text?: string;
  contents?: {
    text?: string;
    src?: string;
  };
  style?: Record<string, string>;
}

export const PreviewDetail = React.memo(function PreviewDetail() {
  const { control } = useFormContext<EventFormType>();
  const [eventTitle, pageJson] = useWatch({
    control,
    name: ['eventTitle', 'pageJson'],
  });

  return (
    <div>
      <h2>페이지 미리보기</h2>
      {eventTitle}
      <pre style={{ background: '#f4f4f4', padding: '10px', borderRadius: '8px' }}>
        {JSON.stringify(pageJson, null, 2)}
      </pre>
      <div>
        {/* {eventList.getEventPageComponents.components.map((item, index) => (
          <RenderComponent key={`${item.type}_${index}`} {...item} />
        ))} */}
      </div>
    </div>
  );
});

export default PreviewDetail;

const RenderComponent = (data: ComponentData) => {
  if (!data?.type) return null;

  const Component = MAPPED_COMPONENTS[data.type];
  if (!Component) return null;

  const props = {
    ...data,
    text: data.text || data.contents?.text || '',
    imageUrl: data.contents?.src || '',
  };

  return (
    <Component {...props}>
      {(data.children || []).map((child: ComponentData, index: number) => (
        <RenderComponent key={`${child.type}_${index}`} {...child} />
      ))}
    </Component>
  );
};
