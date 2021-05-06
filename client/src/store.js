import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './reducers/connection-slice'
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    connection: connectionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
