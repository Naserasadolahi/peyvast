import { useParams, Link } from 'react-router-dom'
import { modules, listings } from '../data'
import ListingCard from '../components/ListingCard'
import { Icons, ModuleIcon } from '../components/Icons'

export default function ModulePage() {
  const { id } = useParams<{ id: string }>()
  const mod = modules.find((m) => m.id === id)

  if (!mod) {
    return (
      <div className="text-center py-20 text-white/50">
        ماژول یافت نشد
        <br />
        <Link to="/" className="text-primary mt-4 inline-block">
          بازگشت به خانه
        </Link>
      </div>
    )
  }

  const items = listings.filter((l) => l.module === mod.id)

  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: `rgba(${mod.colorRgb},0.17)`,
              border: `1px solid rgba(${mod.colorRgb},0.33)`,
            }}
          >
            <ModuleIcon name={mod.icon} size={24} style={{ color: mod.color }} />
          </div>
          <div>
            <h1 className="font-display text-2xl md:text-3xl">{mod.title}</h1>
            <p className="text-[0.8rem] text-white/50 mt-0.5">{mod.description}</p>
          </div>
        </div>
        <Link
          to={`/m/${mod.id}/new`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm self-start"
          style={{ background: mod.color, color: '#14110a' }}
        >
          <Icons.Plus size={17} />
          ثبت {mod.id === 'talent' ? 'رزومه' : 'آگهی'}
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-5">
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium border"
          style={{
            background: `rgba(${mod.colorRgb},0.15)`,
            color: mod.color,
            borderColor: `rgba(${mod.colorRgb},0.3)`,
          }}
        >
          ارائه‌دهندگان
        </button>
        <button className="px-4 py-2 rounded-xl text-sm text-white/60 border border-white/10 hover:bg-white/5">
          متقاضیان
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm text-white/70 hover:bg-white/8">
          <Icons.SlidersHorizontal size={16} />
          فیلترها
        </button>
        <div className="flex-1 relative">
          <Icons.Search
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
          <input
            type="text"
            placeholder="جستجو در عنوان، توضیحات، مهارت..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-sm placeholder:text-white/35 focus:outline-none focus:border-white/25"
          />
        </div>
      </div>

      <div className="text-[0.8rem] text-white/45 mb-4">{items.length} نتیجه</div>

      {items.length === 0 ? (
        <div className="card p-12 text-center text-white/40">
          هنوز آگهی‌ای در این ماژول ثبت نشده است.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      )}
    </div>
  )
}
