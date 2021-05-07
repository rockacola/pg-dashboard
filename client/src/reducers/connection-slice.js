import { createSlice } from '@reduxjs/toolkit'
import { StorageBroker } from '../brokers/storage-broker'

const _initialState = {
  connections: StorageBroker.getKnownConnections(),
  tableNames: StorageBroker.getKnownTableNames(),
  queries: StorageBroker.getQueries(),
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

    setQuery: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state.queries[key] = value
      StorageBroker.setQueries(state.queries)
    },

    removeConnectionInfo: (state, action) => {
      const key = action.payload.key
      delete state.connections[key]
      StorageBroker.setKnownConnections(state.connections)
    },

    removeQuery: (state, action) => {
      const key = action.payload.key
      delete state.queries[key]
      StorageBroker.setQueries(state.queries)
    },
  },
})

export const {
  setConnectionInfo,
  setTableNames,
  setQuery,
  removeConnectionInfo,
  removeQuery,
} = connectionSlice.actions
export default connectionSlice.reducer
