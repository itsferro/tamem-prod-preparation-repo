export type BadgeType = {
  text: string
  class: string
}

export type UserType = {
  name: string
  avatar: string
}

export type CourseType = {
  image: string
  badge: BadgeType
  title: string
  isLike: boolean
  description: string
  rating: number
  duration: string
  lectures: number
  type: string
}

export type TrendingType = {
  image: string
  ribbon?: string
  badges: BadgeType[]
  title: string
  rating: number
  reviews: number
  students: number
  time: string
  lectures: number
  instructor: UserType
  price: string
}
export const courseList: CourseType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    badge: {
      text: 'All level',
      class: 'purple',
    },
    title: 'Sketch from A to Z: for app designer',
    description: 'Proposal indulged no do sociable he throwing settling.',
    isLike: false,
    rating: 4.0,
    duration: '12h 56m',
    lectures: 15,
    type: 'development',
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    badge: {
      text: 'Beginner',
      class: 'bg-success bg-opacity-10 text-success',
    },
    title: 'Graphic Design Masterclass',
    description:
      'Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms',
    isLike: true,
    rating: 4.5,
    duration: '9h 56m',
    lectures: 65,
    type: 'graphic',
  },
  {
    image: 'assets/images/courses/4by3/03.jpg',
    badge: {
      text: 'Beginner',
      class: 'bg-success bg-opacity-10 text-success',
    },
    title: 'Create a Design System in Figma',
    description:
      'Rooms oh fully taken by worse do. Points afraid but may end afraid but may end.',
    isLike: false,
    rating: 4.5,
    duration: '5h 56m',
    lectures: 32,
    type: 'marketing',
  },
  {
    image: 'assets/images/courses/4by3/07.jpg',
    badge: {
      text: 'Beginner',
      class: 'bg-success bg-opacity-10 text-success',
    },
    title: 'Deep Learning with React-Native',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther',
    isLike: true,
    rating: 4.0,
    duration: '18h 56m',
    lectures: 99,
    type: 'finance',
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    badge: {
      text: 'All level',
      class: 'bg-purple bg-opacity-10 text-purple',
    },
    title: 'Build Responsive Websites with HTML',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther',
    isLike: true,
    rating: 4.0,
    duration: '15h 30m',
    lectures: 68,
    type: 'development',
  },
  {
    image: 'assets/images/courses/4by3/12.jpg',
    badge: {
      text: 'Beginner',
      class: 'bg-success bg-opacity-10 text-success',
    },
    title: 'Build Websites with CSS',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther',
    isLike: false,
    rating: 4.5,
    duration: '36h 30m',
    lectures: 72,
    type: 'development',
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    badge: {
      text: 'All level',
      class: 'bg-purple bg-opacity-10 text-purple',
    },
    title: 'Learn Invision',
    description:
      'Arrived off she elderly beloved him Course regard to up he hardly.',
    isLike: true,
    rating: 3.5,
    duration: '6h 56m',
    lectures: 82,
    type: 'graphic',
  },
  {
    image: 'assets/images/courses/4by3/09.jpg',
    badge: {
      text: 'All level',
      class: 'bg-purple bg-opacity-10 text-purple',
    },
    title: 'JavaScript: Full Understanding',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    isLike: false,
    rating: 5.0,
    duration: '35h 20m',
    lectures: 89,
    type: 'marketing',
  },
]

export const trendingCourse: TrendingType[] = [
  {
    image: 'assets/images/courses/4by3/14.jpg',
    ribbon: 'Free',
    badges: [
      {
        text: 'Design',
        class: 'primary',
      },
      {
        text: 'Beginner',
        class: 'dark',
      },
    ],
    title: 'The complete Digital Marketing Course - 8 Course in 1',
    rating: 4.5,
    reviews: 6500,
    students: 6500,
    time: '6h 56m',
    lectures: 82,
    instructor: {
      name: 'Larry Lawson',
      avatar: 'assets/images/avatar/10.jpg',
    },
    price: 'Free',
  },
  {
    image: 'assets/images/courses/4by3/15.jpg',
    badges: [
      {
        text: 'Development',
        class: 'primary',
      },
      {
        text: 'All level',
        class: 'dark',
      },
    ],
    title: 'Angular – The Complete Guide (2021 Edition)',
    rating: 4.0,
    reviews: 3500,
    students: 4500,
    time: '12h 45m',
    lectures: 65,
    instructor: {
      name: 'Billy Vasquez',
      avatar: 'assets/images/avatar/04.jpg',
    },
    price: '255',
  },
  {
    image: 'assets/images/courses/4by3/17.jpg',
    badges: [
      {
        text: 'Design',
        class: 'primary',
      },
      {
        text: 'Beginner',
        class: 'dark',
      },
    ],
    title: 'Time Management Mastery: Do More, Stress Less',
    rating: 4.5,
    reviews: 2000,
    students: 8000,
    time: '24h 56m',
    lectures: 55,
    instructor: {
      name: 'Lori Stevens',
      avatar: 'assets/images/avatar/09.jpg',
    },
    price: '500',
  },
  {
    image: 'assets/images/courses/4by3/16.jpg',
    badges: [
      {
        text: 'Design',
        class: 'primary',
      },
      {
        text: 'Beginner',
        class: 'dark',
      },
    ],
    title: 'Time Management Mastery: Do More, Stress Less',
    rating: 4.0,
    reviews: 2000,
    students: 1200,
    time: '9h 56m',
    lectures: 21,
    instructor: {
      name: 'Frances Guerrero',
      avatar: 'assets/images/avatar/01.jpg',
    },
    price: '200',
  },
]
