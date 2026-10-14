import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { cancelRegistration } from '../features/registrations/registrationsSlice'
import RegisteredEventItem from '../components/RegisteredEventItem'
import { isPastEvent } from '../utils/eventHelpers'

function MyEvents() {
  const user = useSelector((state) => state.auth.currentUser)
  const allRegistrations = useSelector((state) => state.registrations.items)
  const dispatch = useDispatch()
  const [tab, setTab] = useState('upcoming')
  const [message, setMessage] = useState('')

  const myRegistrations = allRegistrations
    .filter((r) => r.userEmail === user.email)
    .sort((a, b) => a.event.date.localeCompare(b.event.date))

  const upcoming = myRegistrations.filter((r) => !isPastEvent(r.event.date))
  const completed = myRegistrations.filter((r) => isPastEvent(r.event.date)).reverse()
  const shown = tab === 'upcoming' ? upcoming : completed

  function handleCancel(eventId) {
    if (!window.confirm('Cancel your registration for this event?')) return
    dispatch(cancelRegistration({ userEmail: user.email, eventId }))
    setMessage('Registration cancelled.')
  }

  return (
    <div>
      <h1>My Events</h1>

      <div className="tabs">
        <button className={tab === 'upcoming' ? 'tab active' : 'tab'} onClick={() => setTab('upcoming')}>
          Upcoming ({upcoming.length})
        </button>
        <button className={tab === 'completed' ? 'tab active' : 'tab'} onClick={() => setTab('completed')}>
          Completed ({completed.length})
        </button>
      </div>

      {message && <p className="alert alert-success">{message}</p>}

      {shown.length === 0 ? (
        <div className="empty">
          <p>{tab === 'upcoming' ? "You haven't registered for any upcoming events." : 'No completed events yet.'}</p>
          {tab === 'upcoming' && <Link to="/events" className="btn">Browse Events</Link>}
        </div>
      ) : (
        <div className="registered-list">
          {shown.map((r) => (
            <RegisteredEventItem
              key={r.event.id}
              registration={r}
              completed={tab === 'completed'}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEvents
