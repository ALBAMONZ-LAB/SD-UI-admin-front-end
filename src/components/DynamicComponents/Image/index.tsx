export interface ImageProps {
  contents: { src: string };
  style?: React.CSSProperties & {
    imageWidth?: string | number;
  };
}

export const Image = ({ contents, style = {} }: ImageProps) => {
  return (
    <div style={{ ...style }}>
      {contents.src && <img src={contents.src} alt="example" style={{ width: style?.imageWidth || '100%' }} />}
    </div>
  );
};
