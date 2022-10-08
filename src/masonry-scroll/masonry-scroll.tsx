import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import Masonry, { MasonryProps } from "../masonry/masonry";
import { MasonryItem } from "../masonry/masonry-item";

export interface MasonryScrollProps extends React.HTMLAttributes<HTMLElement> {
  /* 获取数据 */
  fetchApi: ({ page, pageSize }: { page: number; pageSize: number }) => Promise<
    {
      img: string;
      height: number;
      [props: string]: string | number;
    }[]
  >;
  /* MansonryProps */
  mansonryProps?: MasonryProps;
  /* 每页大小 */
  pageSize?: number;
  /* 是否需要预加载 */
  preload?: boolean;
  /* 检测可见范围的边距 */
  observerMargin?: number;
  /* 加载中 */
  loadingComponent?: React.ReactNode;
  /* 瀑布流子项 */
  ItemComponent?: (props: any) => JSX.Element;
  className?: string;
  style?: Record<string, any>;
}

const defaultPageSize = 20;

const MasonryScroll: React.FC<MasonryScrollProps> = (props) => {
  const {
    fetchApi,
    preload = true,
    observerMargin = 600,
    mansonryProps,
    pageSize = defaultPageSize,
    className,
    style = {},
    loadingComponent = <p>加载中...</p>,
    ItemComponent = (props) => {
      const { index, i } = props;
      return (
        <div>
          <p>{index + 1}</p>
          <img src={i.img} style={{ maxWidth: "100%" }} />
        </div>
      );
    },
  } = props;

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: preload ? `0px 0px ${observerMargin}px 0px` : "",
  });

  const [list, setList] = useState<
    {
      img: string;
      height: number;
      [props: string]: string | number;
    }[]
  >([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetch = () => {
    setLoading(true);
    setPage(page + 1);
    fetchApi({ page, pageSize })
      .then((e) => {
        console.log(11, page, e, list);
        setList([...list, ...e]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    inView && fetch();
  }, [inView]);

  return (
    <div className={className} style={style}>
      <Masonry
        {...mansonryProps}
        direction="row"
        useAbsolute={false}
        sortWithHeight={true}
      >
        {list.map((i, index) => {
          return (
            <MasonryItem key={index} height={i.height}>
              <ItemComponent index={index} i={i} />
            </MasonryItem>
          );
        })}
      </Masonry>
      <div ref={ref} />
      {loading && loadingComponent}
    </div>
  );
};

export default MasonryScroll;
