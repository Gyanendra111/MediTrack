import GlassCard from './ui/GlassCard'
import NeonButton from './ui/NeonButton'
import { CreditCard, Gift, Wallet, Repeat } from 'lucide-react'

const Credits = () => {
  const dummyCredits = 150
  const rewards = [
    { label: 'Expired Items Submitted', value: 12 },
    { label: 'Store Verified Exchanges', value: 9 },
    { label: 'Total Reward Points', value: 640 }
  ]

  return (
    <div className="space-y-6">
      <GlassCard className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-3 text-white">
          Credits & Rewards
        </h1>
        <p className="text-white/70">Exchange expired items, earn reward points, and unlock subscription discounts.</p>
      </GlassCard>

      <GlassCard className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold">{dummyCredits} Credits</h3>
            <p className="text-gray-400">30% discount on subscription</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {rewards.map((item) => (
            <div key={item.label} className="panel-muted p-4 rounded-2xl">
              <p className="text-xs uppercase tracking-wide text-white/60">{item.label}</p>
              <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-sm text-white/85 mb-8">
          <div className="panel-muted p-4 rounded-2xl flex items-start gap-3">
            <Repeat className="w-5 h-5 text-cyan-300 mt-0.5" />
            <p>Users submit expired medicine to nearest tie-up stores.</p>
          </div>
          <div className="panel-muted p-4 rounded-2xl flex items-start gap-3">
            <Gift className="w-5 h-5 text-emerald-300 mt-0.5" />
            <p>Store confirms exchange and credits points to wallet.</p>
          </div>
          <div className="panel-muted p-4 rounded-2xl flex items-start gap-3">
            <Wallet className="w-5 h-5 text-amber-300 mt-0.5" />
            <p>Users redeem credits for subscription discount up to 30%.</p>
          </div>
        </div>

        <NeonButton className="w-full bg-orange-500 hover:bg-orange-600">
          Redeem for Subscription
        </NeonButton>
        <p className="text-center text-gray-300 mt-4 text-sm">
          API placeholder: add payment provider and exchange settlement endpoints in MANUAL_FILL_REPORT.md.
        </p>
      </GlassCard>
    </div>
  )
}

export default Credits

