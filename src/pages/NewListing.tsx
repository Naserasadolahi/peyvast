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
  const [priceUnit, setPriceUnit] = useState('\u0645\u06cc\u0644\u06cc\u0648\u0646 \u062a\u0648\u0645\u0627\u0646')
  const [jobGroup, setJobGroup] = useState('')
  const [employmentType, setEmploymentType] = useState('')
  const [education, setEducation] = useState('')
  const [experience, setExperience] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [field, setField] = useState('')
  const [rank, setRank] = useState('')
  const [category, setCategory] = useState('')
  const [dealType, setDealType] = useState('')
  const [condition, setCondition] = useState('')
  const [goodsCategory, setGoodsCategory] = useState('')
  const [unit, setUnit] = useState('')
  const [techType, setTechType] = useState('')
  const [delivery, setDelivery] = useState('')
  const [techField, setTechField] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!mod) {
    return (
      <div className="text-center py-20 text-white/50">
        \u0645\u0627\u0698\u0648\u0644 \u06cc\u0627\u0641\u062a \u0646\u0634\u062f
        <Link to="/" className="text-primary mt-4 block">\u0628\u0627\u0632\u06af\u0634\u062a</Link>
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
    if (mod.id === 'talent') {
      if (jobGroup) tags.push(jobGroup)
      if (experience) tags.push(experience + ' \u0633\u0627\u0644')
      if (employmentType) tags.push(employmentType)
      if (education) tags.push(education)
    }
    if (mod.id === 'contractor') {
      if (serviceType) tags.push(serviceType)
      if (field) tags.push(field)
      if (rank) tags.push(rank)
    }
    if (mod.id === 'equipment') {
      if (category) tags.push(category)
      if (dealType) tags.push(dealType)
      if (condition) tags.push(condition)
    }
    if (mod.id === 'goods') {
      if (goodsCategory) tags.push(goodsCategory)
      if (unit) tags.push(unit)
    }
    if (mod.id === 'technical') {
      if (techType) tags.push(techType)
      if (techField) tags.push(techField)
      if (delivery) tags.push(delivery)
    }
    return tags
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0632\u0627\u0645\u06cc \u0627\u0633\u062a')
      return
    }
    const current = getCurrentUser()
    if (!current) {
      alert('\u0628\u0631\u0627\u06cc \u062b\u0628\u062a \u0622\u06af\u0647\u06cc \u0627\u0628\u062a\u062f\u0627 \u0648\u0627\u0631\u062f \u0634\u0648\u06cc\u062f')
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
      location: location || '\u062a\u0647\u0631\u0627\u0646',
      price: price || undefined,
      priceUnit: price ? priceUnit : undefined,
      description: description || undefined,
      jobGroup: jobGroup || undefined,
      employmentType: employmentType || undefined,
      education: education || undefined,
      experience: experience || undefined,
      serviceType: serviceType || undefined,
      field: field || undefined,
      rank: rank || undefined,
      category: category || goodsCategory || undefined,
      dealType: dealType || undefined,
      condition: condition || undefined,
      unit: unit || undefined,
      techType: techType || undefined,
      delivery: delivery || undefined,
    })
    setSubmitted(true)
    setTimeout(() => navigate('/listing/' + listing.id), 800)
  }

  if (submitted) {
    return (
      <div className="text-center py-20">
        <div className="text-2xl font-bold text-primary mb-2">\u0622\u06af\u0647\u06cc \u062b\u0628\u062a \u0634\u062f</div>
        <p className="text-white/50 text-sm">\u062f\u0631 \u062d\u0627\u0644 \u0627\u0646\u062a\u0642\u0627\u0644...</p>
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

  return (
    <div className="max-w-2xl mx-auto w-full">
      <Link to={'/m/' + mod.id} className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 mb-6">
        <Icons.ArrowLeft size={16} />
        \u0628\u0627\u0632\u06af\u0634\u062a \u0628\u0647 {mod.title}
      </Link>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(' + mod.colorRgb + ',0.15)', border: '1px solid rgba(' + mod.colorRgb + ',0.3)' }}
        >
          <ModuleIcon name={mod.icon} size={22} style={{ color: mod.color }} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold">{getFormTitle(mod.id, side)}</h1>
          <p className="text-sm text-white/45">{side === 'offer' ? '\u0627\u0631\u0627\u0626\u0647\u200c\u062f\u0647\u0646\u062f\u0647' : '\u0645\u062a\u0642\u0627\u0636\u06cc'}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className={labelClass}>\u0639\u0646\u0648\u0627\u0646 *</label>
          <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="\u0639\u0646\u0648\u0627\u0646 \u0622\u06af\u0647\u06cc" />
        </div>
        <div>
          <label className={labelClass}>\u0627\u0633\u062a\u0627\u0646 / \u0645\u0648\u0642\u0639\u06cc\u062a</label>
          <select className={selectClass} value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">\u0627\u0646\u062a\u062e\u0627\u0628</option>
            {provinces.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>\u062f\u0633\u062a\u0647\u200c\u0628\u0646\u062f\u06cc / \u06af\u0631\u0648\u0647</label>
          <select
            className={selectClass}
            value={jobGroup || category || goodsCategory || serviceType || techType}
            onChange={(e) => {
              const v = e.target.value
              if (mod.id === 'talent') setJobGroup(v)
              else if (mod.id === 'contractor') setServiceType(v)
              else if (mod.id === 'equipment') setCategory(v)
              else if (mod.id === 'goods') setGoodsCategory(v)
              else setTechType(v)
            }}
          >
            <option value="">\u0627\u0646\u062a\u062e\u0627\u0628</option>
            {opts.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>\u0642\u06cc\u0645\u062a</label>
            <input className={inputClass} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="\u0645\u062b\u0644\u0627\u064b 50" />
          </div>
          <div>
            <label className={labelClass}>\u0648\u0627\u062d\u062f</label>
            <input className={inputClass} value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} />
          </div>
        </div>
        <div>
          <label className={labelClass}>\u062a\u0648\u0636\u06cc\u062d\u0627\u062a</label>
          <textarea className={inputClass + ' min-h-[100px]'} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="w-full py-3.5 rounded-2xl font-bold text-sm" style={{ background: mod.color, color: '#14110a' }}>
          \u062b\u0628\u062a \u0622\u06af\u0647\u06cc
        </button>
      </form>
    </div>
  )
}
