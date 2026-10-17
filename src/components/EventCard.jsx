import { Link } from 'react-router-dom'
import { getEventImage, getVenue, getLocation, getCategory, formatDate } from '../utils/eventHelpers'

function EventCard({ event }) {
  const venue = getVenue(event)

  return (
    <Link to={`/events/${event.id}`} className="card event-card">
      <img src={getEventImage(event)} alt={event.name} />
      <div className="event-card-body">
        <span className="badge">{getCategory(event)}</span>
        <h3>{event.name}</h3>
        <p className="muted">{formatDate(event.dates?.start?.localDate, event.dates?.start?.localTime)}</p>
        <p className="muted">{venue?.name}, {getLocation(venue)}</p>
      </div>
    </Link>
  )
}

export default EventCard
