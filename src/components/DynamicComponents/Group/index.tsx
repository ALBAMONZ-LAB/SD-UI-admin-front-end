export interface GroupProps {
  backgroundColor?: string;
  width?: string | number;
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
  display?: 'flex' | 'block' | 'inline-block';
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'space-between' | 'space-around' | 'flex-end';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  gap?: string | number;
  children?: React.ReactNode;
}

export const Group = ({
  backgroundColor,
  width,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  display,
  direction,
  justifyContent,
  alignItems,
  gap,
  children,
}: GroupProps) => {
  return (
    <div
      style={{
        backgroundColor,
        width,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        display,
        flexDirection: direction,
        justifyContent,
        alignItems,
        gap,
      }}
    >
      {children}
    </div>
  );
};
