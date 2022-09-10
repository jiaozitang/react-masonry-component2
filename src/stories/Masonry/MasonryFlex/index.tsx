import classNames from "classnames";
import React from "react";

import { DEFAULT_GUTTER } from "../const";
import styles from "./index.module.scss";
import { getColumns, getColumnsSortWithHeight } from "./utils";

const MasonryFlex: React.FC<
  IProps & {
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

  if (sortWithHeight) {
    console.log("您已开启按高度排序，请为每个子元素传 height 参数");
  }

  return (
    <div
      className={classNames([styles.MasonryFlexWrap, className])}
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
          className={styles.column}
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
