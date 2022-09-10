import { DEFAULT_COLUMNS_COUNT_POINTS, MasonryDirection } from "./const";
import { useColumnCount } from "./hooks";
import MasonryAbsolute from "./MasonryAbsolute/index";
import MasonryColumn from "./MasonryColumn";
import MasonryFlex from "./MasonryFlex";

const Masonry: React.FC<IProps> = (props) => {
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
