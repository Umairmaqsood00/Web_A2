import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage } from '../../utils/storage'

const initialState = {
  items: loadFromStorage('registrations', []),
}

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState,
  reducers: {
    registerForEvent(state, action) {
      const { userEmail, event } = action.payload
      const already = state.items.some((r) => r.userEmail === userEmail && r.event.id === event.id)
      if (already) return

      state.items.push({
        userEmail,
        event,
        registeredAt: new Date().toISOString(),
      })
    },

    cancelRegistration(state, action) {
      const { userEmail, eventId } = action.payload
      state.items = state.items.filter((r) => !(r.userEmail === userEmail && r.event.id === eventId))
    },
  },
})

export const { registerForEvent, cancelRegistration } = registrationsSlice.actions
export default registrationsSlice.reducer
