import { CalendarDays, Stethoscope, MapPinned, Shield, Gift, Sparkles } from 'lucide-react'
import GlassCard from './ui/GlassCard'

const roadmap = [
  {
    title: 'Doctor Consulting and Appointment Booking',
    eta: 'Future Phase',
    icon: Stethoscope,
    detail: 'Users can register directly and book consultations with verified doctors.'
  },
  {
    title: 'Doctor Service Profile and Home Visit Availability',
    eta: 'Future Phase',
    icon: CalendarDays,
    detail: 'Doctors can update visiting options, timings, and supported services.'
  },
  {
    title: 'Nearby Medical Stores and Emergency Hospitals',
    eta: 'Phase 2',
    icon: MapPinned,
    detail: 'Advanced search with emergency ward availability and rating filters.'
  },
  {
    title: 'Verified Doctor Onboarding With Live Photo Validation',
    eta: 'Phase 2',
    icon: Shield,
    detail: 'Document and live photo checks to reduce fraud doctor registrations.'
  },
  {
    title: 'Rewards and Credit Conversion Enhancements',
    eta: 'Phase 2',
    icon: Gift,
    detail: 'Points from expired medicine exchange, discount usage, and possible money conversion.'
  }
]

const Roadmap = () => {
  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Future Planning and Expansion</h1>
        <p className="text-white/70">A delivery-oriented roadmap for product growth and trust-first healthcare workflows.</p>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmap.map((item) => {
          const Icon = item.icon
          return (
            <GlassCard key={item.title} className="p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 grid place-items-center">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-200">{item.eta}</span>
              </div>
              <h2 className="font-semibold text-white text-lg">{item.title}</h2>
              <p className="text-sm text-white/75 mt-2">{item.detail}</p>
            </GlassCard>
          )
        })}
      </div>

      <GlassCard className="p-6 panel-accent">
        <p className="text-white/90 text-sm flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 mt-0.5" />
          Backend placeholder: create endpoints for doctor onboarding, appointment booking, rewards wallet,
          and exchange settlement. Keep API URLs blank until your final provider is selected.
        </p>
      </GlassCard>
    </div>
  )
}

export default Roadmap
