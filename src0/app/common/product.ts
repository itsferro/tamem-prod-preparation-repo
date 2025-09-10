type BadgeType = {
  text: string
  color: string
}

export type ProductType = {
  image: string
  badge: BadgeType
  title: string
  isLike?: boolean
  description: string
  rating: number
  duration: string
  lectures: number
}
export const ProductList: ProductType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    badge: {
      text: 'All level',
      color: 'purple',
    },
    title: 'Sketch from A to Z: for app designer',
    description: 'Proposal indulged no do sociable he throwing settling.',
    rating: 4.0,
    duration: '12h 56m',
    lectures: 15,
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'Graphic Design Masterclass',
    isLike: true,
    description:
      'Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms',
    rating: 4.5,
    duration: '9h 56m',
    lectures: 65,
  },
  {
    image: 'assets/images/courses/4by3/03.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'Create a Design System in Figma',
    description:
      'Rooms oh fully taken by worse do. Points afraid but may end afraid but may end.',
    rating: 4.5,
    duration: '5h 56m',
    lectures: 32,
  },
  {
    image: 'assets/images/courses/4by3/07.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'Deep Learning with React-Native',
    isLike: true,
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.0,
    duration: '18h 56m',
    lectures: 99,
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    badge: {
      text: 'All level',
      color: 'purple',
    },
    title: 'Build Responsive Websites with HTML',
    isLike: true,
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.0,
    duration: '15h 30m',
    lectures: 68,
  },
  {
    image: 'assets/images/courses/4by3/12.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'Build Websites with CSS',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.5,
    duration: '36h 30m',
    lectures: 72,
  },
  {
    image: 'assets/images/courses/4by3/05.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'The Complete Web Development in python',
    description: 'Mention Mr manners opinion if garrets enabled.',
    rating: 4.5,
    duration: '10h 00m',
    lectures: 26,
  },
  {
    image: 'assets/images/courses/4by3/06.jpg',
    badge: {
      text: 'Intermediate',
      color: 'info',
    },
    title: 'Angular – The Complete Guider',
    description: 'Rooms oh fully taken by worse do. Points afraid but may end.',
    rating: 4.5,
    duration: '9h 32m',
    lectures: 42,
  },
  {
    image: 'assets/images/courses/4by3/10.jpg',
    badge: {
      text: 'Intermediate',
      color: 'info',
    },
    title: 'Bootstrap 5 From Scratch',
    isLike: true,
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.5,
    duration: '25h 56m',
    lectures: 38,
  },
  {
    image: 'assets/images/courses/4by3/13.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'PHP with - CMS Project',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.0,
    duration: '21h 22m',
    lectures: 30,
  },
  {
    image: 'assets/images/courses/4by3/01.jpg',
    badge: {
      text: 'Beginner',
      color: 'success',
    },
    title: 'Digital Marketing Masterclass',
    isLike: true,
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.5,
    duration: '6h 56m',
    lectures: 82,
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    badge: {
      text: 'All level',
      color: 'purple',
    },
    title: 'Learn Invision',
    isLike: true,
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 3.5,
    duration: '6h 56m',
    lectures: 82,
  },
]
