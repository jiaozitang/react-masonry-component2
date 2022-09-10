import "./index.scss";

import classNames from "classnames";
import React from "react";

import { DEFAULT_GUTTER } from "../const";
import { MasonryProps } from "../masonry";
import { getColumns, getColumnsSortWithHeight } from "./utils";

const MasonryFlex: React.FC<
  MasonryProps & {
    columnCount: number;
  }
> = (props) => {
  const {
    children,
    columnCount,
    className,
    style,
    gutter = DEFAULT_GUTTER,
    sortWithHeight,
  } = props;

  return (
    <div
      className={classNames(["masonry-flex-wrap", className])}
      style={{
        gap: gutter,
        ...style,
      }}
    >
      {(sortWithHeight
        ? getColumnsSortWithHeight(children, columnCount)
        : getColumns(children, columnCount)
      ).map((column, i) => (
        <div
          className="masonry-flex-wrap-column"
          key={i}
          style={{
            gap: gutter,
          }}
        >
          {column.children.map((item) => item)}
        </div>
      ))}
    </div>
  );
};

export default MasonryFlex;
