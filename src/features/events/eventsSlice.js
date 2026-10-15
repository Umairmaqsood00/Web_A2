import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchEvents, getEventById, getCategories } from '../../api/ticketmaster'

export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, { getState }) => {
  const { filters, page } = getState().events
  return searchEvents({ ...filters, page })
})

export const fetchUpcoming = createAsyncThunk('events/fetchUpcoming', async () => {
  const data = await searchEvents({ sort: 'date,asc', size: 8 })
  return data.events
})

export const fetchEventDetails = createAsyncThunk('events/fetchEventDetails', async (id) => {
  return getEventById(id)
})

export const fetchCategories = createAsyncThunk('events/fetchCategories', getCategories, {
  condition: (_, { getState }) => getState().events.categories.length === 0,
})

const defaultFilters = {
  keyword: '',
  segmentId: '',
  city: '',
  startDate: '',
  endDate: '',
  sort: 'date,asc',
}

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  page: 0,
  totalPages: 0,
  totalResults: 0,
  filters: defaultFilters,

  upcoming: [],
  upcomingStatus: 'idle',

  details: null,
  detailsStatus: 'idle',
  detailsError: null,

  categories: [],
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
      state.page = 0
    },
    resetFilters(state) {
      state.filters = defaultFilters
      state.page = 0
    },
    setPage(state, action) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload.events
        state.totalPages = Math.min(action.payload.page.totalPages, Math.floor(1000 / 12))
        state.totalResults = action.payload.page.totalElements
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetchUpcoming.pending, (state) => {
        state.upcomingStatus = 'loading'
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcomingStatus = 'succeeded'
        state.upcoming = action.payload
      })
      .addCase(fetchUpcoming.rejected, (state) => {
        state.upcomingStatus = 'failed'
      })

      .addCase(fetchEventDetails.pending, (state) => {
        state.detailsStatus = 'loading'
        state.detailsError = null
        state.details = null
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded'
        state.details = action.payload
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed'
        state.detailsError = action.error.message
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

export const { setFilters, resetFilters, setPage } = eventsSlice.actions
export default eventsSlice.reducer
