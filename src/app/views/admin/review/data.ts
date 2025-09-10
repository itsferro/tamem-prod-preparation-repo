type ReviewType = {
  id: number
  name: string
  image: string
  course: string
  rating: number
}

export const ReviewList: ReviewType[] = [
  {
    id: 1,
    name: 'Lori Stevens',
    image: 'assets/images/avatar/09.jpg',
    course: 'Building Scalable APIs with GraphQL',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carolyn Ortiz',
    image: 'assets/images/avatar/01.jpg',
    course: 'Graphic Design Masterclass',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dennis Barrett',
    image: 'assets/images/avatar/03.jpg',
    course: 'JavaScript: Full Understanding',
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Billy Vasquez',
    image: 'assets/images/avatar/04.jpg',
    course: 'Time Management Mastery: Do More, Stress Less',
    rating: 4.5,
  },
  {
    id: 5,
    name: 'Jacqueline Miller',
    image: 'assets/images/avatar/05.jpg',
    course: 'The complete Digital Marketing Course - 8 Course in 1',
    rating: 4,
  },
  {
    id: 6,
    name: 'Amanda Reed',
    image: 'assets/images/avatar/06.jpg',
    course: 'Microsoft Excel - Excel from Beginner to Advanced',
    rating: 4,
  },
  {
    id: 7,
    name: 'Samuel Bishop',
    image: 'assets/images/avatar/07.jpg',
    course: 'Behavior, Psychology and Care Training',
    rating: 4,
  },
  {
    id: 8,
    name: 'Louis Ferguson',
    image: 'assets/images/avatar/10.jpg',
    course: 'Create a Design System in Figma',
    rating: 3.5,
  },
]

type TopRatedRType = {
  image: string
  title: string
  views: number
  rating: number
}

export const TopRatedList: TopRatedRType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    title: 'Building Scalable APIs with GraphQL',
    views: 2568,
    rating: 5,
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    title: 'Graphic Design Masterclass',
    views: 1858,
    rating: 5,
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    title: 'Learn Invision',
    views: 6845,
    rating: 5,
  },
  {
    image: 'assets/images/courses/4by3/07.jpg',
    title: 'Deep Learning with React-Native',
    views: 3845,
    rating: 4.5,
  },
  {
    image: 'assets/images/courses/4by3/10.jpg',
    title: 'Bootstrap 5 From Scratch',
    views: 1458,
    rating: 4.5,
  },
]
