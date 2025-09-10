type BannerType = {
  icon: string
  count: number
  label: string
  variant: string
}
export const bannerData: BannerType[] = [
  {
    icon: 'fas fa-university',
    count: 400,
    label: 'Universities',
    variant: 'info',
  },
  {
    icon: 'fas fa-globe',
    count: 25,
    label: 'Countries',
    variant: 'purple',
  },
  {
    icon: 'far fa-handshake',
    count: 12,
    label: 'Years of Experience',
    variant: 'warning ',
  },
]

type OfferType = {
  image: string
  title: string
}

export const OfferList: OfferType[] = [
  {
    image: 'assets/images/courses/4by3/23.jpg',
    title: 'International English Language Testing System (IELTS)',
  },
  {
    image: 'assets/images/courses/4by3/24.jpg',
    title: 'Duolingo English Test (DUOLINGO)',
  },
  {
    image: 'assets/images/courses/4by3/25.jpg',
    title: 'Graduate Record Examination (GRE)',
  },
  {
    image: 'assets/images/courses/4by3/26.jpg',
    title: 'Test of English as a Foreign Language (TOEFL)',
  },
  {
    image: 'assets/images/courses/4by3/25.jpg',
    title: 'Graduate Record Examination (GRE)',
  },
]
