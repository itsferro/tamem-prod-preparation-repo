type RecommendedType = {
  icon: string
  title: string
  topics: string[]
}

type ArticleType = {
  title: string
  images: string[]
  articles: number
  authors: string[]
}

export const RecommendedList: RecommendedType[] = [
  {
    icon: 'bi bi-emoji-smile fs-1 text-success',
    title: 'Get started',
    topics: [
      'Gulp and Customization',
      'Color Scheme and Logo Settings',
      'Dark mode, RTL Version and Lazy Load',
      'Sources, Credits and Changelog',
      'Updates and Support',
    ],
  },
  {
    icon: 'bi bi-layers fs-1 text-warning',
    title: 'Account Setup',
    topics: [
      'Connecting to your Account',
      'Edit your profile information',
      'Connecting to other Social Media Accounts',
      'Adding your profile picture',
      'Describing your store',
    ],
  },
  {
    icon: 'bi bi-info-circle fs-1 text-orange',
    title: 'Other Topics',
    topics: [
      'Security & Privacy',
      'Author, Publisher & Admin Guides',
      'Pricing plans',
      'Sales Tax & Regulatory Fees',
      'Promotions & Deals',
    ],
  },
  {
    icon: 'bi bi-house fs-1 text-purple',
    title: 'Advanced Usage',
    topics: [
      'Admin & Billing',
      'Become a Pro',
      'Mobile application',
      'Guide',
      'Promotions & Deals',
    ],
  },
]

export const ArticleList: ArticleType[] = [
  {
    title: 'The installation part',
    images: [
      'assets/images/avatar/01.jpg',
      'assets/images/avatar/02.jpg',
      'assets/images/avatar/03.jpg',
    ],
    articles: 10,
    authors: ['Carolyn Ortiz', 'Billy Vasquez', 'Larry Lawson'],
  },
  {
    title: 'Supporting Customer With Inbox',
    images: ['assets/images/avatar/08.jpg', 'assets/images/avatar/04.jpg'],
    articles: 5,
    authors: ['Dennis Barrett', 'Louis Ferguson'],
  },
  {
    title: 'Sending Effective Emails',
    images: ['assets/images/avatar/05.jpg'],
    articles: 4,
    authors: ['Jacqueline Miller'],
  },
  {
    title: 'Connect With Customers',
    images: ['assets/images/avatar/09.jpg', 'assets/images/avatar/10.jpg'],
    articles: 11,
    authors: ['Lori Stevens', 'Samuel Bishop'],
  },
]
