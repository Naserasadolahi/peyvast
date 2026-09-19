import { Link } from 'react-router-dom'
import { getCurrentUser } from '../store/auth'

export default function Admin() {
  const user = getCurrentUser()
  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center py-20 text-white/50">
        \u062f\u0633\u062a\u0631\u0633\u06cc \u0641\u0642\u0637 \u0628\u0631\u0627\u06cc \u0645\u062f\u06cc\u0631
        <br />
        <Link to="/login" className="text-primary mt-4 inline-block">\u0648\u0631\u0648\u062f</Link>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="font-display text-2xl font-bold mb-6">\u067e\u0646\u0644 \u0645\u062f\u06cc\u0631\u06cc\u062a</h1>
      <div className="card p-6 text-white/70 text-sm">
        \u062e\u0648\u0634 \u0622\u0645\u062f\u06cc\u062f {user.name || user.username}. \u06af\u0632\u0627\u0631\u0634\u200c\u0647\u0627 \u067e\u0633 \u0627\u0632 \u0627\u062a\u0635\u0627\u0644 \u06a9\u0627\u0645\u0644 \u0628\u0647 Supabase \u0646\u0645\u0627\u06cc\u0634 \u062f\u0627\u062f\u0647 \u0645\u06cc\u200c\u0634\u0648\u0646\u062f.
      </div>
    </div>
  )
}
