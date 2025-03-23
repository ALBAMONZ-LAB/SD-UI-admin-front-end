export interface ImageProps {
  src: string;
  style?: React.CSSProperties & {
    imageWidth?: string | number;
  };
}

export const Image = ({ src, style = {} }: ImageProps) => {
  return (
    <div style={{ ...style }}>
      {src && <img src={src} alt="example" style={{ width: style?.imageWidth || '100%' }} />}
    </div>
  );
};
