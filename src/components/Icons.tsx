import {
  House,
  Users,
  HardHat,
  Truck,
  Package,
  GraduationCap,
  CirclePlus,
  FolderOpen,
  Handshake,
  Wallet,
  CircleUserRound,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Search,
  SlidersHorizontal,
  Layers,
} from 'lucide-react'

export const Icons = {
  House,
  Users,
  HardHat,
  Truck,
  Package,
  GraduationCap,
  CirclePlus,
  FolderOpen,
  Handshake,
  Wallet,
  CircleUserRound,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Search,
  SlidersHorizontal,
  Layers,
}

export function ModuleIcon({ name, size = 21, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const map: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>> = {
    users: Users,
    'hard-hat': HardHat,
    truck: Truck,
    package: Package,
    'graduation-cap': GraduationCap,
  }
  const Icon = map[name] || Users
  return <Icon size={size} style={style} />
}
