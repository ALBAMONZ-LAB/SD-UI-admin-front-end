export interface ButtonProps {
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  color?: string;
  text: string;
  backgroundColor?: string;
  buttonColor?: string;
  borderRadius?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  borderWidth?: string | number;
}

export const Button = ({
  width,
  height,
  color,
  text,
  backgroundColor,
  buttonColor,
  borderRadius,
  paddingLeft,
  paddingRight,
  paddingBottom,
  borderWidth,
}: ButtonProps) => (
  <div
    style={{
      width: '100%',
      margin: '0 auto',
      textAlign: 'center',
      paddingLeft,
      paddingRight,
      paddingBottom,
      boxSizing: 'border-box',
      backgroundColor,
      borderWidth,
    }}
  >
    <button
      style={{
        width,
        height,
        color,
        backgroundColor: buttonColor,
        borderRadius,
        border: 0,
        borderWidth,
      }}
      aria-disabled
    >
      {text}
    </button>
  </div>
);
