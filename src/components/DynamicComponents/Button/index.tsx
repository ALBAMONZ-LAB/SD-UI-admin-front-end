import { PageJsonContentsItem } from '@sd-ui-admin/types';

export interface ButtonProps {
  contents: PageJsonContentsItem;
  sectionStyle?: React.CSSProperties;
}

export const Button = ({ contents, sectionStyle }: ButtonProps) => {
  return (
    contents?.text && (
      <div style={{ ...sectionStyle }}>
        <button style={contents.style} aria-disabled>
          {contents.text}
        </button>
      </div>
    )
  );
};
