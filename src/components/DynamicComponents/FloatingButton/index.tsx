import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface FloatingButtonProps {
  contents: PageJsonContentsItem;
  sectionStyle?: React.CSSProperties;
}

export const FloatingButton = ({ contents, sectionStyle }: FloatingButtonProps) => {
  return (
    contents?.text && (
      <div style={{ ...sectionStyle, position: 'absolute', width: '360px' }}>
        <button style={contents.style} aria-disabled>
          {contents.text}
        </button>
      </div>
    )
  );
};
