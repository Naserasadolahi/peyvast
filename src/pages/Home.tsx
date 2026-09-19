import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import { ModuleIcon } from '../components/Icons'
import { modules } from '../data'
import { Icons } from '../components/Icons'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="rise">
        <HeroSlider />
      </div>

      <h2 className="text-lg font-bold mt-8 mb-3">ماژول‌های تأمین</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {modules.map((m, i) => (
          <Link
            key={m.id}
            to={`/m/${m.id}`}
            className="card p-5 rise hover:border-white/25 transition-colors group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{
                  background: `rgba(${m.colorRgb},0.14)`,
                  border: `1px solid rgba(${m.colorRgb},0.267)`,
                }}
              >
                <ModuleIcon name={m.icon} size={21} style={{ color: m.color }} />
              </div>
              <span className="text-[0.7rem] text-white/45">{`${m.count} مورد`}</span>
            </div>
            <h3 className="font-bold mt-4">{m.title}</h3>
            <p className="text-[0.78rem] text-white/50 mt-1.5 leading-6">{m.description}</p>
            <div
              className="flex items-center gap-1.5 mt-4 text-[0.75rem]"
              style={{ color: m.color }}
            >
              ورود به ماژول
              <Icons.ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
