export type ModuleId = 'talent' | 'contractor' | 'equipment' | 'goods' | 'technical'

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
  side: 'offer' | 'demand'
  tags: string[]
  location: string
  price?: string
  priceUnit?: string
  timeAgo: string
  image?: string
  avatar?: string
  experience?: string
  education?: string
  employmentType?: string
}
