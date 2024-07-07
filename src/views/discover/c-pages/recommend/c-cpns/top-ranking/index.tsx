import { useAppSelector } from '@/store'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { RankingWrapper } from './style'
import SectionHeaderV1 from '@/components/section-header-v1'
import TopRankingItem from '@/components/top-ranking-item'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = useAppSelector(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      <SectionHeaderV1 title="榜单" morePath="/discover/ranking" />
      <div className="rankings">
        {rankings.map((item) => {
          return <TopRankingItem itemData={item} key={item.id} />
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
