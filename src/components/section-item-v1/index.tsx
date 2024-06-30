import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { ItemV1Wrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  info: any
}

const SectionItemV1: FC<IProps> = (props: IProps) => {
  const { info } = props
  return (
    <ItemV1Wrapper>
      <div className="cover-top">
        <img src={getImageSize(info.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              {formatCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
    </ItemV1Wrapper>
  )
}

export default memo(SectionItemV1)
