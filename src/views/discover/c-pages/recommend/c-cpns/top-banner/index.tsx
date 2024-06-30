import React, { memo, useState, useCallback, useRef } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannersRef = useRef<ElementRef<typeof Carousel>>(null)

  // redux 获取数据
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  const bannerChange = useCallback((from: number, to: number) => {
    setTimeout(() => {
      setCurrentIndex(to)
    }, 0)
  }, [])

  const bgImage = banners[currentIndex]
    ? banners[currentIndex].imageUrl + '?imageView&blur=40x20'
    : ''

  return (
    <BannerWrapper $bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            ref={bannersRef}
            effect="fade"
            dots={false}
            autoplay
            beforeChange={bannerChange}
          >
            {banners.map((item: any) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: currentIndex === index
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={() => bannersRef.current?.prev()}
          ></button>
          <button
            className="btn right"
            onClick={() => bannersRef.current?.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
