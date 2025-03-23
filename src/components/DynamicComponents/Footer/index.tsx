export interface FooterProps {
  text?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string | number;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right';
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  children?: React.ReactNode;
}

export const Footer = ({
  text,
  backgroundColor,
  color,
  fontSize,
  fontWeight,
  textAlign,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  children,
}: FooterProps) => (
  <footer
    style={{
      backgroundColor,
      color,
      fontSize,
      fontWeight,
      textAlign,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }}
  >
    {text}
    <div>{children}</div>
  </footer>
);
