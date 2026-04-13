import GlassCard from './ui/GlassCard'
import NeonButton from './ui/NeonButton'
import { Zap, Pill, BadgeDollarSign } from 'lucide-react'

const Recs = () => {
  const dummyRecs = [
    { name: 'Paracetamol 500mg Generic', price: '$2.99', original: 'Paracetamol Brand', salt: 'Paracetamol', savings: 'Save 34%' },
    { name: 'Ibuprofen 400mg', price: '$3.49', original: 'Brufen', salt: 'Ibuprofen', savings: 'Save 21%' },
  ]

  return (
    <div className="space-y-6">
      <GlassCard className="p-8">
        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
          <Zap className="w-6 h-6 text-cyan-300" />
          Cheaper Alternatives (Same Salt)
        </h3>
        <p className="text-white/70 mb-6">Recommendation engine for same-salt medicine with lower pricing and similar use case.</p>
        {dummyRecs.map((rec, index) => (
          <div key={index} className="panel-muted p-6 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl">
            <div>
              <h4 className="font-bold text-white flex items-center gap-2"><Pill className="w-4 h-4 text-cyan-300" /> {rec.name}</h4>
              <p className="text-sm text-gray-300 mt-1">Replaces {rec.original}</p>
              <p className="text-sm text-gray-300">Salt: {rec.salt}</p>
              <p className="text-2xl font-bold text-green-400 mt-2">{rec.price}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-emerald-300 flex items-center gap-1 justify-end"><BadgeDollarSign className="w-4 h-4" /> {rec.savings}</p>
              <NeonButton size="sm" className="mt-2">Use Recommendation</NeonButton>
            </div>
          </div>
        ))}
        <p className="text-center text-gray-300 mt-4 text-sm">
          API placeholder: add AI recommendation endpoint and pharmacy pricing data source in this file.
        </p>
      </GlassCard>
    </div>
  )
}

export default Recs

