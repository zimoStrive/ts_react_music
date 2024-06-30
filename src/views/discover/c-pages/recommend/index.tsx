import { useAppDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchRecommendDataAction } from './store/recommend'
import { RecommendWrapper } from './style'
import TopBanner from './c-cpns/top-banner'
interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  // 网络请求
  const dispathch = useAppDispatch()
  useEffect(() => {
    dispathch(fetchRecommendDataAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner />
    </RecommendWrapper>
  )
}

export default memo(Recommend)
