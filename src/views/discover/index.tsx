import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/store'
import { changeCounter } from '@/store/module/counter'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  const dispatch = useAppDispatch()

  const { counter } = useAppSelector((state) => ({
    counter: state.counter.counter
  }))

  const changeCounterhandler = () => {
    dispatch(changeCounter(1000))
  }

  return (
    <div>
      <div className="top">123:{counter}</div>
      <div onClick={changeCounterhandler}>点我改变数值</div>
      <Suspense fallback="laoding...">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
