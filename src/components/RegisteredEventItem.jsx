import { Link } from 'react-router-dom'
import { formatDate } from '../utils/eventHelpers'

function RegisteredEventItem({ registration, onCancel, completed }) {
  const { event, registeredAt } = registration

  return (
    <div className="card registered-item">
      <img src={event.image} alt={event.name} />

      <div className="registered-info">
        <span className="badge">{event.category}</span>
        <h3>
          <Link to={`/events/${event.id}`}>{event.name}</Link>
        </h3>
        <p className="muted">{formatDate(event.date, event.time)}</p>
        <p className="muted">{event.venue}, {event.location}</p>
        <p className="small muted">Registered on {new Date(registeredAt).toLocaleDateString()}</p>
      </div>

      <div className="registered-actions">
        {completed ? (
          <span className="badge badge-done">Completed</span>
        ) : (
          <button className="btn btn-danger" onClick={() => onCancel(event.id)}>Cancel</button>
        )}
      </div>
    </div>
  )
}

export default RegisteredEventItem
