import { Link } from 'react-router-dom'
import { Icons } from './Icons'

export default function MobileHeader() {
  return (
    <header className="md:hidden shrink-0 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <Link to="/" className="flex items-center gap-2">
          <Icons.Layers size={20} className="text-primary" />
          <div className="font-brand text-2xl text-primary leading-none">پیوست</div>
        </Link>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[0.78rem] hover:bg-white/10 transition-colors">
          <Icons.CircleUserRound size={16} className="text-primary" />
          <span className="max-w-[9rem] truncate">ورود / ثبت‌نام</span>
        </button>
      </div>
    </header>
  )
}
