import {
  getHotRecommend,
  getNewAlbum,
  getTopBanner
} from '../service/recommend'

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface RecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
  rankings: any[]
}

const initialState: RecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: [],
  rankings: []
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

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumsAction
} = recommendSlice.actions

export default recommendSlice.reducer
