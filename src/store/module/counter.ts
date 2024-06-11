import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 100
  },
  reducers: {
    changeCounter(state, { payload }) {
      state.counter = payload
    }
  }
})

export const { changeCounter } = counterSlice.actions
export default counterSlice.reducer
