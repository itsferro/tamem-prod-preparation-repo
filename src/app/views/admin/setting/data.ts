type ActiveLogType = {
  device: string
  ip: string
  date: string
}

export const ActiveLogs: ActiveLogType[] = [
  {
    device: 'Chrome On Window',
    ip: '173.238.198.108',
    date: '12 Nov 2021',
  },
  {
    device: 'Mozilla On Window',
    ip: '107.222.146.90',
    date: '08 Nov 2021',
  },
  {
    device: 'Chrome On iMac',
    ip: '231.213.125.55',
    date: '06 Nov 2021',
  },
  {
    device: 'Mozilla On Window',
    ip: '37.242.105.138',
    date: '02 Nov 2021',
  },
]

export const EmailTemplates = [
  'Welcome Email',
  'Send Email to User',
  'Password Change',
  'Unusual Login Email',
  'Password Reset Email by Admin',
  'KYC Approve Email',
  'KYC Reject Email',
  'KYC Missing Email',
  'KYC Submitted Email',
  'Token Purchase - Cancel by User',
  'Token Purchase - Order Placed',
  'Token Purchase - Order Successfully',
]
