import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import HeaderTitles from '@/assets/data/header_titles.json'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <div className="content">
        <HeaderLeft>
          <a href="#/" className="logo sprite_01">
            网易云音乐
          </a>
          <div className="select-list">
            {HeaderTitles.map((item) => {
              return (
                <div className="select-item" key={item.title}>
                  {item.title}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input
            className="search"
            prefix={<SearchOutlined />}
            placeholder="音乐/视频/电台/用户"
          />
          <div className="center">创作者中心</div>
          <div className="login">登录</div>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
