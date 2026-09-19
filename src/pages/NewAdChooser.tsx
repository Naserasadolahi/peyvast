import { Link } from 'react-router-dom'
import { modules } from '../data'
import { ModuleIcon } from '../components/Icons'

export default function NewAdChooser() {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">ثبت آگهی جدید</h1>
      <p className="text-white/50 text-sm mb-8">
        مشخص کنید آگهی‌تان مربوط به کدام بخش است:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {modules.map((m) => (
          <div key={m.id} className="card p-5 hover:border-white/25 transition-colors">
            <div className="flex items-start gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: `rgba(${m.colorRgb},0.14)`,
                  border: `1px solid rgba(${m.colorRgb},0.27)`,
                }}
              >
                <ModuleIcon name={m.icon} size={21} style={{ color: m.color }} />
              </div>
              <div>
                <h3 className="font-bold">{m.title}</h3>
                <p className="text-[0.75rem] text-white/45 mt-1 leading-5">{m.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/m/${m.id}/new?side=offer`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold"
                style={{ background: m.color, color: '#14110a' }}
              >
                ارائه‌دهنده
              </Link>
              <Link
                to={`/m/${m.id}/new?side=demand`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm border border-white/15 text-white/70 hover:bg-white/5"
              >
                متقاضی
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
