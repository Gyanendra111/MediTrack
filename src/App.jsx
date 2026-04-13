import { useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AppDataProvider } from './context/AppDataContext'

const Login = lazy(() => import('./components/auth/Login'))
const MainLayout = lazy(() => import('./components/layout/MainLayout'))
const Dashboard = lazy(() => import('./components/Dashboard'))
const ScanFlow = lazy(() => import('./components/ScanFlow'))
const Inventory = lazy(() => import('./components/Inventory'))
const Rewards = lazy(() => import('./components/Rewards'))
const DoctorConsulting = lazy(() => import('./components/DoctorConsulting'))
const Nearby = lazy(() => import('./components/Nearby'))
const Reviews = lazy(() => import('./components/Reviews'))
const Settings = lazy(() => import('./components/Settings'))
const Profile = lazy(() => import('./components/Profile'))
const DoctorRegister = lazy(() => import('./components/DoctorRegister'))
const RecycleHub = lazy(() => import('./components/RecycleHub'))
const PartnerOnboarding = lazy(() => import('./components/PartnerOnboarding'))

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      await register(email, password)
      sessionStorage.removeItem('guestMode')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to register. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="glass-card w-full max-w-md p-8 bg-white text-slate-900 border border-slate-200">
        <h2 className="text-3xl font-bold text-center mb-3 text-slate-900">Create Account</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Secure registration for medicine and inventory tracking.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="panel-input w-full p-4 rounded-xl border border-slate-200 bg-slate-50" placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="panel-input w-full p-4 rounded-xl border border-slate-200 bg-slate-50" placeholder="Password" required />
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="panel-input w-full p-4 rounded-xl border border-slate-200 bg-slate-50" placeholder="Confirm Password" required />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700" type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
        </form>
        <p className="text-center mt-4 text-slate-500">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(''); setError(''); setLoading(true)
    try {
      await forgotPassword(email)
      setMessage('Password reset email sent.')
    } catch (err) {
      setError(err.message || 'Unable to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="glass-card w-full max-w-md p-8 bg-white border border-slate-200">
        <h2 className="text-3xl font-bold text-center mb-3 text-slate-900">Reset Password</h2>
        <p className="text-center text-sm text-slate-500 mb-8">Enter your email to receive a reset link.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="panel-input w-full p-4 rounded-xl border border-slate-200 bg-slate-50" placeholder="Email" required />
          {message && <p className="text-sm text-emerald-500">{message}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700" type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
        </form>
        <p className="text-center mt-4 text-slate-500">
          <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  )
}

function ProtectedRoutes({ children }) {
  const { user } = useAuth()
  const isGuest = sessionStorage.getItem('guestMode') === 'true'
  return user || isGuest ? children : <Navigate to="/" />
}

function AppContent() {
  const { loading, user } = useAuth()
  const isGuest = sessionStorage.getItem('guestMode') === 'true'
  const isAuthenticated = Boolean(user) || isGuest

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const loader = <div className="min-h-screen flex items-center justify-center text-slate-500">Loading page...</div>

  return (
    <Router>
      <Suspense fallback={loader}>
        <Routes>
          {/* Public Routes (Auth) */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<ScanFlow />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/doctor" element={<DoctorConsulting />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/recycle" element={<RecycleHub />} />
            <Route path="/partners" element={<PartnerOnboarding />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <AppContent />
      </AppDataProvider>
    </AuthProvider>
  )
}

export default App
