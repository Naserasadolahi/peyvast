import type { ModuleInfo, Listing, ModuleId, Side } from './types'

export const modules: ModuleInfo[] = [
  {
    id: 'talent',
    title: 'نیروی انسانی',
    description: 'رزومه متخصصین و نیازهای نیروی پروژه',
    color: '#f59e0b',
    colorRgb: '245, 158, 11',
    count: 4,
    icon: 'users',
  },
  {
    id: 'contractor',
    title: 'پیمانکاران',
    description: 'پیمانکاران اجرایی، مشاوره و خدمات',
    color: '#38bdf8',
    colorRgb: '56, 189, 248',
    count: 3,
    icon: 'hard-hat',
  },
  {
    id: 'equipment',
    title: 'ماشین‌آلات و تجهیزات',
    description: 'اجاره و فروش ماشین‌آلات سنگین و تجهیزات',
    color: '#facc15',
    colorRgb: '250, 204, 21',
    count: 0,
    icon: 'truck',
  },
  {
    id: 'goods',
    title: 'کالا و تأمین',
    description: 'کالاها و اقلام بخش تأمین',
    color: '#2dd4bf',
    colorRgb: '45, 212, 191',
    count: 0,
    icon: 'package',
  },
  {
    id: 'technical',
    title: 'نیازمندی‌های تکنیکال',
    description: 'دوره‌ها، نرم‌افزارها، استانداردها و منابع فنی',
    color: '#a78bfa',
    colorRgb: '167, 139, 250',
    count: 1,
    icon: 'graduation-cap',
  },
]

const STORAGE_KEY = 'peyvast_listings'

const SEED: Listing[] = [
  {
    id: '1',
    module: 'talent',
    title: 'مدیر کارگاه',
    side: 'offer',
    tags: ['مهندسی عمران', '۱۲ سال', 'تمام‌وقت'],
    location: 'خوزستان',
    price: '۲۰۰',
    priceUnit: 'میلیون تومان',
    timeAgo: '۵ ساعت پیش',
    createdAt: new Date().toISOString(),
    ownerId: 'admin-1',
  },
  {
    id: '2',
    module: 'technical',
    title: 'آموزش پریمورا P6',
    side: 'offer',
    tags: ['نرم‌افزار', 'مدیریت پروژه'],
    location: 'تهران',
    price: '۵۰۰,۰۰۰',
    priceUnit: 'تومان',
    timeAgo: '۵ ساعت پیش',
    createdAt: new Date().toISOString(),
    ownerId: 'admin-1',
  },
  {
    id: '3',
    module: 'contractor',
    title: 'طاعتی',
    side: 'offer',
    tags: ['خدمات', 'بدون رتبه'],
    location: 'خوزستان',
    timeAgo: '۶ ساعت پیش',
    createdAt: new Date().toISOString(),
    ownerId: 'admin-1',
  },
]

function loadListings(): Listing[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Listing[]
  } catch {
    /* ignore */
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED))
  return [...SEED]
}

function saveListings(items: Listing[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const listings = SEED

export function getListings(): Listing[] {
  return loadListings()
}

export function getListingsByModule(moduleId: ModuleId, side?: Side): Listing[] {
  let items = loadListings().filter((l) => l.module === moduleId)
  if (side) items = items.filter((l) => l.side === side)
  return items
}

export function getListingById(id: string): Listing | undefined {
  return loadListings().find((l) => l.id === id)
}

export function addListing(
  listing: Omit<Listing, 'id' | 'timeAgo' | 'createdAt'>
): Listing {
  const items = loadListings()
  const newItem: Listing = {
    ...listing,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    timeAgo: 'همین الان',
  }
  items.unshift(newItem)
  saveListings(items)
  return newItem
}
