import classNames from "classnames";

import { DEFAULT_GUTTER } from "../const";
import styles from "./index.module.scss";

const MasonryColumn: React.FC<
  IProps & {
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
      className={classNames([styles.MasonryColumnWrap, className])}
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
