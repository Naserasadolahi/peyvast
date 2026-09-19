import { useState } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { modules, addListing } from '../data'
import { Icons, ModuleIcon } from '../components/Icons'
import type { Side, ModuleId } from '../types'
import { getCurrentUser } from '../store/auth'
import {
  provinces,
  talentOptions,
  contractorOptions,
  equipmentOptions,
  goodsOptions,
  technicalOptions,
  getFormTitle,
} from '../data/options'

export default function NewListing() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const mod = modules.find((m) => m.id === id)
  const side = (searchParams.get('side') as Side) || 'offer'

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [priceUnit, setPriceUnit] = useState('میلیون تومان')
  const [jobGroup, setJobGroup] = useState('')
  const [category, setCategory] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [goodsCategory, setGoodsCategory] = useState('')
  const [techType, setTechType] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!mod) {
    return (
      <div className="text-center py-20 text-white/50">
        ماژول یافت نشد
        <Link to="/" className="text-primary mt-4 block">بازگشت</Link>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/30'
  const selectClass =
    'w-full px-4 py-3 rounded-xl border border-white/10 bg-[#12161f] text-sm text-white focus:outline-none focus:border-white/30 appearance-none'
  const labelClass = 'block text-[0.78rem] text-white/55 mb-1.5'

  const buildTags = (): string[] => {
    const tags: string[] = []
    const cat = jobGroup || category || serviceType || goodsCategory || techType
    if (cat) tags.push(cat)
    return tags
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('عنوان الزامی است')
      return
    }
    const current = getCurrentUser()
    if (!current) {
      alert('برای ثبت آگهی ابتدا وارد شوید')
      navigate('/login')
      return
    }
    const listing = addListing({
      module: mod.id as ModuleId,
      ownerId: current.id,
      ownerName: current.name || current.username,
      title: title.trim(),
      side,
      tags: buildTags(),
      location: location || 'تهران',
      price: price || undefined,
      priceUnit: price ? priceUnit : undefined,
      description: description || undefined,
      jobGroup: jobGroup || undefined,
      category: category || goodsCategory || undefined,
      serviceType: serviceType || undefined,
      techType: techType || undefined,
    })
    setSubmitted(true)
    setTimeout(() => navigate('/listing/' + listing.id), 800)
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-2xl font-bold text-primary mb-2">آگهی ثبت شد</div>
        <p className="text-white/50 text-sm">در حال انتقال...</p>
      </div>
    )
  }

  const opts =
    mod.id === 'talent'
      ? talentOptions.jobGroups
      : mod.id === 'contractor'
        ? contractorOptions.serviceTypes
        : mod.id === 'equipment'
          ? equipmentOptions.categories
          : mod.id === 'goods'
            ? goodsOptions.categories
            : technicalOptions.types

  const catValue = jobGroup || category || goodsCategory || serviceType || techType
  const setCat = (v: string) => {
    if (mod.id === 'talent') setJobGroup(v)
    else if (mod.id === 'contractor') setServiceType(v)
    else if (mod.id === 'equipment') setCategory(v)
    else if (mod.id === 'goods') setGoodsCategory(v)
    else setTechType(v)
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      <Link
        to={'/m/' + mod.id}
        className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 mb-6"
      >
        <Icons.ArrowLeft size={16} />
        بازگشت به {mod.title}
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{
            background: 'rgba(' + mod.colorRgb + ',0.15)',
            border: '1px solid rgba(' + mod.colorRgb + ',0.3)',
          }}
        >
          <ModuleIcon name={mod.icon} size={22} style={{ color: mod.color }} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">{getFormTitle(mod.id, side)}</h1>
          <p className="text-sm text-white/45">
            {side === 'offer' ? 'ارائه‌دهنده' : 'متقاضی'}
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className={labelClass}>عنوان *</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="عنوان آگهی"
          />
        </div>
        <div>
          <label className={labelClass}>استان / موقعیت</label>
          <select
            className={selectClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">انتخاب</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>دسته‌بندی / گروه</label>
          <select className={selectClass} value={catValue} onChange={(e) => setCat(e.target.value)}>
            <option value="">انتخاب</option>
            {opts.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>قیمت</label>
            <input
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="مثلاً 50"
            />
          </div>
          <div>
            <label className={labelClass}>واحد</label>
            <input
              className={inputClass}
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>توضیحات</label>
          <textarea
            className={inputClass + ' min-h-[100px]'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl font-bold text-sm"
          style={{ background: mod.color, color: '#14110a' }}
        >
          ثبت آگهی
        </button>
      </form>
    </div>
  )
}
