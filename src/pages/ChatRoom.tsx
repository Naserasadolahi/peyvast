import { Link, useParams } from 'react-router-dom'
import { getCurrentUser } from '../store/auth'

export default function ChatRoom() {
  const { id } = useParams()
  const user = getCurrentUser()
  if (!user) {
    return (
      <div className="text-center py-20">
        <Link to="/login" className="text-primary">\u0648\u0631\u0648\u062f</Link>
      </div>
    )
  }
  return (
    <div className="max-w-2xl mx-auto w-full">
      <Link to="/messages" className="text-white/50 text-sm">\u2190 \u0628\u0627\u0632\u06af\u0634\u062a</Link>
      <h1 className="font-display text-xl font-bold mt-4 mb-4">\u06af\u0641\u062a\u06af\u0648 {id}</h1>
      <div className="card p-8 text-center text-white/40">\u0686\u062a \u0628\u0647\u200c\u0632\u0648\u062f\u06cc \u0641\u0639\u0627\u0644 \u0645\u06cc\u200c\u0634\u0648\u062f</div>
    </div>
  )
}
