import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/auth'
import { isSupabaseConfigured } from '../lib/supabase'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await login(username.trim(), password)
      if (res.ok) {
        navigate('/')
        window.location.reload()
      } else {
        setError(res.error || '\u062e\u0637\u0627')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto w-full py-10">
      <h1 className="font-display text-3xl font-bold text-center mb-2">\u0648\u0631\u0648\u062f / \u062b\u0628\u062a\u200c\u0646\u0627\u0645</h1>
      <p className="text-center text-white/45 text-sm mb-8">
        \u0627\u06af\u0631 \u062d\u0633\u0627\u0628 \u0646\u062f\u0627\u0631\u06cc\u062f\u060c \u0628\u0627 \u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062c\u062f\u06cc\u062f \u0628\u0647\u200c\u0635\u0648\u0631\u062a \u062e\u0648\u062f\u06a9\u0627\u0631 \u062b\u0628\u062a\u200c\u0646\u0627\u0645 \u0645\u06cc\u200c\u0634\u0648\u06cc\u062f
      </p>
      {!isSupabaseConfigured && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-center">
          \u062d\u0627\u0644\u062a \u062f\u0645\u0648: \u062f\u0627\u062f\u0647 \u062f\u0631 \u0645\u0631\u0648\u0631\u06af\u0631 \u0630\u062e\u06cc\u0631\u0647 \u0645\u06cc\u200c\u0634\u0648\u062f. \u0628\u0631\u0627\u06cc Backend \u0648\u0627\u0642\u0639\u06cc \u0641\u0627\u06cc\u0644 .env \u0631\u0627 \u062a\u0646\u0638\u06cc\u0645 \u06a9\u0646\u06cc\u062f.
        </div>
      )}
      {isSupabaseConfigured && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-200 text-xs text-center">
          \u0645\u062a\u0635\u0644 \u0628\u0647 Supabase (\u062f\u06cc\u062a\u0627\u0628\u06cc\u0633 \u0622\u0646\u0644\u0627\u06cc\u0646)
        </div>
      )}
      <form onSubmit={handle} className="card p-6 space-y-4">
        <div>
          <label className="block text-[0.78rem] text-white/55 mb-1.5">\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm focus:outline-none focus:border-white/30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-[0.78rem] text-white/55 mb-1.5">\u0631\u0645\u0632 \u0639\u0628\u0648\u0631</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm focus:outline-none focus:border-white/30"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-red-400 text-sm whitespace-pre-wrap">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-primary text-[#14110a] font-bold text-sm disabled:opacity-60"
        >
          {loading ? '\u0635\u0628\u0631 \u06a9\u0646\u06cc\u062f...' : '\u0648\u0631\u0648\u062f'}
        </button>
      </form>
      <p className="text-center text-white/30 text-xs mt-6">
        \u06a9\u0627\u0631\u0628\u0631\u0627\u0646 \u062c\u062f\u06cc\u062f \u0628\u0627 \u06f5\u06f0\u060c\u06f0\u06f0\u06f0 \u062a\u0648\u0645\u0627\u0646 \u0627\u0639\u062a\u0628\u0627\u0631 \u0627\u0648\u0644\u06cc\u0647 \u0634\u0631\u0648\u0639 \u0645\u06cc\u200c\u06a9\u0646\u0646\u062f
      </p>
    </div>
  )
}
