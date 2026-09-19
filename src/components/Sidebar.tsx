import { NavLink } from 'react-router-dom'
import { Icons, ModuleIcon } from './Icons'
import { modules } from '../data'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[0.85rem] transition-colors border ${
    isActive
      ? 'bg-primary/15 text-primary border-primary/25'
      : 'text-white/65 hover:bg-white/5 border-transparent'
  }`

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-l border-white/10 bg-black/25 backdrop-blur-sm">
      <div className="px-5 pt-6 pb-5">
        <NavLink to="/" className="block">
          <div className="font-brand text-3xl text-primary leading-none">پیوست</div>
          <div className="text-[0.7rem] text-white/45 mt-1.5">پلتفرم تأمین نیازمندی‌های پروژه</div>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        <NavLink to="/" end className={navLinkClass}>
          <Icons.House size={17} />
          خانه
        </NavLink>

        <div className="px-3 pt-4 pb-1.5 text-[0.68rem] text-white/35">ماژول‌ها</div>

        {modules.map((m) => (
          <NavLink key={m.id} to={`/m/${m.id}`} className={navLinkClass}>
            <ModuleIcon name={m.icon} size={17} style={{ color: m.color }} />
            {m.title}
          </NavLink>
        ))}

        <div className="px-3 pt-4 pb-1.5 text-[0.68rem] text-white/35">حساب</div>

        <NavLink to="/new" className={navLinkClass}>
          <Icons.CirclePlus size={17} />
          ثبت آگهی جدید
        </NavLink>
        <NavLink to="/mine" className={navLinkClass}>
          <Icons.FolderOpen size={17} />
          آگهی‌های من
        </NavLink>
        <NavLink to="/requests" className={navLinkClass}>
          <Icons.Handshake size={17} />
          <span className="flex-1">درخواست‌های همکاری</span>
        </NavLink>
        <NavLink to="/wallet" className={navLinkClass}>
          <Icons.Wallet size={17} />
          کیف پول
        </NavLink>
      </nav>

      <div className="p-3 border-t border-white/10">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[0.78rem] hover:bg-white/10 transition-colors w-full">
          <Icons.CircleUserRound size={16} className="text-primary" />
          <span className="max-w-[9rem] truncate">ورود / ثبت‌نام</span>
        </button>
      </div>
    </aside>
  )
}
