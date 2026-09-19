import { Link } from 'react-router-dom'
import { getCurrentUser } from '../store/auth'

export default function Messages() {
  const user = getCurrentUser()
  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50 mb-4">\u0628\u0631\u0627\u06cc \u0645\u0634\u0627\u0647\u062f\u0647 \u067e\u06cc\u0627\u0645\u200c\u0647\u0627 \u0648\u0627\u0631\u062f \u0634\u0648\u06cc\u062f</p>
        <Link to="/login" className="text-primary font-bold">\u0648\u0631\u0648\u062f</Link>
      </div>
    )
  }
  return (
    <div className="max-w-2xl mx-auto w-full">
      <h1 className="font-display text-2xl font-bold mb-6">\u067e\u06cc\u0627\u0645\u200c\u0647\u0627</h1>
      <div className="card p-10 text-center text-white/40">
        \u0647\u0646\u0648\u0632 \u06af\u0641\u062a\u06af\u0648\u06cc\u06cc \u0646\u062f\u0627\u0631\u06cc\u062f. \u0627\u0632 \u0635\u0641\u062d\u0647 \u0622\u06af\u0647\u06cc \u0631\u0648\u06cc \u00ab\u0627\u0631\u0633\u0627\u0644 \u067e\u06cc\u0627\u0645\u00bb \u0628\u0632\u0646\u06cc\u062f.
      </div>
    </div>
  )
}
