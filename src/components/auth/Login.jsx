import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      sessionStorage.removeItem('guestMode')
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'Unable to login. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const continueAsGuest = () => {
    sessionStorage.setItem('guestMode', 'true')
    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="glass-card w-full max-w-md bg-white border border-slate-200 p-8">
        <h1 className="figma-title text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-slate-500">
          Login to manage expiry tracking, rewards, and doctor services.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600">Email</span>
            <input
              type="email"
              required
              className="panel-input mt-1 w-full p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Password</span>
            <input
              type="password"
              required
              className="panel-input mt-1 w-full p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 grid gap-2">
          <button
            onClick={continueAsGuest}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            Continue as Guest
          </button>
          <Link to="/forgot-password" className="text-center text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          New to MediTrack?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}