/**
 * Get initials from a full name (e.g. 'Eka Wahyu' -> 'EW').
 * Returns up to 2 uppercase characters.
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Get Badge variant string based on transaction/referral status.
 */
export function getBadgeVariant(status) {
  const map = {
    'Menunggu': 'warning',
    'Diproses': 'info',
    'Siap Diambil': 'primary',
    'Selesai': 'success',
    'Dibatalkan': 'danger',
    'Aktif': 'success',
    'Masuk': 'info',
  };
  return map[status] || 'default';
}

/**
 * Get priority color classes for referral priority badges.
 */
export function getPriorityColor(priority) {
  switch (priority) {
    case 'Darurat': return 'bg-red-100 text-red-700  ';
    case 'Segera': return 'bg-amber-100 text-amber-700  ';
    default: return 'bg-emerald-100 text-emerald-700  ';
  }
}

/**
 * Get status style classes for doctor schedule status badges.
 */
export function getStatusStyle(status) {
  switch (status) {
    case 'Tersedia': return 'bg-emerald-50  text-emerald-700  border-emerald-200 ';
    case 'Operasi': return 'bg-amber-50  text-amber-700  border-amber-200 ';
    case 'Cuti': return 'bg-rose-50  text-rose-700  border-rose-200 ';
    default: return 'bg-gray-50  text-gray-700  border-gray-200 ';
  }
}
