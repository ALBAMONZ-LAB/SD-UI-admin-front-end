export interface ImageProps {
  imageUrl: string;
  backgroundColor?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  width?: string | number;
  display?: 'flex' | 'block' | 'inline-block';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  imageWidth?: string | number;
  height?: string | number;
  onClick?: () => void;
}

export const Image = ({
  imageUrl,
  backgroundColor,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  width,
  display,
  justifyContent,
  imageWidth,
  height,
}: ImageProps) => (
  <div
    style={{
      backgroundColor,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      height,
      display,
      justifyContent,
      boxSizing: 'border-box',
    }}
  >
    <img src={imageUrl} alt="example" style={{ width }} />
  </div>
);
