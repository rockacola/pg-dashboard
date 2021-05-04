import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    connections: {},
  },
  reducers: {
    /**
     * Replace the whole stored value.
     */
    update: (state, action) => {
      console.log('connectionSlice.update triggered.')
      console.log('action:', action)

      const key = action.payload.key
      const value = action.payload.value

      state.connections[key] = value
    },
  },
})

export const { update } = connectionSlice.actions
export default connectionSlice.reducer
