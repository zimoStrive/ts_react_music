import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { DiscoverWrapper } from './style'
import { discoverMenu } from '@/assets/data/local-data'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <DiscoverWrapper>
      <div className="top">
        <div className="nav wrap-v1">
          {discoverMenu.map((item) => {
            return (
              <div className="item" key={item.title}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {item.title}
                </NavLink>
              </div>
            )
          })}
        </div>
      </div>
      <Suspense fallback="laoding...">
        <Outlet />
      </Suspense>
    </DiscoverWrapper>
  )
}

export default memo(Discover)
