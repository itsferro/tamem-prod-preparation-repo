type FooterLinkType = {
  label: string
  link?: string
  icon?: string
  image?: string
}

export const CompanyList: FooterLinkType[] = [
  { label: 'About Us', link: '/about' },
  { label: 'Contact us', link: '/contact-us' },
  { label: 'News and Blogs', link: '/blog-grid' },
  { label: 'Library', link: '/request-access' },
  { label: 'Career', link: '/become-instructor' },
]

export const CommunityList: FooterLinkType[] = [
  { label: 'Instructors', link: '/instructor-list' },
  { label: 'Workshop', link: '/workshop-detail' },
  { label: 'Help Center', link: '/help/center' },
  { label: 'Faq', link: '/faq' },
]

export const TeachingList: FooterLinkType[] = [
  { label: 'Become a teacher', link: '/become-instructor' },
  { label: 'How to guide', link: '/request-demo' },
  { label: 'Terms & Conditions', link: '/help/center-detail' },
]

export const SocialList: FooterLinkType[] = [
  { label: 'facebook', icon: 'fa-facebook-f' },
  { label: 'instagram', icon: 'fa-instagram' },
  { label: 'twitter', icon: 'fa-twitter' },
  { label: 'linkedin', icon: 'fa-linkedin-in' },
]

export const LanguageList: FooterLinkType[] = [
  { label: 'English', image: 'assets/images/flags/uk.svg' },
  { label: 'German', image: 'assets/images/flags/gr.svg' },
  { label: 'French', image: 'assets/images/flags/sp.svg' },
]

export const FooterItems = [
  { label: 'About', link: '/about' },
  { label: 'Terms', link: '/help/center-detail' },
  { label: 'Privacy', link: '/' },
  { label: 'Career', link: '/index-4' },
  { label: 'Contact us', link: '/contact-us' },
  { label: 'Cookies', link: '/' },
]

export const FooterItems2 = [
  { label: 'Blog', link: '/blog-detail' },
  { label: 'About', link: '/about' },
  { label: 'Contact us', link: '/contact-us' },
  { label: 'Privacy Policy', link: '/' },
  { label: 'Workshop', link: '/workshop-detail' },
  { label: 'Sitemap', link: '/' },
]

export const FooterItems3 = [
  { label: 'Become instructor', link: '/become-instructor' },
  { label: 'Download', link: '/' },
  { label: 'Pricing', link: '/pricing' },
  { label: 'Services', link: '/' },
]
