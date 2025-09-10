import { currency } from '@/app/common/constants'

export type userType = {
  avatar: string
  name: string
  role: string
}

export type BadgeType = {
  text: string
  class: string
}

export type CourseType = {
  image: string
  user: userType
  badge: BadgeType[]
  title: string
  rating: number
  reviews: number
  price: number
  time: string
}

export type instructorType = {
  image: string
  name: string
  student: number
  clipboard: number
  description: string
  rating: number
}

export const courseList: CourseType[] = [
  {
    image: 'assets/images/courses/4by3/16.jpg',
    user: {
      avatar: 'assets/images/avatar/10.jpg',
      name: 'Larry Lawson',
      role: 'Tutor',
    },
    badge: [
      {
        text: 'All level',
        class: 'bg-orange bg-opacity-10 text-orange',
      },
      { text: '6 month', class: 'text-bg-dark' },
    ],
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    rating: 4.5,
    reviews: 6500,
    price: 125,
    time: '6h 56m',
  },
  {
    image: 'assets/images/courses/4by3/14.jpg',
    user: {
      avatar: 'assets/images/avatar/08.jpg',
      name: 'Billy Vasquez',
      role: 'Developer',
    },
    badge: [
      {
        text: 'Beginner',
        class: 'bg-info bg-opacity-10 text-info',
      },
      { text: '8 month', class: 'text-bg-dark' },
    ],
    title: 'Angular – The Complete Guide (2021 Edition)',
    rating: 4.5,
    reviews: 5436,
    price: 355,
    time: '12h 56m',
  },
  {
    image: 'assets/images/courses/4by3/21.jpg',
    user: {
      avatar: 'assets/images/avatar/05.jpg',
      name: 'Lori Stevens',
      role: 'Psychiatrist',
    },
    badge: [
      {
        text: 'Beginner',
        class: 'bg-info bg-opacity-10 text-info',
      },
      { text: '12 month', class: 'text-bg-dark' },
    ],
    title: 'Time Management Mastery: Do More, Stress Less',
    rating: 3.5,
    reviews: 1254,
    price: 280,
    time: '5h 40m',
  },
]

export const instructorList: instructorType[] = [
  {
    image: 'assets/images/instructor/02.jpg',
    student: 25,
    clipboard: 15,
    name: 'Jacqueline Miller',
    description: 'Computer Teacher',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/01.jpg',
    student: 118,
    clipboard: 9,
    name: 'Samuel Bishop',
    description: 'Marketing Teacher',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/08.jpg',
    student: 92,
    clipboard: 38,
    name: 'Dennis Barrett',
    description: 'Science Teacher',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/04.jpg',
    student: 82,
    clipboard: 5,
    name: 'Carolyn Ortiz',
    description: 'Economy Teacher',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/03.jpg',
    student: 50,
    clipboard: 10,
    name: 'Billy Vasquez',
    description: 'Computer Teacher',
    rating: 4.5,
  },
]

type PopularType = {
  title: string
  image?: string
  videoUrl?: string
  showPrice?: boolean
  note?: string
  subTabs?: PopularType[]
  description?: string
  learn?: string[]
  rating?: number
}

export const PopularCourse: PopularType[] = [
  {
    title: 'Art & Design',
    description:
      'Perceived end knowledge certainly day sweetness why cordially. Ask a quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.',
    rating: 4.5,
    subTabs: [
      {
        title: 'Art & Design',
        image: 'assets/images/about/13.jpg',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        showPrice: true,
      },
      {
        title: 'Graphic Design',
        image: 'assets/images/about/11.jpg',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        showPrice: true,
      },
      {
        title: 'Web Design',
        image: 'assets/images/about/14.jpg',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        note: 'Before you learning this video you need to first learn Beginner course',
      },
    ],
  },
  {
    title: 'Development',
    description:
      'Ask a quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.',
    learn: [
      'Create responsive, accessible, and beautiful layouts',
      'Course Videos & Readings',
      'Manipulate the DOM with vanilla JS',
      'Master the command line interface',
      'Create your own Node modules',
    ],
    image: 'assets/images/about/14.jpg',
    videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
    showPrice: true,
  },
  {
    title: 'Data Science',
    description:
      'Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.',
    rating: 4.0,
    image: 'assets/images/about/15.jpg',
    videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
  },
  {
    title: 'Marketing',
    description:
      'Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.',
    rating: 4.0,
    image: 'assets/images/about/12.jpg',
    videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
  },
  {
    title: 'Finance',
    description:
      'Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitors we private removed.',
    rating: 4.0,
    image: 'assets/images/about/11.jpg',
    videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
  },
]
