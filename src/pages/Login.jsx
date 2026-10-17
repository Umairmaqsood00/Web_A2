import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, clearAuthError } from '../features/auth/authSlice'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const { currentUser, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectTo = location.state?.from || '/events'

  useEffect(() => {
    dispatch(clearAuthError())
  }, [dispatch])

  useEffect(() => {
    if (currentUser) navigate(redirectTo, { replace: true })
  }, [currentUser, navigate, redirectTo])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = {}
    if (!form.email) newErrors.email = 'Email is required.'
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) newErrors.email = 'Enter a valid email address.'
    if (!form.password) newErrors.password = 'Password is required.'
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      dispatch(loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      }))
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Welcome back</h2>

        {error && <p className="alert alert-error">{error}</p>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="field-error">{errors.password}</span>}

        <button type="submit" className="btn btn-block">Login</button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
