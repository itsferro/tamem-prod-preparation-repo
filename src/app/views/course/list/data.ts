type UserType = {
  name: string
  avatar: string
}

type ProductType = {
  image: string
  ribbon?: string
  badge: string
  rating: number
  wishlist: boolean
  title: string
  description: string
  duration: string
  lectures: number
  level: string
  instructor: UserType
}

export const ProductData: ProductType[] = [
  {
    image: 'assets/images/courses/4by3/06.jpg',
    ribbon: 'Free',
    badge: 'Development',
    rating: 4.5,
    wishlist: true,
    title: 'Angular – The Complete Guider',
    description:
      'Satisfied conveying a dependent contented he gentleman agreeable do be. dependent contented he',
    duration: '21h 56m',
    lectures: 52,
    level: 'Intermediate',
    instructor: {
      name: 'Jacqueline Miller',
      avatar: 'assets/images/avatar/06.jpg',
    },
  },
  {
    image: 'assets/images/courses/4by3/01.jpg',
    badge: 'Marketing',
    rating: 4.5,
    wishlist: false,
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    description:
      'Explained propriety off out perpetual his you. Dependent contented he explained propriety off out perpetual his you.',
    duration: '6h 56m',
    lectures: 82,
    level: 'Beginner',
    instructor: {
      name: 'Larry Lawson',
      avatar: 'assets/images/avatar/10.jpg',
    },
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    badge: 'Development',
    rating: 4.8,
    wishlist: false,
    title: 'The Ultimate Copywriting Course - Write Copy That Sells',
    description:
      'Insipidity the sufficient discretion imprudence resolution sir him decisively. Proceed how any engaged visitor.',
    duration: '15h 30m',
    lectures: 72,
    level: 'All level',
    instructor: {
      name: 'Louis Crawford',
      avatar: 'assets/images/avatar/04.jpg',
    },
  },
  {
    image: 'assets/images/courses/4by3/03.jpg',
    badge: 'Design',
    rating: 4.0,
    wishlist: false,
    title: 'Create a Design System in Figma',
    description:
      'Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing.',
    duration: '7h 50m',
    lectures: 21,
    level: 'All level',
    instructor: {
      name: 'Frances Guerrero',
      avatar: 'assets/images/avatar/09.jpg',
    },
  },
]
