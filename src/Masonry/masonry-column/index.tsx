import "./index.scss";

import classNames from "classnames";
import React from "react";

import { DEFAULT_GUTTER } from "../const";
import { MasonryProps } from "../masonry";

const MasonryColumn: React.FC<
  MasonryProps & {
    columnCount: number;
  }
> = (props) => {
  const {
    children,
    columnCount,
    className = "",
    style = {},
    gutter = DEFAULT_GUTTER,
  } = props;

  return (
    <div
      className={classNames(["masonry-column-wrap", className])}
      style={{
        ...style,
        columnGap: gutter,
        columnCount,
      }}
    >
      {children}
    </div>
  );
};

export default MasonryColumn;
