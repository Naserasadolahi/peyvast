import { Link } from 'react-router-dom'

interface Props {
  title: string
  description?: string
}

export default function Placeholder({ title, description }: Props) {
  return (
    <div className="max-w-2xl mx-auto w-full text-center py-20">
      <h1 className="font-display text-3xl mb-3">{title}</h1>
      {description && <p className="text-white/50 mb-8">{description}</p>}
      <p className="text-white/40 text-sm mb-6">
        این بخش در نسخه کامل پیاده‌سازی خواهد شد.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-[#14110a] font-bold text-sm"
      >
        بازگشت به خانه
      </Link>
    </div>
  )
}
