import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventsReducer from '../features/events/eventsSlice'
import registrationsReducer from '../features/registrations/registrationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

// Save auth and registration data to localStorage whenever the state changes
store.subscribe(() => {
  const { auth, registrations } = store.getState()
  localStorage.setItem('users', JSON.stringify(auth.users))
  localStorage.setItem('currentUser', JSON.stringify(auth.currentUser))
  localStorage.setItem('registrations', JSON.stringify(registrations.items))
})
