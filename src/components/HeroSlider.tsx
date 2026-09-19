import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icons, ModuleIcon } from './Icons'
import { modules, listings } from '../data'

const slides = [
  {
    type: 'main' as const,
    title: (
      <>
        هر نیاز پروژه، <span className="text-primary">یک تأمین‌کننده</span> دارد
      </>
    ),
    subtitle: 'متخصصین، پیمانکاران، ماشین‌آلات، کالا و منابع تکنیکال — در یک پلتفرم.',
    badge: 'بازار دوجانبه پروژه‌ها',
  },
  ...modules.map((m) => ({
    type: 'module' as const,
    module: m,
  })),
  ...listings.slice(0, 3).map((l) => ({
    type: 'listing' as const,
    listing: l,
  })),
]

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 5500)
    return () => clearInterval(t)
  }, [total])

  const go = (dir: number) => setIndex((i) => (i + dir + total) % total)

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 h-[330px] md:h-[400px]">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full h-full shrink-0" dir="rtl">
            {slide.type === 'main' && (
              <div className="relative w-full h-full p-6 md:p-10 flex flex-col justify-center overflow-hidden">
                <div
                  className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-50"
                  style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4), transparent 70%)' }}
                />
                <div
                  className="absolute -bottom-28 -right-20 w-80 h-80 rounded-full blur-3xl opacity-40"
                  style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.33), transparent 70%)' }}
                />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 text-[0.7rem] px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/25">
                    <Icons.Sparkles size={12} />
                    {slide.badge}
                  </div>
                  <h1 className="font-display text-3xl md:text-5xl mt-3 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-white/60 text-[0.85rem] md:text-base mt-2.5 max-w-2xl leading-7">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 mt-5">
                    <Link
                      to="/new"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-[#14110a] font-bold text-sm"
                    >
                      <Icons.Plus size={17} />
                      ثبت آگهی / رزومه
                    </Link>
                    <Link
                      to="/m/talent"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/15 bg-white/8 text-sm"
                    >
                      جستجوی متخصصین
                      <Icons.ArrowLeft size={16} />
                    </Link>
                  </div>
                  <div className="mt-4 text-[0.74rem] text-white/45">
                    ۸ آگهی فعال · امروز ۲۸ شهریور ۱۴۰۵
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'module' && (
              <div
                className="relative w-full h-full p-6 md:p-10 flex flex-col justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(${slide.module.colorRgb},0.15), rgba(255,255,255,0.02) 60%)`,
                }}
              >
                <div
                  className="absolute -top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-50"
                  style={{
                    background: `radial-gradient(circle, rgba(${slide.module.colorRgb},0.33), transparent 70%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `rgba(${slide.module.colorRgb},0.17)`,
                      border: `1px solid rgba(${slide.module.colorRgb},0.33)`,
                    }}
                  >
                    <ModuleIcon name={slide.module.icon} size={26} style={{ color: slide.module.color }} />
                  </div>
                  <div className="mt-4 text-[0.72rem]" style={{ color: slide.module.color }}>
                    ماژول تأمین
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl mt-1 leading-tight">
                    {slide.module.title}
                  </h2>
                  <p className="text-white/65 text-[0.85rem] md:text-base mt-2 max-w-xl leading-7">
                    {slide.module.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 mt-5">
                    <Link
                      to={`/m/${slide.module.id}`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm"
                      style={{ background: slide.module.color, color: '#12100a' }}
                    >
                      مشاهده و جستجو
                      <Icons.ArrowLeft size={16} />
                    </Link>
                    <Link
                      to={`/m/${slide.module.id}/new`}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/15 bg-white/8 text-sm"
                    >
                      <Icons.Plus size={15} />
                      ثبت
                    </Link>
                  </div>
                  <div className="mt-4 text-[0.74rem] text-white/50">
                    {slide.module.count} مورد ثبت‌شده
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'listing' && (
              <Link
                to={`/listing/${slide.listing.id}`}
                className="block relative w-full h-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#070b12]/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
                <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-9">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[0.68rem] px-2.5 py-1 rounded-full border backdrop-blur-sm"
                      style={{
                        color: modules.find((m) => m.id === slide.listing.module)?.color,
                        borderColor: `${modules.find((m) => m.id === slide.listing.module)?.color}77`,
                        background: 'rgba(0,0,0,0.45)',
                      }}
                    >
                      ارائه‌دهنده
                    </span>
                    <span className="text-[0.7rem] px-2.5 py-1 rounded-full bg-black/45 border border-white/15 text-white/80">
                      {modules.find((m) => m.id === slide.listing.module)?.title}
                    </span>
                    <span className="text-[0.7rem] text-white/60">· {slide.listing.timeAgo}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl mt-2.5 leading-tight line-clamp-2">
                    {slide.listing.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {slide.listing.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[0.7rem] px-2 py-0.5 rounded-lg bg-white/12 border border-white/15 text-white/85"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-3 flex-wrap mt-3">
                    <div className="flex items-center gap-3.5 text-[0.78rem] text-white/75">
                      <span className="inline-flex items-center gap-1">
                        <Icons.MapPin size={13} />
                        {slide.listing.location}
                      </span>
                    </div>
                    {slide.listing.price && (
                      <span
                        className="font-bold text-sm md:text-base"
                        style={{ color: modules.find((m) => m.id === slide.listing.module)?.color }}
                      >
                        {slide.listing.price}
                        <span className="font-normal text-white/60 text-[0.72rem] mr-1">
                          {slide.listing.priceUnit}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}
      </div>

      <button
        aria-label="قبلی"
        onClick={() => go(-1)}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 border border-white/15 items-center justify-center hover:bg-black/70 transition-colors z-10"
      >
        <Icons.ChevronLeft size={18} />
      </button>
      <button
        aria-label="بعدی"
        onClick={() => go(1)}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/45 border border-white/15 items-center justify-center hover:bg-black/70 transition-colors z-10"
      >
        <Icons.ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`اسلاید ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? 22 : 7,
              background: i === index ? 'var(--color-primary)' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
