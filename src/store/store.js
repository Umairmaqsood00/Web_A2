import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventsReducer from '../features/events/eventsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
})

// Save auth data to localStorage whenever the state changes
store.subscribe(() => {
  const { auth } = store.getState()
  localStorage.setItem('users', JSON.stringify(auth.users))
  localStorage.setItem('currentUser', JSON.stringify(auth.currentUser))
})
