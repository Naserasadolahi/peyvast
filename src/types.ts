export type ModuleId = 'talent' | 'contractor' | 'equipment' | 'goods' | 'technical'
export type Side = 'offer' | 'demand'

export interface ModuleInfo {
  id: ModuleId
  title: string
  description: string
  color: string
  colorRgb: string
  count: number
  icon: string
}

export interface Listing {
  id: string
  module: ModuleId
  title: string
  side: Side
  tags: string[]
  location: string
  price?: string
  priceUnit?: string
  timeAgo: string
  createdAt: string
  description?: string
  jobGroup?: string
  employmentType?: string
  education?: string
  experience?: string
  serviceType?: string
  field?: string
  rank?: string
  category?: string
  dealType?: string
  condition?: string
  unit?: string
  techType?: string
  delivery?: string
}

export interface ListingFormData {
  title: string
  side: Side
  location: string
  description: string
  price: string
  priceUnit: string
  tags: string[]
  jobGroup?: string
  employmentType?: string
  education?: string
  experience?: string
  serviceType?: string
  field?: string
  rank?: string
  category?: string
  dealType?: string
  condition?: string
  unit?: string
  techType?: string
  delivery?: string
}
