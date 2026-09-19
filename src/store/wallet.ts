import { getCurrentUser, updateUserBalance, getUserById } from './auth'

export const VISIT_COST = 5000

export function canShowListing(ownerId: string): boolean {
  const owner = getUserById(ownerId)
  if (!owner) return true
  if (owner.role === 'admin') return true
  return owner.walletBalance >= VISIT_COST
}

export function recordVisit(
  _listingId: string,
  _listingTitle: string,
  ownerId: string,
  _pageUrl: string
): { ok: boolean; reason?: string } {
  const visitor = getCurrentUser()
  if (!visitor) return { ok: false, reason: 'login_required' }
  if (visitor.id === ownerId || visitor.role === 'admin') return { ok: true }
  const owner = getUserById(ownerId)
  if (!owner) return { ok: false, reason: 'owner_not_found' }
  if (owner.walletBalance < VISIT_COST) return { ok: false, reason: 'insufficient_balance' }
  void updateUserBalance(ownerId, owner.walletBalance - VISIT_COST)
  return { ok: true }
}

export function chargeWallet(userId: string, amount: number): boolean {
  const user = getUserById(userId)
  if (!user || amount <= 0) return false
  void updateUserBalance(userId, user.walletBalance + amount)
  return true
}

export function getVisits() { return [] }
export function getVisitsByOwner(_ownerId: string) { return [] }
export function getTransactions(_userId: string) { return [] }
