function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button className="btn btn-outline" disabled={page === 0} onClick={() => onChange(page - 1)}>
        ← Previous
      </button>
      <span>Page {page + 1} of {totalPages}</span>
      <button className="btn btn-outline" disabled={page >= totalPages - 1} onClick={() => onChange(page + 1)}>
        Next →
      </button>
    </div>
  )
}

export default Pagination
