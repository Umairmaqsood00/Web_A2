import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents, setPage } from '../features/events/eventsSlice'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import Pagination from '../components/Pagination'

function Events() {
  const { list, status, error, page, totalPages, totalResults, filters } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch, filters, page])

  function changePage(newPage) {
    dispatch(setPage(newPage))
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <h1>Explore Events</h1>

      {status === 'loading' && <Loader text="Loading events..." />}

      {status === 'failed' && <ErrorMessage message={error} onRetry={() => dispatch(fetchEvents())} />}

      {status === 'succeeded' && (
        <>
          <p className="muted">{totalResults} events found</p>

          {list.length === 0 ? (
            <p className="empty">No events match your search.</p>
          ) : (
            <div className="event-grid">
              {list.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} onChange={changePage} />
        </>
      )}
    </div>
  )
}

export default Events
