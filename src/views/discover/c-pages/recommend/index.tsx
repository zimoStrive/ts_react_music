import { useAppDispatch } from '@/store'
import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { fetchRecommendDataAction } from './store/recommend'
import {
  RecommendWrapper,
  RecommendSection,
  RecommendLeft,
  RecommendRight
} from './style'
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
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
      <RecommendSection className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
        </RecommendLeft>
        <RecommendRight>right</RecommendRight>
      </RecommendSection>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
