import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface FloatingButtonProps {
  contents: PageJsonContentsItem;
  sectionStyle?: React.CSSProperties;
}

export const FloatingButton = ({ contents, sectionStyle }: FloatingButtonProps) => {
  return (
    contents?.text && (
      <button style={contents.style} aria-disabled>
        {contents.text}
      </button>
    )
  );
};
