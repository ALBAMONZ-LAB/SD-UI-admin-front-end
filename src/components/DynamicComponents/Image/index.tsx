export interface ImageProps {
  contents: {
    src: string;
    style?: React.CSSProperties & {
      imageWidth?: string | number;
    };
  };
  sectionStyle?: React.CSSProperties;
}

export const Image = ({ contents, sectionStyle }: ImageProps) => {
  return (
    <>
      {contents.src && <img src={contents.src} alt="example" style={{ width: contents.style?.imageWidth || '100%' }} />}
    </>
  );
};
