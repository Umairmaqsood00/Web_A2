export function getEventImage(event) {
  if (!event.images || event.images.length === 0) return null
  const wide = event.images.filter((img) => img.ratio === '16_9')
  const list = wide.length > 0 ? wide : event.images
  return list.reduce((best, img) => (img.width > best.width ? img : best)).url
}

export function getVenue(event) {
  return event._embedded?.venues?.[0] || null
}

export function getLocation(venue) {
  if (!venue) return 'Location TBA'
  return [venue.city?.name, venue.state?.name, venue.country?.name].filter(Boolean).join(', ')
}

export function getCategory(event) {
  const c = event.classifications?.[0]
  if (!c) return 'Other'
  return c.segment?.name || c.genre?.name || 'Other'
}

export function formatDate(date, time) {
  if (!date) return 'Date TBA'
  const d = new Date(time ? `${date}T${time}` : `${date}T00:00:00`)
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  const text = d.toLocaleDateString(undefined, options)
  if (!time) return text
  return `${text}, ${d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`
}

export function isPastEvent(date) {
  if (!date) return false
  return new Date(date + 'T23:59:59') < new Date()
}

// Small object we save when a user registers, so My Events works without refetching
export function toRegistrationEvent(event) {
  const venue = getVenue(event)
  return {
    id: event.id,
    name: event.name,
    date: event.dates?.start?.localDate || '',
    time: event.dates?.start?.localTime || '',
    venue: venue?.name || 'Venue TBA',
    location: getLocation(venue),
    category: getCategory(event),
    image: getEventImage(event),
  }
}
