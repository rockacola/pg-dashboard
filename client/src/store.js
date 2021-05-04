import { configureStore } from '@reduxjs/toolkit'
import connectionReducer from './reducers/connection-slice'

export default configureStore({
  reducer: {
    connection: connectionReducer,
  },
})
