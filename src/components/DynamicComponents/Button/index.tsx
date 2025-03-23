export interface ButtonProps {
  contents: { text?: string };
  style?: React.CSSProperties;
}

export const Button = ({ contents, style }: ButtonProps) => {
  return (
    contents?.text && (
      <button style={{ ...style }} aria-disabled>
        {contents.text}
      </button>
    )
  );
};
