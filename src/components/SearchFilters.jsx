import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilters, resetFilters, fetchCategories } from '../features/events/eventsSlice'

function SearchFilters() {
  const { filters, categories } = useSelector((state) => state.events)
  const dispatch = useDispatch()
  const [form, setForm] = useState(filters)
  const [error, setError] = useState('')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  // Keep the form in sync if filters change somewhere else (e.g. Categories page)
  useEffect(() => {
    setForm(filters)
  }, [filters])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      setError('End date must be after start date.')
      return
    }
    setError('')
    dispatch(setFilters({ ...form, keyword: form.keyword.trim(), city: form.city.trim() }))
  }

  function handleReset() {
    setError('')
    dispatch(resetFilters())
  }

  return (
    <form className="card filters" onSubmit={handleSubmit}>
      <input
        className="search-input"
        name="keyword"
        placeholder="Search events, artists, teams..."
        value={form.keyword}
        onChange={handleChange}
      />

      <div className="filter-row">
        <select name="segmentId" value={form.segmentId} onChange={handleChange}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input name="city" placeholder="City" value={form.city} onChange={handleChange} />

        <label className="date-field">
          From
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        </label>

        <label className="date-field">
          To
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        </label>

        <select name="sort" value={form.sort} onChange={handleChange}>
          <option value="date,asc">Date (soonest)</option>
          <option value="name,asc">Name (A to Z)</option>
          <option value="relevance,desc">Relevance</option>
        </select>
      </div>

      {error && <span className="field-error">{error}</span>}

      <div className="filter-actions">
        <button type="submit" className="btn">Search</button>
        <button type="button" className="btn btn-outline" onClick={handleReset}>Reset</button>
      </div>
    </form>
  )
}

export default SearchFilters
