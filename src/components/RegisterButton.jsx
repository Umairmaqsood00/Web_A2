import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerForEvent, cancelRegistration } from '../features/registrations/registrationsSlice'
import { toRegistrationEvent, isPastEvent } from '../utils/eventHelpers'

function RegisterButton({ event }) {
  const user = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.items)
  const dispatch = useDispatch()
  const location = useLocation()
  const [message, setMessage] = useState(null)

  if (!user) {
    return (
      <Link to="/login" state={{ from: location.pathname }} className="btn btn-block">
        Login to Register
      </Link>
    )
  }

  const isRegistered = registrations.some((r) => r.userEmail === user.email && r.event.id === event.id)
  const isPast = isPastEvent(event.dates?.start?.localDate)
  const isCancelled = event.dates?.status?.code === 'cancelled'

  function handleRegister() {
    dispatch(registerForEvent({ userEmail: user.email, event: toRegistrationEvent(event) }))
    setMessage({ type: 'success', text: 'You are registered! See it in My Events.' })
  }

  function handleCancel() {
    if (!window.confirm('Cancel your registration for this event?')) return
    dispatch(cancelRegistration({ userEmail: user.email, eventId: event.id }))
    setMessage({ type: 'error', text: 'Your registration was cancelled.' })
  }

  return (
    <div className="register-box">
      {isPast || isCancelled ? (
        <button className="btn btn-block" disabled>
          {isPast ? 'Event has ended' : 'Event cancelled'}
        </button>
      ) : isRegistered ? (
        <>
          <button className="btn btn-block registered" disabled>✓ Registered</button>
          <button className="btn btn-danger btn-block" onClick={handleCancel}>Cancel Registration</button>
        </>
      ) : (
        <button className="btn btn-block" onClick={handleRegister}>Register for Event</button>
      )}

      {message && <p className={`alert alert-${message.type}`}>{message.text}</p>}
    </div>
  )
}

export default RegisterButton
