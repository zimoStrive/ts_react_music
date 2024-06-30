import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import HeaderTitles from '@/assets/data/header_titles.json'
import { SearchOutlined } from '@ant-design/icons'
import { Input, ConfigProvider } from 'antd'
import { NavLink } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}
interface TitleType {
  type: string
  title: string
  link: string
}

const AppHeader: FC<IProps> = () => {
  function showItem(item: TitleType) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {item.title}
        </NavLink>
      )
    } else {
      return <a href={item.link}> {item.title}</a>
    }
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: '#c20c0c',
            hoverBorderColor: '#c20c0c',
            algorithm: true // 启用算法
          }
        }
      }}
    >
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
                    {showItem(item)}
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
    </ConfigProvider>
  )
}

export default memo(AppHeader)
