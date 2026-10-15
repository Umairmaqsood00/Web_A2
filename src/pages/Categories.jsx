import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCategories, resetFilters, setFilters } from '../features/events/eventsSlice'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'

function Categories() {
  const { categories, categoriesError: error } = useSelector((state) => state.events)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  function openCategory(id) {
    dispatch(resetFilters())
    dispatch(setFilters({ segmentId: id }))
    navigate('/events')
  }

  if (error) return <ErrorMessage message={error} onRetry={() => dispatch(fetchCategories())} />
  if (categories.length === 0) return <Loader text="Loading categories..." />

  return (
    <div>
      <h1>Event Categories</h1>
      <p className="muted">Pick a category to see its upcoming events.</p>

      <div className="category-grid">
        {categories.map((c) => (
          <button key={c.id} className="card category-card" onClick={() => openCategory(c.id)}>
            <h3>{c.name}</h3>
            <p className="muted">{c.genres.slice(0, 6).join(', ')}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories
