import { ILyricInfo, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import type { RootState } from '@/store'

export const fetchCurrentSongDataAction = createAsyncThunk<
  void,
  number,
  { state: RootState }
>('currentSong', (id, { dispatch, getState }) => {
  // 1.获取歌词信息
  getSongLyric(id).then((res) => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })

  // 3.判断歌曲是否在列表中
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((song) => song.id === id)
  console.log(findIndex)
  if (findIndex !== -1) {
    // 有找到
    const currentSong = playSongList[findIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(findIndex))
  } else {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const currentSong = res.songs[0]

      // 2.保存到列表中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(currentSong)
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changeCurrentSongAction(currentSong))
      dispatch(changeCurrentSongIndexAction(newPlaySongList.length - 1))
    })
  }
})

export const changePlaySongAction = createAsyncThunk<
  void,
  boolean,
  { state: RootState }
>('playsong', (isNext, { dispatch, getState }) => {
  // 1.获取播放模式
  const playMode = getState().player.playMode
  const currentSongIndex = getState().player.currentSongIndex
  const playSongList = getState().player.playSongList

  // 2.判断逻辑
  const length = playSongList.length
  let newIndex = currentSongIndex
  if (playMode === 1) {
    newIndex = Math.floor(Math.random() * length)
  } else {
    if (isNext) newIndex += 1
    else newIndex -= 1
    if (newIndex > length - 1) newIndex = 0
    if (newIndex < 0) newIndex = length - 1
  }

  // 3.获取当前歌曲
  const currentSong = playSongList[newIndex]
  dispatch(changeCurrentSongAction(currentSong))
  dispatch(changeCurrentSongIndexAction(newIndex))

  // 4.获取歌词数据
  getSongLyric(currentSong.id).then((res) => {
    const lyricString = res.lrc.lyric
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})

interface IPlayState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
  playSongList: any[]
  currentSongIndex: number
  playMode: number
}
const initialState: IPlayState = {
  currentSong: {
    name: '有何不可',
    id: 167876,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 5771,
        name: '许嵩',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '600902000007916021',
    fee: 8,
    v: 49,
    crbt: null,
    cf: '',
    al: {
      id: 16953,
      name: '自定义',
      picUrl:
        'https://p2.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg',
      tns: [],
      pic_str: '18590542604286213',
      pic: 18590542604286212
    },
    dt: 241840,
    h: {
      br: 320000,
      fid: 0,
      size: 9675799,
      vd: -21099
    },
    m: {
      br: 192000,
      fid: 0,
      size: 5805497,
      vd: -18400
    },
    l: {
      br: 128000,
      fid: 0,
      size: 3870346,
      vd: -16900
    },
    a: null,
    cd: '1',
    no: 3,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 2,
    s_id: 0,
    mark: 8192,
    originCoverType: 0,
    single: 0,
    noCopyrightRcmd: null,
    mv: 0,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 14026,
    publishTime: 1231516800000
  },
  lyrics: [],
  lyricIndex: -1,

  playSongList: [
    {
      name: '有何不可',
      id: 167876,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5771,
          name: '许嵩',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '600902000007916021',
      fee: 8,
      v: 49,
      crbt: null,
      cf: '',
      al: {
        id: 16953,
        name: '自定义',
        picUrl:
          'https://p2.music.126.net/Md3RLH0fe2a_3dMDnfqoQg==/18590542604286213.jpg',
        tns: [],
        pic_str: '18590542604286213',
        pic: 18590542604286212
      },
      dt: 241840,
      h: {
        br: 320000,
        fid: 0,
        size: 9675799,
        vd: -21099
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5805497,
        vd: -18400
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3870346,
        vd: -16900
      },
      a: null,
      cd: '1',
      no: 3,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 2,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1231516800000
    },
    {
      name: '雅俗共赏',
      id: 411214279,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 5771,
          name: '许嵩',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: null,
      fee: 8,
      v: 31,
      crbt: null,
      cf: '',
      al: {
        id: 34749138,
        name: '青年晚报',
        picUrl:
          'https://p1.music.126.net/Wcs2dbukFx3TUWkRuxVCpw==/3431575794705764.jpg',
        tns: [],
        pic: 3431575794705764
      },
      dt: 249621,
      h: {
        br: 320000,
        fid: 0,
        size: 9987177,
        vd: -22200
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5992323,
        vd: -19600
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3994896,
        vd: -17800
      },
      a: null,
      cd: '1',
      no: 2,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 8192,
      originCoverType: 0,
      single: 0,
      noCopyrightRcmd: null,
      mv: 5302271,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 14026,
      publishTime: 1461723397683
    }
  ],
  currentSongIndex: 0,
  playMode: 0 // 0顺序播放 1随机播放 2单独循环
}

const playerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changeCurrentSongIndexAction(state, { payload }) {
      state.currentSongIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changeCurrentSongIndexAction,
  changePlayModeAction
} = playerSlice.actions
export default playerSlice.reducer
