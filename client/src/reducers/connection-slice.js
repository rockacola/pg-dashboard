import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    connections: {},
    tableNames: {},
  },
  reducers: {
    setConnectionInfo: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state.connections[key] = value
    },

    setTableNames: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state.tableNames[key] = value
    },
  },
})

export const { setConnectionInfo, setTableNames } = connectionSlice.actions
export default connectionSlice.reducer
