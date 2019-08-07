//Maps function to site access. Maybe an Enum instead?
export default function home(siteAccess) {
  switch (siteAccess) {
    case 'admin': return '/users/'
    case 'requested': return '/'
    default: return '/patients/'
  }
}