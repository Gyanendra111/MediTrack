import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useAppData } from '../../context/AppDataContext'

const navItems = [
  ['Dashboard', '/dashboard'],
  ['Scan Product', '/scan'],
  ['Inventory', '/inventory'],
  ['Rewards', '/rewards'],
  ['Nearby', '/nearby'],
  ['Doctor', '/doctor'],
  ['Reviews', '/reviews'],
  ['Recycle Hub', '/recycle'],
  ['Partners', '/partners'],
  ['Settings', '/settings'],
  ['Profile', '/profile'],
]

export default function MainLayout() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { theme, toggleTheme } = useAppData()

  const handleLogout = async () => {
    sessionStorage.removeItem('guestMode')
    try {
      await logout()
    } catch {
      // Keep UI responsive even if Firebase is not configured.
    }
    navigate('/login')
  }

  return (
    <div className="figma-app figma-grid-bg relative">
      <div className="figma-glow" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] flex-col md:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white/95 p-4 md:w-72 md:border-b-0 md:border-r md:p-6">
          <div className="mb-5">
            <p className="brand-wordmark text-2xl leading-none">MediTrack</p>
            <p className="brand-tagline text-sm">Expiry Intelligence Platform</p>
          </div>

          <nav className="grid gap-2">
            {navItems.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'rounded-xl border px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'border-blue-200 bg-blue-50 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
                  ].join(' ')
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 grid gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Theme: {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}