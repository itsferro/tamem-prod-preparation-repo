export type CategoryType = {
  category: string
  icon: string
  iconClass: string
  courses: number
}

export type FeatureType = {
  image: string
  students: string
  rating: number
  avatar: string
  title: string
  category: string
  price: number
}

export type ItCourseType = {
  title: string
  courses: number
  image: string
}

export type LiveCourseType = {
  title: string
  image: string
  video_link: string
  students: string[]
}

export const categoryList: CategoryType[] = [
  {
    category: 'Math & Logic',
    icon: 'fas fa-tools',
    iconClass: 'bg-purple bg-opacity-10 text-purple',
    courses: 89,
  },
  {
    category: 'Health & Fitness',
    icon: 'fas fa-heartbeat',
    iconClass: 'bg-danger bg-opacity-10 text-danger',
    courses: 95,
  },
  {
    category: 'Photography',
    icon: 'fas fa-photo-video',
    iconClass: 'bg-blue bg-opacity-10 text-blue',
    courses: 38,
  },
  {
    category: 'Development',
    icon: 'fas fa-laptop-code',
    iconClass: 'bg-success bg-opacity-10 text-success',
    courses: 105,
  },
  {
    category: 'Design',
    icon: 'fas fa-crop-alt',
    iconClass: 'bg-orange bg-opacity-10 text-orange',
    courses: 72,
  },
  {
    category: 'Business',
    icon: 'fas fa-business-time',
    iconClass: 'bg-primary bg-opacity-10 text-primary',
    courses: 68,
  },
  {
    category: 'Music',
    icon: 'fas fa-music',
    iconClass: 'bg-info bg-opacity-10 text-info',
    courses: 51,
  },
  {
    category: 'Painting',
    icon: 'fas fa-palette',
    iconClass: 'bg-warning bg-opacity-15 text-warning',
    courses: 69,
  },
]

export const featureList: FeatureType[] = [
  {
    image: 'assets/images/courses/4by3/17.jpg',
    students: '9.1k',
    rating: 4.5,
    avatar: 'assets/images/avatar/09.jpg',
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    category: 'Personal Development',
    price: 140,
  },
  {
    image: 'assets/images/courses/4by3/18.jpg',
    students: '2.5k',
    rating: 3.6,
    avatar: 'assets/images/avatar/07.jpg',
    title: 'Fundamentals of Business Analysis',
    category: 'Business Development',
    price: 160,
  },
  {
    image: 'assets/images/courses/4by3/21.jpg',
    students: '6k',
    rating: 3.8,
    avatar: 'assets/images/avatar/05.jpg',
    title: 'Google Ads Training: Become a PPC Expert',
    category: 'SEO',
    price: 226,
  },
  {
    image: 'assets/images/courses/4by3/20.jpg',
    students: '15k',
    rating: 4.8,
    avatar: 'assets/images/avatar/02.jpg',
    title: 'Behavior, Psychology and Care Training',
    category: 'Lifestyle',
    price: 342,
  },
  {
    image: 'assets/images/courses/4by3/15.jpg',
    students: '8k',
    rating: 3.6,
    avatar: 'assets/images/avatar/11.jpg',
    title: 'Microsoft Excel - Excel from Beginner to Advanced',
    category: 'Technology',
    price: 245,
  },
  {
    image: 'assets/images/courses/4by3/14.jpg',
    students: '4k',
    rating: 4.0,
    avatar: 'assets/images/avatar/12.jpg',
    title: 'Twitter Marketing & Twitter Ads For Beginners',
    category: 'Technology',
    price: 199,
  },
  {
    image: 'assets/images/courses/4by3/19.jpg',
    students: '6k',
    rating: 4.0,
    avatar: 'assets/images/avatar/08.jpg',
    title: 'Consulting Approach to Problem Solving',
    category: 'Psychology',
    price: 215,
  },
  {
    image: 'assets/images/courses/4by3/16.jpg',
    students: '2k',
    rating: 3.5,
    avatar: 'assets/images/avatar/06.jpg',
    title: 'Ultimate business intelligence analyst a to Z Course(Pro)',
    category: 'Business',
    price: 112,
  },
]

export const ITCourseList: ItCourseType[] = [
  {
    title: 'Digital Marketing',
    courses: 23,
    image: 'assets/images/courses/4by3/01.jpg',
  },
  {
    title: 'Figma',
    courses: 16,
    image: 'assets/images/courses/4by3/03.jpg',
  },
  {
    title: 'Python',
    courses: 32,
    image: 'assets/images/courses/4by3/05.jpg',
  },
  {
    title: 'Angular',
    courses: 48,
    image: 'assets/images/courses/4by3/06.jpg',
  },
  {
    title: 'React-Native',
    courses: 31,
    image: 'assets/images/courses/4by3/07.jpg',
  },
  {
    title: 'Sketch',
    courses: 38,
    image: 'assets/images/courses/4by3/08.jpg',
  },
  {
    title: 'Javascript',
    courses: 33,
    image: 'assets/images/courses/4by3/09.jpg',
  },
  {
    title: 'Bootstrap',
    courses: 62,
    image: 'assets/images/courses/4by3/10.jpg',
  },
]

export const LiveCourseList: LiveCourseType[] = [
  {
    title: 'Learn the French Language: Complete Course',
    image: 'assets/images/courses/4by3/18.jpg',
    video_link: 'https://www.youtube.com/embed/tXHviS-4ygo',
    students: [
      'assets/images/avatar/01.jpg',
      'assets/images/avatar/02.jpg',
      'assets/images/avatar/03.jpg',
      'assets/images/avatar/06.jpg',
    ],
  },
  {
    title: 'Time Management Mastery: Do More, Stress Less',
    image: 'assets/images/courses/4by3/22.jpg',
    video_link: 'https://www.youtube.com/embed/tXHviS-4ygo',
    students: [
      'assets/images/avatar/01.jpg',
      'assets/images/avatar/02.jpg',
      'assets/images/avatar/03.jpg',
      'assets/images/avatar/06.jpg',
    ],
  },
  {
    title: 'English for Beginners: Intensive Spoken English Course',
    image: 'assets/images/courses/4by3/21.jpg',
    video_link: 'https://www.youtube.com/embed/tXHviS-4ygo',
    students: [
      'assets/images/avatar/01.jpg',
      'assets/images/avatar/02.jpg',
      'assets/images/avatar/03.jpg',
      'assets/images/avatar/06.jpg',
    ],
  },
]
