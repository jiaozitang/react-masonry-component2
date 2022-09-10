export const MasonryItem: React.FC<
  IProps & {
    width?: number;
    height?: number;
    children: React.ReactNode;
  }
> = (props) => {
  const { children } = props;
  return <>{children}</>;
};

export const MasonryAbsoluteItem: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  return <>{children}</>;
};

export const MasonryFlexItem: React.FC<{
  height: number;
  children: React.ReactNode;
}> = (props) => {
  const { children } = props;
  return <>{children}</>;
};
