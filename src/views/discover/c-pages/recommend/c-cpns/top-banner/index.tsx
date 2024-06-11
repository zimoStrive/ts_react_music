import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  return <div>TopBanner</div>
}

export default memo(TopBanner)
