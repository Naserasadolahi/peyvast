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
        setError(res.error || 'خطا')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto w-full py-10">
      <h1 className="font-display text-3xl font-bold text-center mb-2">ورود / ثبت‌نام</h1>
      <p className="text-center text-white/45 text-sm mb-8">
        اگر حساب ندارید، با نام کاربری جدید به‌صورت خودکار ثبت‌نام می‌شوید
      </p>
      {!isSupabaseConfigured && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-center">
          حالت دمو: داده در مرورگر ذخیره می‌شود. برای Backend واقعی فایل .env را تنظیم کنید.
        </div>
      )}
      {isSupabaseConfigured && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-green-200 text-xs text-center">
          متصل به Supabase (دیتابیس آنلاین)
        </div>
      )}
      <form onSubmit={handle} className="card p-6 space-y-4">
        <div>
          <label className="block text-[0.78rem] text-white/55 mb-1.5">نام کاربری</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm focus:outline-none focus:border-white/30"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block text-[0.78rem] text-white/55 mb-1.5">رمز عبور</label>
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
          {loading ? 'صبر کنید...' : 'ورود'}
        </button>
      </form>
      <p className="text-center text-white/30 text-xs mt-6">
        کاربران جدید با ۵۰٬۰۰۰ تومان اعتبار اولیه شروع می‌کنند
      </p>
    </div>
  )
}
