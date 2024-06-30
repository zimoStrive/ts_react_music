import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title: string
  keywords?: string[]
  morePath: string
}

const SectionHeaderV1: FC<IProps> = (props: IProps) => {
  const { title, keywords = [], morePath } = props

  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keyword">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link to={morePath}>更多</Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(SectionHeaderV1)
