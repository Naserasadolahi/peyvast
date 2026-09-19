import { supabase, isSupabaseConfigured } from '../lib/supabase'

export interface User {
  id: string
  username: string
  name: string
  role: 'admin' | 'user'
  walletBalance: number
  createdAt: string
}

const USERS_KEY = 'peyvast_users'
const SESSION_KEY = 'peyvast_session'

const ADMIN: User = {
  id: 'admin-1',
  username: 'naser.asadolahi',
  name: '\u0646\u0627\u0635\u0631 \u0627\u0633\u062f\u0627\u0644\u0647\u06cc',
  role: 'admin',
  walletBalance: 10_000_000,
  createdAt: new Date().toISOString(),
}

function loadUsersLocal(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (raw) {
      const list = JSON.parse(raw) as User[]
      if (!list.find((u) => u.username === ADMIN.username)) {
        list.unshift(ADMIN)
        localStorage.setItem(USERS_KEY, JSON.stringify(list))
      }
      return list
    }
  } catch { /* */ }
  localStorage.setItem(USERS_KEY, JSON.stringify([ADMIN]))
  return [ADMIN]
}

function saveUsersLocal(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function mapProfile(row: Record<string, unknown>): User {
  return {
    id: String(row.id),
    username: String(row.username || ''),
    name: String(row.name || row.username || ''),
    role: (row.role === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
    walletBalance: Number(row.wallet_balance ?? 0),
    createdAt: String(row.created_at || new Date().toISOString()),
  }
}

function cacheUser(user: User | null) {
  if (user) localStorage.setItem('peyvast_sb_user', JSON.stringify(user))
  else localStorage.removeItem('peyvast_sb_user')
}

export function getCurrentUser(): User | null {
  try {
    if (isSupabaseConfigured) {
      const cached = localStorage.getItem('peyvast_sb_user')
      if (cached) return JSON.parse(cached) as User
      return null
    }
    const id = localStorage.getItem(SESSION_KEY)
    if (!id) return null
    return loadUsersLocal().find((u) => u.id === id) || null
  } catch {
    return null
  }
}

export async function login(
  username: string,
  password: string
): Promise<{ ok: boolean; error?: string; user?: User }> {
  if (isSupabaseConfigured && supabase) {
    const email = username.includes('@')
      ? username
      : `${username.replace(/[^a-zA-Z0-9._-]/g, '_')}@peyvast.local`

    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const signUp = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username, name: username } },
      })
      if (signUp.error) {
        return { ok: false, error: signUp.error.message || '\u062e\u0637\u0627 \u062f\u0631 \u0648\u0631\u0648\u062f/\u062b\u0628\u062a\u200c\u0646\u0627\u0645' }
      }
      data = signUp.data
      if (!data.session) {
        const again = await supabase.auth.signInWithPassword({ email, password })
        data = again.data
        if (again.error) {
          return {
            ok: false,
            error:
              '\u062b\u0628\u062a\u200c\u0646\u0627\u0645 \u0627\u0646\u062c\u0627\u0645 \u0634\u062f. \u0627\u06af\u0631 \u062a\u0623\u06cc\u06cc\u062f \u0627\u06cc\u0645\u06cc\u0644 \u0641\u0639\u0627\u0644 \u0627\u0633\u062a\u060c \u0627\u0632 \u067e\u0646\u0644 Supabase \u0622\u0646 \u0631\u0627 \u062e\u0627\u0645\u0648\u0634 \u06a9\u0646\u06cc\u062f.',
          }
        }
      }
    }

    if (!data.user) return { ok: false, error: '\u0648\u0631\u0648\u062f \u0646\u0627\u0645\u0648\u0641\u0642' }

    if (username === 'naser.asadolahi') {
      await supabase.from('profiles').update({ role: 'admin', wallet_balance: 10_000_000 }).eq('id', data.user.id)
    }

    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
    const user = profile
      ? mapProfile(profile)
      : {
          id: data.user.id,
          username,
          name: username,
          role: (username === 'naser.asadolahi' ? 'admin' : 'user') as 'admin' | 'user',
          walletBalance: username === 'naser.asadolahi' ? 10_000_000 : 50_000,
          createdAt: new Date().toISOString(),
        }
    cacheUser(user)
    return { ok: true, user }
  }

  const users = loadUsersLocal()
  if (username === 'naser.asadolahi' && password === '@Naser41167') {
    const admin = users.find((u) => u.username === 'naser.asadolahi') || ADMIN
    localStorage.setItem(SESSION_KEY, admin.id)
    return { ok: true, user: admin }
  }
  const user = users.find((u) => u.username === username)
  if (user && password === username) {
    localStorage.setItem(SESSION_KEY, user.id)
    return { ok: true, user }
  }
  if (!user && username.trim().length >= 3) {
    const newUser: User = {
      id: crypto.randomUUID(),
      username: username.trim(),
      name: username.trim(),
      role: 'user',
      walletBalance: 50_000,
      createdAt: new Date().toISOString(),
    }
    users.push(newUser)
    saveUsersLocal(users)
    localStorage.setItem(SESSION_KEY, newUser.id)
    return { ok: true, user: newUser }
  }
  return { ok: false, error: '\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u06cc\u0627 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u0627\u0634\u062a\u0628\u0627\u0647 \u0627\u0633\u062a' }
}

export async function logout() {
  if (isSupabaseConfigured && supabase) await supabase.auth.signOut()
  localStorage.removeItem(SESSION_KEY)
  cacheUser(null)
}

export async function updateUserBalance(userId: string, newBalance: number) {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('profiles').update({ wallet_balance: newBalance }).eq('id', userId)
    const cur = getCurrentUser()
    if (cur && cur.id === userId) cacheUser({ ...cur, walletBalance: newBalance })
    return
  }
  const users = loadUsersLocal()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx >= 0) {
    users[idx].walletBalance = newBalance
    saveUsersLocal(users)
  }
}

export function getAllUsers(): User[] {
  return loadUsersLocal()
}

export function getUserById(id: string): User | undefined {
  return loadUsersLocal().find((u) => u.id === id)
}
