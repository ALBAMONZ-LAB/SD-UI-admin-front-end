export interface FloatingButtonProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  width?: string | number;
  height?: string | number;
  bottom?: string | number;
  fontSize?: string | number;
  fontWeight?: string | number;
}

export const FloatingButton = ({
  text,
  backgroundColor,
  textColor,
  width,
  height,
  bottom,
  fontSize,
  fontWeight,
}: FloatingButtonProps) => (
  <button
    style={{
      position: 'fixed',
      bottom,
      backgroundColor,
      color: textColor,
      border: 'none',
      width,
      height,
      fontSize,
      fontWeight,
      zIndex: 1000,
      borderRadius: 10,
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: 350,
      boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)',
    }}
    aria-disabled
  >
    {text}
  </button>
);
