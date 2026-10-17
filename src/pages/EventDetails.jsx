import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEventDetails } from '../features/events/eventsSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import RegisterButton from '../components/RegisterButton'
import { getEventImage, getVenue, getLocation, formatDate } from '../utils/eventHelpers'

function EventDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { details: event, detailsStatus, detailsError } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEventDetails(id))
  }, [dispatch, id])

  if (detailsStatus === 'failed') {
    return <ErrorMessage message={detailsError} onRetry={() => dispatch(fetchEventDetails(id))} />
  }
  if (detailsStatus !== 'succeeded' || event.id !== id) return <Loader text="Loading event..." />

  const venue = getVenue(event)
  const start = event.dates?.start || {}
  const classification = event.classifications?.[0]
  const price = event.priceRanges?.[0]
  const performers = event._embedded?.attractions || []
  const status = event.dates?.status?.code

  return (
    <div className="details">
      <Link to="/events" className="back-link">← Back to events</Link>

      <img className="details-image" src={getEventImage(event)} alt={event.name} />

      <div className="details-layout">
        <div className="details-main">
          <div className="badges">
            {classification?.segment && <span className="badge">{classification.segment.name}</span>}
            {classification?.genre && <span className="badge">{classification.genre.name}</span>}
            {classification?.subGenre && <span className="badge">{classification.subGenre.name}</span>}
            {status && <span className={`badge status-${status}`}>{status}</span>}
          </div>

          <h1>{event.name}</h1>

          {performers.length > 0 && (
            <section>
              <h3>Performers</h3>
              <p>{performers.map((a) => a.name).join(', ')}</p>
            </section>
          )}

          {event.info && (
            <section>
              <h3>About</h3>
              <p>{event.info}</p>
            </section>
          )}

          {event.pleaseNote && (
            <section>
              <h3>Please Note</h3>
              <p>{event.pleaseNote}</p>
            </section>
          )}

          {event.seatmap?.staticUrl && (
            <section>
              <h3>Seat Map</h3>
              <img className="seatmap" src={event.seatmap.staticUrl} alt="Seat map" />
            </section>
          )}
        </div>

        <aside className="card details-sidebar">
          <RegisterButton event={event} />
          <div className="info-item">
            <span className="info-label">Date & Time</span>
            <span>{formatDate(start.localDate, start.localTime)}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Venue</span>
            <span>{venue?.name || 'Venue TBA'}</span>
            {venue?.address?.line1 && <span className="muted">{venue.address.line1}</span>}
          </div>

          <div className="info-item">
            <span className="info-label">Location</span>
            <span>{getLocation(venue)}</span>
          </div>

          {price && (
            <div className="info-item">
              <span className="info-label">Price Range</span>
              <span>{price.min} to {price.max} {price.currency}</span>
            </div>
          )}

          {event.sales?.public?.startDateTime && (
            <div className="info-item">
              <span className="info-label">Ticket Sales Start</span>
              <span>{new Date(event.sales.public.startDateTime).toLocaleString()}</span>
            </div>
          )}

          {event.url && (
            <a href={event.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-block">
              View on Ticketmaster
            </a>
          )}
        </aside>
      </div>
    </div>
  )
}

export default EventDetails
