const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'
const API_KEY = import.meta.env.VITE_TM_API_KEY

async function request(path, params = {}) {
  if (!API_KEY) {
    throw new Error('API key is missing. Add VITE_TM_API_KEY to your .env file.')
  }

  const query = new URLSearchParams({ apikey: API_KEY })
  for (const key in params) {
    if (params[key] !== '' && params[key] !== undefined) {
      query.append(key, params[key])
    }
  }

  const res = await fetch(`${BASE_URL}${path}?${query}`)

  if (res.status === 429) throw new Error('Too many requests. Please wait a moment and try again.')
  if (res.status === 404) throw new Error('Event not found.')
  if (!res.ok) throw new Error(`Request failed with status ${res.status}.`)

  return res.json()
}

function toApiDate(date) {
  return date.toISOString().split('.')[0] + 'Z'
}

export async function searchEvents({ keyword, segmentId, city, startDate, endDate, sort, page = 0, size = 12 }) {
  const start = startDate ? new Date(startDate + 'T00:00:00') : new Date()
  const end = endDate ? new Date(endDate + 'T23:59:59') : null

  const data = await request('/events.json', {
    keyword,
    segmentId,
    city,
    sort,
    page,
    size,
    startDateTime: toApiDate(start),
    endDateTime: end ? toApiDate(end) : '',
  })

  return {
    events: data._embedded?.events || [],
    page: data.page,
  }
}

export async function getEventById(id) {
  return request(`/events/${id}.json`)
}

export async function getCategories() {
  const data = await request('/classifications.json', { size: 50 })
  const classifications = data._embedded?.classifications || []

  return classifications
    .filter((c) => c.segment && c.segment.name !== 'Undefined')
    .map((c) => ({
      id: c.segment.id,
      name: c.segment.name,
      genres: (c.segment._embedded?.genres || []).map((g) => g.name),
    }))
}
