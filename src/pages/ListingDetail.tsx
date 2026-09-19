import { useParams, Link } from 'react-router-dom'
import { listings, modules } from '../data'
import { Icons } from '../components/Icons'

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>()
  const listing = listings.find((l) => l.id === id)
  const mod = listing ? modules.find((m) => m.id === listing.module) : null

  if (!listing || !mod) {
    return (
      <div className="text-center py-20 text-white/50">
        آگهی یافت نشد
        <br />
        <Link to="/" className="text-primary mt-4 inline-block">
          بازگشت به خانه
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <Link
        to={`/m/${listing.module}`}
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 mb-6"
      >
        <Icons.ArrowLeft size={16} />
        بازگشت به {mod.title}
      </Link>

      <div className="card p-6 md:p-8">
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span
            className="text-[0.7rem] px-2.5 py-1 rounded-full border"
            style={{
              color: mod.color,
              borderColor: `${mod.color}77`,
              background: 'rgba(0,0,0,0.35)',
            }}
          >
            {listing.side === 'offer' ? 'ارائه‌دهنده' : 'متقاضی'}
          </span>
          <span className="text-[0.7rem] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/80">
            {mod.title}
          </span>
          <span className="text-[0.7rem] text-white/50">· {listing.timeAgo}</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl leading-tight mb-4">
          {listing.title}
        </h1>

        <div className="flex flex-wrap gap-2 mb-6">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-[0.75rem] px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-white/85"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-white/60 mb-8">
          <span className="inline-flex items-center gap-1.5">
            <Icons.MapPin size={15} />
            {listing.location}
          </span>
        </div>

        {listing.price && (
          <div className="mb-8">
            <div className="text-sm text-white/50 mb-1">قیمت / دستمزد</div>
            <div className="text-2xl font-bold" style={{ color: mod.color }}>
              {listing.price}{' '}
              <span className="text-base font-normal text-white/60">
                {listing.priceUnit}
              </span>
            </div>
          </div>
        )}

        <div className="border-t border-white/10 pt-6">
          <button
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm"
            style={{ background: mod.color, color: '#14110a' }}
          >
            ارسال درخواست همکاری
          </button>
        </div>
      </div>
    </div>
  )
}
