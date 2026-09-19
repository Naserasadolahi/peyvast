import { Link } from 'react-router-dom'
import { Icons } from './Icons'
import type { Listing } from '../types'
import { modules } from '../data'

interface Props {
  listing: Listing
  compact?: boolean
}

export default function ListingCard({ listing, compact }: Props) {
  const mod = modules.find((m) => m.id === listing.module)
  const color = mod?.color || '#f59e0b'

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="card p-4 hover:border-white/25 transition-colors group block"
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="text-[0.68rem] px-2 py-0.5 rounded-full border"
          style={{
            color,
            borderColor: `${color}77`,
            background: 'rgba(0,0,0,0.35)',
          }}
        >
          {listing.side === 'offer' ? 'ارائه' : 'متقاضی'}
        </span>
        {listing.price && (
          <span className="font-bold text-sm" style={{ color }}>
            {listing.price}
            <span className="font-normal text-white/60 text-[0.72rem] mr-1">
              {listing.priceUnit}
            </span>
          </span>
        )}
      </div>

      <h3 className="font-bold mt-3 text-[0.95rem] leading-snug line-clamp-2">
        {listing.title}
      </h3>

      <div className="flex flex-wrap gap-1.5 mt-2.5">
        {listing.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[0.7rem] px-2 py-0.5 rounded-lg bg-white/10 border border-white/10 text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-3 text-[0.75rem] text-white/55">
        <span className="inline-flex items-center gap-1">
          <Icons.MapPin size={12} />
          {listing.location}
        </span>
        <span>· {listing.timeAgo}</span>
      </div>
    </Link>
  )
}
