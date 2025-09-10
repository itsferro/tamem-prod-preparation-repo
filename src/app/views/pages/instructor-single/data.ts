type BadgeType = {
  level: string
  color: string
}

type InstructorCourseType = {
  image: string
  badge: BadgeType
  favorite: boolean
  title: string
  description: string
  rating: number
  duration: string
  lectures: number
}
export const InstructorCourses: InstructorCourseType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    badge: {
      level: 'All level',
      color: 'purple',
    },
    favorite: false,
    title: 'Sketch from A to Z: for app designer',
    description: 'Proposal indulged no do sociable he throwing settling',
    rating: 4.0,
    duration: '12h 56m',
    lectures: 15,
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    badge: {
      level: 'Intermediate',
      color: 'info',
    },
    favorite: true,
    title: 'Graphic Design Masterclass',
    description:
      'Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms',
    rating: 4.5,
    duration: '9h 56m',
    lectures: 65,
  },
  {
    image: 'assets/images/courses/4by3/03.jpg',
    badge: {
      level: 'Beginner',
      color: 'success',
    },
    favorite: false,
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
      level: 'Beginner',
      color: 'success',
    },
    favorite: true,
    title: 'Deep Learning with React-Native',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther..',
    rating: 4.0,
    duration: '18h 56m',
    lectures: 99,
  },
]

export const RelatedInstructor = [
  {
    image: 'assets/images/instructor/02.jpg',
    students: 25,
    lecture: 15,
    name: 'Jacqueline Miller',
    title: 'Web Developer',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/01.jpg',
    students: 118,
    lecture: 9,
    name: 'Samuel Bishop',
    title: 'Marketing Instructor',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/08.jpg',
    students: 92,
    lecture: 38,
    name: 'Dennis Barrett',
    title: 'Maths Instructor',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/04.jpg',
    students: 82,
    lecture: 5,
    name: 'Carolyn Ortiz',
    title: 'Economics Teacher',
    rating: 4.5,
  },
  {
    image: 'assets/images/instructor/03.jpg',
    students: 50,
    lecture: 10,
    name: 'Billy Vasquez',
    title: 'UI/UX Designer',
    rating: 4.5,
  },
]
