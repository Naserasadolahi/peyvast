import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import MobileHeader from './components/MobileHeader'
import Home from './pages/Home'
import ModulePage from './pages/ModulePage'
import ListingDetail from './pages/ListingDetail'
import NewListing from './pages/NewListing'
import Placeholder from './pages/Placeholder'
import NewAdChooser from './pages/NewAdChooser'
import Login from './pages/Login'
import Wallet from './pages/Wallet'
import Messages from './pages/Messages'
import ChatRoom from './pages/ChatRoom'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div dir="rtl" className="h-full flex bg-grid">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <MobileHeader />
        <main className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full overflow-y-auto px-4 md:px-8 pt-5 md:pt-8 pb-[calc(70px+env(safe-area-inset-bottom,0px)+1rem)] md:pb-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/m/:id" element={<ModulePage />} />
              <Route path="/m/:id/new" element={<NewListing />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/chat/:id" element={<ChatRoom />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/new" element={<NewAdChooser />} />
              <Route path="/mine" element={<Placeholder title="آگهی‌های من" />} />
              <Route path="/requests" element={<Placeholder title="درخواست‌های همکاری" />} />
              <Route path="*" element={<Placeholder title="صفحه یافت نشد" description="۴۰۴" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}
