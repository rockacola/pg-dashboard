import { createSlice } from '@reduxjs/toolkit'

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    connections: {},
    tableNames: {},
  },
  reducers: {
    /**
     * Replace the whole stored value.
     */
    setConnectionInfo: (state, action) => {
      console.log('connectionSlice.setConnectionInfo triggered.')
      console.log('action:', action)

      const key = action.payload.key
      const value = action.payload.value

      state.connections[key] = value
    },

    setTableNames: (state, action) => {
      console.log('connectionSlice.setTableNames triggered.')
      console.log('action:', action)

      const key = action.payload.key
      const value = action.payload.value

      state.tableNames[key] = value
    },
  },
})

export const { setConnectionInfo, setTableNames } = connectionSlice.actions
export default connectionSlice.reducer
