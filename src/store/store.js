import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventsReducer from '../features/events/eventsSlice'
import registrationsReducer from '../features/registrations/registrationsSlice'
import { saveToStorage } from '../utils/storage'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    registrations: registrationsReducer,
  },
})

store.subscribe(() => {
  const { auth, registrations } = store.getState()
  saveToStorage('users', auth.users)
  saveToStorage('currentUser', auth.currentUser)
  saveToStorage('registrations', registrations.items)
})
