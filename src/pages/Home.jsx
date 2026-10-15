import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUpcoming, fetchCategories, resetFilters, setFilters } from '../features/events/eventsSlice'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Home() {
  const { upcoming, upcomingStatus, categories } = useSelector((state) => state.events)
  const user = useSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUpcoming())
    dispatch(fetchCategories())
  }, [dispatch])

  function openCategory(id) {
    dispatch(resetFilters())
    dispatch(setFilters({ segmentId: id }))
    navigate('/events')
  }

  return (
    <div>
      <section className="hero">
        <h1>Welcome to EventHub</h1>
        <p>Search concerts, sports, theatre and other events, and register for the ones you want to go to.</p>
        <div className="hero-actions">
          <Link to="/events" className="btn">Browse Events</Link>
          {!user && <Link to="/register" className="btn btn-light">Create Account</Link>}
        </div>
      </section>

      {categories.length > 0 && (
        <section className="home-section">
          <h2>Categories</h2>
          <div className="chips">
            {categories.map((c) => (
              <button key={c.id} className="chip" onClick={() => openCategory(c.id)}>
                {c.name}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="home-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <Link to="/events">See all</Link>
        </div>

        {upcomingStatus === 'loading' && <Loader />}
        {upcomingStatus === 'failed' && (
          <ErrorMessage message="Could not load upcoming events." onRetry={() => dispatch(fetchUpcoming())} />
        )}
        {upcomingStatus === 'succeeded' && (
          <div className="event-grid">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home
