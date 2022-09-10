import { maxBy, minBy } from 'lodash-es'
import React from 'react'

export const getListAndHeight = ({
  children,
  columnCount,
  wrapRef,
  gutter,
}: {
  children: React.ReactNode
  columnCount: number
  wrapRef: any
  gutter: number
}) => {
  const clientWidth = wrapRef?.current?.clientWidth || 0
  const cellWidth = (clientWidth - gutter * (columnCount - 1)) / columnCount
  const columns = Array.from({ length: columnCount }).map(() => ({
    height: 0,
  }))
  const list = React.Children.map(children, (child: React.ReactNode, index) => {
    const width = cellWidth
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const height = (cellWidth / child.props.width) * child.props.height

    if (index < columns.length) {
      columns[index].height += height
      return {
        node: child,
        style: {
          width,
          height,
          left: index === 0 ? 0 : index * (cellWidth + gutter),
          top: 0,
        },
      }
    }

    const minColumnIndex = columns.findIndex(
      (i) => i === minBy(columns, (i) => i.height)
    )
    const top = columns[minColumnIndex].height + gutter
    columns[minColumnIndex].height += height + gutter
    return {
      node: child,
      style: {
        width,
        height,
        left: minColumnIndex * (cellWidth + gutter),
        top,
      },
    }
  }) as {
    node: React.ReactNode
    style: {
      [props: string]: any
    }
  }[]

  return { list, height: maxBy(columns, (i) => i.height)?.height as number }
}
