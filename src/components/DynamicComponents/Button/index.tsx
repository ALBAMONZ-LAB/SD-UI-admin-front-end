import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface ButtonProps {
  contents: PageJsonContentsItem;
  style?: React.CSSProperties;
}

export const Button = ({ contents, style }: ButtonProps) => {
  return (
    contents?.text && (
      <button style={contents.style} aria-disabled>
        {contents.text}
      </button>
    )
  );
};
