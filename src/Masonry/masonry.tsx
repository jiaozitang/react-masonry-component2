import React from "react";

import { DEFAULT_COLUMNS_COUNT_POINTS, MasonryDirection } from "./const";
import { useColumnCount } from "./hooks";
import MasonryAbsolute from "./masonry-absolute";
import MasonryColumn from "./masonry-column";
import MasonryFlex from "./masonry-flex";

export interface MasonryProps extends React.HTMLAttributes<HTMLElement> {
  /* 排列方向 */
  direction?: "row" | "column";
  /* 是否需要按高度排序 */
  sortWithHeight?: boolean;
  /* 是否开启绝对定位方法实现瀑布流，该模式默认开始按高度排序 */
  useAbsolute?: boolean;
  /* 自适应的配置 */
  columnsCountBreakPoints?: {
    [props: number]: number;
  };
  children?: React.ReactNode;
  className?: string;
  style?: Record<string, any>;
  /* 间距 */
  gutter?: number;
}

const Masonry: React.FC<MasonryProps> = (props) => {
  const {
    direction = MasonryDirection.row,
    columnsCountBreakPoints = DEFAULT_COLUMNS_COUNT_POINTS,
    useAbsolute,
  } = props;
  const columnCount = useColumnCount(columnsCountBreakPoints);

  if (useAbsolute) {
    return <MasonryAbsolute {...props} columnCount={columnCount} />;
  }
  if (direction === MasonryDirection.column) {
    return <MasonryColumn {...props} columnCount={columnCount} />;
  }
  if (direction === MasonryDirection.row) {
    return <MasonryFlex {...props} columnCount={columnCount} />;
  }
  return <div></div>;
};

export default Masonry;
