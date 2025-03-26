import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface ButtonProps {
  contents: PageJsonContentsItem;
  sectionStyle?: React.CSSProperties;
}

export const Button = ({ contents }: ButtonProps) => {
  return (
    contents?.text && (
      <button style={contents.style} aria-disabled>
        {contents.text}
      </button>
    )
  );
};
