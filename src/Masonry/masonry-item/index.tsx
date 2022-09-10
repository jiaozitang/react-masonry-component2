import React from "react";

export const MasonryItem: React.FC<{
  height: number;
  children: React.ReactNode;
}> = (props) => {
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
