import { BellRing, Mail, Settings2, Clock3 } from 'lucide-react'
import GlassCard from './ui/GlassCard'
import NeonButton from './ui/NeonButton'

const reminders = [
  { category: 'Medicine', defaultWindow: '7 days before expiry' },
  { category: 'Grocery', defaultWindow: '2 days before expiry' },
  { category: 'Cosmetics and Other', defaultWindow: '3 days before expiry' }
]

const Notifications = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Email and Notification Center</h1>
        <p className="text-white/70">Manage reminders, delivery channels, and escalation workflows.</p>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Clock3 className="w-5 h-5 text-cyan-300" />
            Default Reminder Rules
          </h2>
          <div className="space-y-3">
            {reminders.map((item) => (
              <div key={item.category} className="panel-muted p-4 rounded-2xl flex items-center justify-between">
                <p className="text-white/90 font-medium">{item.category}</p>
                <p className="text-sm text-white/70">{item.defaultWindow}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-emerald-300" />
            Channel Configuration
          </h2>
          <div className="space-y-3 text-sm text-white/85">
            <div className="panel-muted p-4 rounded-2xl flex items-start gap-3">
              <Mail className="w-5 h-5 text-amber-300 mt-0.5" />
              <p>Email provider placeholder: add SMTP or provider API credentials in backend env file.</p>
            </div>
            <div className="panel-muted p-4 rounded-2xl flex items-start gap-3">
              <BellRing className="w-5 h-5 text-cyan-300 mt-0.5" />
              <p>Push notification placeholder: add Firebase Cloud Messaging service key and topic setup.</p>
            </div>
          </div>
          <NeonButton className="mt-6 w-full">Open Notification Settings</NeonButton>
        </GlassCard>
      </div>
    </div>
  )
}

export default Notifications
