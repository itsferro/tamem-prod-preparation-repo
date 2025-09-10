type CourseType = {
  course_title: string
  image: string
  enrolled: number
  status: string
}

export const CourseList: CourseType[] = [
  {
    course_title: 'Building Scalable APIs with GraphQL',
    image: 'assets/images/courses/4by3/08.jpg',
    enrolled: 412,
    status: 'Live',
  },
  {
    course_title: 'Graphic Design Masterclass',
    image: 'assets/images/courses/4by3/02.jpg',
    enrolled: 254,
    status: 'Live',
  },
  {
    course_title: 'Learn Invision',
    image: 'assets/images/courses/4by3/04.jpg',
    enrolled: 0,
    status: 'Pending',
  },
  {
    course_title: 'Deep Learning with React-Native',
    image: 'assets/images/courses/4by3/07.jpg',
    enrolled: 98,
    status: 'Live',
  },
  {
    course_title: 'Bootstrap 5 From Scratch',
    image: 'assets/images/courses/4by3/10.jpg',
    enrolled: 58,
    status: 'Cancel',
  },
]

type ReviewType = {
  name: string
  image: string
  course: string
  rating: number
}

export const ReviewList: ReviewType[] = [
  {
    name: 'Lori Stevens',
    image: 'assets/images/avatar/09.jpg',
    course: 'Building Scalable APIs with GraphQL',
    rating: 5,
  },
  {
    name: 'Carolyn Ortiz',
    image: 'assets/images/avatar/01.jpg',
    course: 'Graphic Design Masterclass',
    rating: 5,
  },
  {
    name: 'Dennis Barrett',
    image: 'assets/images/avatar/03.jpg',
    course: 'Deep Learning with React-Native',
    rating: 4.5,
  },
  {
    name: 'Billy Vasquez',
    image: 'assets/images/avatar/04.jpg',
    course: 'Bootstrap 5 From Scratch',
    rating: 4.5,
  },
  {
    name: 'Jacqueline Miller',
    image: 'assets/images/avatar/05.jpg',
    course: 'Learn Invision',
    rating: 4,
  },
]
