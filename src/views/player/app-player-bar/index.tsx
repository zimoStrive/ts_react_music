import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, BarWrapper } from './style'
import { useAppDispatch, useAppSelector } from '@/store'
import { NavLink } from 'react-router-dom'
import { Slider, message } from 'antd'
import { shallowEqual } from 'react-redux'
import { formatTime, getPlayerUrl } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changePlayModeAction,
  changePlaySongAction
} from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /** 定义组件内部的数据 */
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [messageApi] = message.useMessage()

  /** 从redux中获取数据 */
  const { currentSong, lyrics, lyricIndex, playMode, playSongList } =
    useAppSelector(
      (state) => ({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyrics,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode,
        playSongList: state.player.playSongList
      }),
      shallowEqual
    )
  const dispatch = useAppDispatch()

  /** 监听currentSong的变化 */
  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = getPlayerUrl(currentSong.id)
    audioRef.current
      .play()
      .then(() => {
        console.log('播放成功')
        setIsPlaying(true)
      })
      .catch((err) => {
        console.log('播放失败:', err)
        setIsPlaying(false)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  /** 事件处理的逻辑 */
  function handleTimeUpdate() {
    // 1.获取当前的时间
    const currentTime = audioRef.current!.currentTime

    // 2.设置展示的内容
    if (!isChanging) {
      setCurrentTime(currentTime * 1000)
      const progress = ((currentTime * 1000) / duration) * 100
      setProgress(progress)
    }

    // 3.匹配歌词
    if (!lyrics.length) return
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyricItem = lyrics[i]
      if (lyricItem.time >= currentTime * 1000) {
        index = i - 1
        break
      }
    }
    // 4.匹配歌词
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
    const currentLyric = lyrics[index]

    messageApi.open({
      type: 'success',
      content: currentLyric.content,
      duration: 0,
      key: 'lyric',
      style: {
        bottom: '60px'
      }
    })
  }

  function handlePlayEnded() {
    if (playMode === 2 || playSongList.length === 1) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeBtnClick(true)
    }
  }

  function handleSliderChanging(value: number) {
    setIsChanging(true)
    setProgress(value)
    const currentTime = ((value / 100) * duration) / 1000
    setCurrentTime(currentTime)
  }

  function handleSliderAfterChange(value: number) {
    // 1.计算对应的时间
    const currentTime = ((value / 100) * duration) / 1000

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime
    setCurrentTime(currentTime)

    // 3.设置changing结束
    setIsChanging(false)
  }

  /** 播放功能的交互 */
  function handlePlayBtnClick() {
    const isPaused = audioRef.current!.paused
    isPaused
      ? audioRef.current?.play().catch(() => setIsPlaying(false))
      : audioRef.current?.pause()
    setIsPlaying(isPaused)
  }

  function handleChangeBtnClick(isNext = true) {
    dispatch(changePlaySongAction(isNext))
  }

  function handlePlayModeClick() {
    let newPlayMode = playMode + 1
    if (newPlayMode === 3) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  return (
    <BarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeBtnClick(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeBtnClick()}
          ></button>
        </BarControl>
        <BarPlayInfo>
          <NavLink to="/discover/player">
            <img
              src="https://p2.music.126.net/OVkXDNmbk2uj6wE1KTZIwQ==/109951165203334337.jpg?param=34y34"
              alt=""
            />
          </NavLink>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                step={0.5}
                value={progress}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderAfterChange}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator $playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handlePlayModeClick}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handlePlayEnded}
      />
    </BarWrapper>
  )
}

export default memo(AppPlayerBar)
