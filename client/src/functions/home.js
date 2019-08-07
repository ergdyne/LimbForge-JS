export default function home(siteAccess) {
  switch (siteAccess) {
    case 'admin': return '/users/'
    case 'requested': return '/'
    default: return '/patients/'
  }
}