import "./index.scss";

import classNames from "classnames";
import React, { useRef } from "react";

import { MasonryProps } from "..";
import { DEFAULT_GUTTER } from "../const";
import { getListAndHeight } from "./utils";

const MasonryAbsolute: React.FC<
  MasonryProps & {
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

  const { list, height } = getListAndHeight({
    children,
    columnCount,
    wrapRef: ref,
    gutter,
  });
  return (
    <div
      className={classNames(["masonry-absolute-wrap ", className])}
      style={{
        gap: gutter,
        height,
        ...style,
      }}
      ref={ref}
    >
      {list.map((i, index) => {
        return (
          <div className={"masonry-absolute-item"} key={index} style={i.style}>
            {i.node}
          </div>
        );
      })}
    </div>
  );
};

export default MasonryAbsolute;
