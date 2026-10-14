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

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}

        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label>Password</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="field-error">{errors.password}</span>}

        <label>Confirm Password</label>
        <input name="confirm" type="password" value={form.confirm} onChange={handleChange} />
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
