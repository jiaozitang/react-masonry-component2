declare interface IProps {
  direction?: "row" | "column"; // 排列方向
  sortWithHeight?: boolean; // 是否需要按高度排序
  useAbsolute?: boolean; // 是否开启绝对定位方法实现瀑布流，该模式默认开始按高度排序
  columnsCountBreakPoints?: {
    // 自适应的配置
    [props: number]: number;
  };
  children: React.ReactNode;
  className?: string;
  style?: Record<string, any>;
  gutter?: number;
}
