import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, clearAuthError } from '../features/auth/authSlice'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})

  const { currentUser, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) navigate('/events')
  }, [currentUser, navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    const newErrors = {}
    if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Enter a valid email address.'
    if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.'
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match.'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      dispatch(registerUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      }))
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Create an account</h2>

        {error && <p className="alert alert-error">{error}</p>}

        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="field-error">{errors.password}</span>}

        <label htmlFor="confirm">Confirm Password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" value={form.confirm} onChange={handleChange} />
        {errors.confirm && <span className="field-error">{errors.confirm}</span>}

        <button type="submit" className="btn btn-block">Register</button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
