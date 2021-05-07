import { createSlice } from '@reduxjs/toolkit'
import { StorageBroker } from '../brokers/storage-broker'

const _initialState = {
  connections: StorageBroker.getKnownConnections(),
  tableNames: StorageBroker.getKnownTableNames(),
}

export const connectionSlice = createSlice({
  name: 'connection',
  initialState: _initialState,
  reducers: {
    setConnectionInfo: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state.connections[key] = value
      StorageBroker.setKnownConnections(state.connections)
    },

    setTableNames: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state.tableNames[key] = value
      StorageBroker.setKnownTableNames(state.tableNames)
    },
  },
})

export const { setConnectionInfo, setTableNames } = connectionSlice.actions
export default connectionSlice.reducer
