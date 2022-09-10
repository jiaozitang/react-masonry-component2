import { minBy } from 'lodash-es'
import React from 'react'

export const getColumns = (children: React.ReactNode, columnCount: number) => {
  const columns: {
    children: React.ReactNode[]
  }[] = Array.from({ length: columnCount }, () => ({
    children: [],
  }))

  React.Children.forEach(children, (child, index) => {
    if (child && React.isValidElement(child)) {
      columns[index % columnCount].children.push(child)
    }
  })

  return columns
}

export const getColumnsSortWithHeight = (
  children: React.ReactNode,
  columnCount: number
) => {
  const columns: {
    height: number
    children: React.ReactNode[]
  }[] = Array.from({ length: columnCount }, () => ({
    height: 0,
    children: [],
  }))

  React.Children.forEach(children, (child: React.ReactNode, index) => {
    if (child && React.isValidElement(child)) {
      if (index < columns.length) {
        columns[index % columnCount].children.push(child)
        columns[index % columnCount].height += child.props.height
        return
      }

      const minHeightColumn = minBy(columns, (a) => a.height) as {
        height: number
        children: React.ReactNode[]
      }
      minHeightColumn.children.push(child)
      minHeightColumn.height += child.props.height
    }
  })

  return columns
}
