import {
  getHotRecommend,
  getNewAlbum,
  getPlayListDetail,
  getTopBanner,
  getArtistList
} from '../service/recommend'
import { RootState } from '@/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const rankingMap = {
  upRanking: 19723756,
  newRanking: 3779629,
  originRanking: 2884035
}

interface RecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
  settleSingers: any[]
}

const initialState: RecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: [],
  settleSingers: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changeSettleSingerAction(state, { payload }) {
      state.settleSingers = payload
    }
  }
})

export const fetchRecommendDataAction = createAsyncThunk(
  'fetchdata',
  (payload, { dispatch }) => {
    getTopBanner().then((res: any) => {
      dispatch(changeBannersAction(res.banners))
    })

    getHotRecommend().then((res: any) => {
      dispatch(changeHotRecommendAction(res.result))
    })
    getNewAlbum().then((res: any) => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
    return null
  }
)

export const fetchRankingDataAction = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('ranking', (_, { dispatch }) => {
  const promises: Promise<any>[] = []
  let key: keyof typeof rankingMap

  for (key in rankingMap) {
    const id = rankingMap[key]
    console.log(id, 'id')
    promises.push(getPlayListDetail(id))
  }

  Promise.all(promises).then((res) => {
    const rankings = res.map((item) => item.playlist)
    dispatch(changeRankingsAction(rankings))
  })
})

export const fetchSettleSingerAction = createAsyncThunk(
  'settlesinger',
  async (_, { dispatch }) => {
    const res = await getArtistList(5001, 5)
    dispatch(changeSettleSingerAction(res.artists))
  }
)

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumsAction,
  changeRankingsAction,
  changeSettleSingerAction
} = recommendSlice.actions

export default recommendSlice.reducer
