import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

store.subscribe(() => {
  const { auth } = store.getState()
  localStorage.setItem('users', JSON.stringify(auth.users))
  localStorage.setItem('currentUser', JSON.stringify(auth.currentUser))
})
