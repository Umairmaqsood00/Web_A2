import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage } from '../../utils/storage'

const initialState = {
  users: loadFromStorage('users', []),
  currentUser: loadFromStorage('currentUser', null),
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      const { name, email, password } = action.payload
      const exists = state.users.find((u) => u.email === email)

      if (exists) {
        state.error = 'An account with this email already exists.'
        return
      }

      state.users.push({ name, email, password })
      state.currentUser = { name, email }
      state.error = null
    },

    loginUser(state, action) {
      const { email, password } = action.payload
      const user = state.users.find((u) => u.email === email && u.password === password)

      if (!user) {
        state.error = 'Invalid email or password.'
        return
      }

      state.currentUser = { name: user.name, email: user.email }
      state.error = null
    },

    logout(state) {
      state.currentUser = null
    },

    clearAuthError(state) {
      state.error = null
    },
  },
})

export const { registerUser, loginUser, logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
