import classNames from "classnames";
import React, { useRef } from "react";

import { DEFAULT_GUTTER } from "../const";
import styles from "./index.module.scss";
import { getListAndHeight } from "./utils";

const MasonryAbsolute: React.FC<
  IProps & {
    columnCount: number;
  }
> = (props) => {
  const {
    children,
    className,
    style,
    gutter = DEFAULT_GUTTER,
    columnCount,
  } = props;
  const ref = useRef(null);

  console.log("您已开启按高度排序，请为每个子元素传 height 参数");

  const { list, height } = getListAndHeight({
    children,
    columnCount,
    wrapRef: ref,
    gutter,
  });
  return (
    <div
      className={classNames([styles.MasonryAbsoluteWrap, className])}
      style={{
        gap: gutter,
        height,
        ...style,
      }}
      ref={ref}
    >
      {list.map((i, index) => {
        console.log(i);
        return (
          <div
            className={styles.MasonryAbsoluteItem}
            key={index}
            style={i.style}
          >
            {i.node}
          </div>
        );
      })}
    </div>
  );
};

export default MasonryAbsolute;
