export type CollegeType = {
  image: string
  logo: string
  admission_status: string
  type: string
  rating: number
  name: string
  location: string
  programs: string[]
  facilities: string[]
}

export type EventType = {
  image: string
  date: string
  title: string
  description: string
}

export const collegeData: CollegeType[] = [
  {
    image: 'assets/images/university/02.jpg',
    logo: 'assets/images/client/uni-logo-01.svg',
    admission_status: 'Closed',
    type: 'Private',
    rating: 4.5,
    name: 'American Century University, New Mexico',
    location: '4502 Colonial Drive Anderson, IN',
    programs: ['BSC', 'BBA', 'Engineer', 'BCA', 'MBBS'],
    facilities: ['Canteen', 'Stationary', 'Hostel', 'Library', 'Playground'],
  },
  {
    image: 'assets/images/university/04.jpg',
    logo: 'assets/images/client/uni-logo-03.svg',
    admission_status: 'Open',
    type: 'Public',
    rating: 4.5,
    name: 'Indiana College of - Bloomington',
    location: 'Bloomington, IN',
    programs: ['MBBS', 'Engineer', 'BBA', 'BCA', 'BSC'],
    facilities: ['Playground', 'Library', 'Canteen', 'Stationary', 'Hostel'],
  },
  {
    image: 'assets/images/university/01.jpg',
    logo: 'assets/images/client/uni-logo-02.svg',
    admission_status: 'Open',
    type: 'Private',
    rating: 4.0,
    name: 'College of South Florida',
    location: '4653 Linda Street Newark, PA',
    programs: ['BBA', 'BCA', 'BSC', 'Engineer'],
    facilities: [
      'Gym',
      'Stationary',
      'Playground',
      'Canteen',
      'Library',
      'Hostel',
    ],
  },
  {
    image: 'assets/images/university/03.jpg',
    logo: 'assets/images/client/uni-logo-01.svg',
    admission_status: 'Closed',
    type: 'Public',
    rating: 4.5,
    name: 'Andeerson Campus',
    location: '4502 Colonial Drive Anderson, IN',
    programs: ['Engineer', 'BBA', 'BCA', 'BSC', 'MBBS'],
    facilities: ['Library', 'Canteen', 'Stationary', 'Hostel', 'Playground'],
  },
]

export const EventsList: EventType[] = [
  {
    image: 'assets/images/courses/4by3/21.jpg',
    date: '29 September 2021',
    title: 'Global Education Fall Meeting for Everyone',
    description:
      'Satisfied conveying a dependent contented he gentleman agreeable do be.',
  },
  {
    image: 'assets/images/courses/4by3/16.jpg',
    date: 'Tomorrow',
    title: 'International Conference on Information Technology',
    description:
      'Kindness owns whatever betrayed her moreover procured replying for and. Proposal indulged no do.',
  },
  {
    image: 'assets/images/courses/4by3/18.jpg',
    date: '2 July 2022',
    title: 'UK Demo Day 2022',
    description:
      'Points afraid but may end law lasted. Rooms oh fully taken by worse do may end law lasted.',
  },
  {
    image: 'assets/images/courses/4by3/17.jpg',
    date: '29 September 2021',
    title: 'Personality Development Tour',
    description:
      'Yet remarkably appearance get him his projection. Diverted endeavor bed peculiar',
  },
  {
    image: 'assets/images/courses/4by3/19.jpg',
    date: 'Live',
    title: 'Global Education Fall Meeting for Everyone',
    description:
      'Rooms oh fully taken by worse do. Points afraid but may end law lasted',
  },
]
