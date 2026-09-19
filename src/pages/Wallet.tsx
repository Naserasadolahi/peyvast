import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../store/auth'

export default function Wallet() {
  const user = getCurrentUser()
  const [amount, setAmount] = useState('100000')

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50 mb-4">\u0628\u0631\u0627\u06cc \u0645\u0634\u0627\u0647\u062f\u0647 \u06a9\u06cc\u0641 \u067e\u0648\u0644 \u0648\u0627\u0631\u062f \u0634\u0648\u06cc\u062f</p>
        <Link to="/login" className="text-primary font-bold">\u0648\u0631\u0648\u062f</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <h1 className="font-display text-2xl font-bold mb-6">\u06a9\u06cc\u0641 \u067e\u0648\u0644</h1>
      <div className="card p-6 mb-6">
        <div className="text-sm text-white/50 mb-1">\u0645\u0648\u062c\u0648\u062f\u06cc \u0641\u0639\u0644\u06cc</div>
        <div className="text-3xl font-bold text-primary">
          {user.walletBalance.toLocaleString('fa-IR')}{' '}
          <span className="text-base font-normal text-white/50">\u062a\u0648\u0645\u0627\u0646</span>
        </div>
        <p className="text-[0.75rem] text-white/40 mt-3">
          \u0647\u0631 \u0628\u0627\u0632\u062f\u06cc\u062f \u0627\u0632 \u0622\u06af\u0647\u06cc \u0634\u0645\u0627 \u06f5\u060c\u06f0\u06f0\u06f0 \u062a\u0648\u0645\u0627\u0646 \u0627\u0632 \u0627\u0639\u062a\u0628\u0627\u0631 \u06a9\u0645 \u0645\u06cc\u200c\u06a9\u0646\u062f.
        </p>
      </div>
      <div className="card p-6">
        <h2 className="font-bold mb-4">\u0634\u0627\u0631\u0698 \u0627\u0639\u062a\u0628\u0627\u0631</h2>
        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="\u0645\u0628\u0644\u063a (\u062a\u0648\u0645\u0627\u0646)"
          />
          <button
            type="button"
            className="px-6 rounded-xl bg-primary text-[#14110a] font-bold text-sm"
            onClick={() => alert('\u062f\u0631 \u0646\u0633\u062e\u0647 \u062f\u0645\u0648: \u0634\u0627\u0631\u0698 \u0634\u0628\u06cc\u0647\u200c\u0633\u0627\u0632\u06cc \u0627\u0633\u062a')}
          >
            \u0634\u0627\u0631\u0698
          </button>
        </div>
      </div>
    </div>
  )
}
