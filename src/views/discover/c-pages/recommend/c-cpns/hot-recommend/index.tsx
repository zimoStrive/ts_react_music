import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RecommendWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import { useAppSelector } from '@/store'
import SectionItemV1 from '@/components/section-item-v1'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const keywords = ['华语', '流行', '摇滚', '民谣', '电子']
  const { hotRecommend } = useAppSelector((state) => ({
    hotRecommend: state.recommend.hotRecommends
  }))
  return (
    <RecommendWrapper>
      <SectionHeaderV1
        title="热门推荐"
        keywords={keywords}
        morePath="/discover/songs"
      />
      <div className="recommend-list">
        {hotRecommend.slice(0, 8).map((item) => {
          return <SectionItemV1 info={item} key={item.id} />
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(HotRecommend)
