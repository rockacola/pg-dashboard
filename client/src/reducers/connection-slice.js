import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    value: [],
  },
  reducers: {
    /**
     * Replace the whole stored value.
     */
    update: (state, action) => {
      console.log('connectionSlice.update triggered.')
      console.log('action:', action)

      state.value = action.payload.value
    },
  },
})

export const { update } = connectionSlice.actions
export default connectionSlice.reducer
