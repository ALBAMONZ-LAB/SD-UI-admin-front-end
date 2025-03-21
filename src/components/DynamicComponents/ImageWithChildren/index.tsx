export interface ImageWithChildrenProps {
  backgroundColor?: string;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  children?: React.ReactNode;
}

export const ImageWithChildren = ({
  backgroundColor,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  children,
}: ImageWithChildrenProps) => {
  return (
    <div
      style={{
        backgroundColor,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
      }}
    >
      <div>{children}</div>
    </div>
  );
};
