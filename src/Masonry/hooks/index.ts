import { useCallback, useEffect, useMemo, useState } from 'react'

import { DEFAULT_COLUMNS_COUNT } from '../const'

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  return hasMounted
}

export const useWindowWidth = () => {
  const hasMounted = useHasMounted()
  const [width, setWidth] = useState(0)

  const handleResize = useCallback(() => {
    if (!hasMounted) return
    setWidth(window.innerWidth)
  }, [hasMounted])

  useEffect(() => {
    if (hasMounted) {
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [hasMounted, handleResize])

  return width
}

export const useColumnCount = (columnsCountBreakPoints: {
  [props: number]: number
}) => {
  const windowWidth = useWindowWidth()
  const columnCount = useMemo(() => {
    const breakPoints = (
      Object.keys(columnsCountBreakPoints as any) as unknown as number[]
    ).sort((a: number, b: number) => a - b)
    let count =
      breakPoints.length > 0
        ? columnsCountBreakPoints![breakPoints[0]]
        : DEFAULT_COLUMNS_COUNT

    breakPoints.forEach((breakPoint) => {
      if (breakPoint < windowWidth) {
        count = columnsCountBreakPoints![breakPoint]
      }
    })

    return count
  }, [windowWidth, columnsCountBreakPoints])

  return columnCount
}
