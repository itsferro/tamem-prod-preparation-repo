type MyCourseType = {
  title: string
  image: string
  progress: number
  lessons_completed: number
  total_lessons: number
}
export const MyCourses: MyCourseType[] = [
  {
    title: 'Building Scalable APIs with GraphQL',
    image: 'assets/images/courses/4by3/08.jpg',
    progress: 85,
    total_lessons: 56,
    lessons_completed: 40,
  },
  {
    title: 'Create a Design System in Figma',
    image: 'assets/images/courses/4by3/03.jpg',
    progress: 100,
    total_lessons: 42,
    lessons_completed: 42,
  },
  {
    title: 'The Complete Web Development in Python',
    image: 'assets/images/courses/4by3/05.jpg',
    progress: 60,
    total_lessons: 28,
    lessons_completed: 12,
  },
  {
    title: 'Digital Marketing Masterclass',
    image: 'assets/images/courses/4by3/01.jpg',
    progress: 40,
    total_lessons: 32,
    lessons_completed: 18,
  },
  {
    title: 'Graphic Design Masterclass',
    image: 'assets/images/courses/4by3/02.jpg',
    progress: 90,
    total_lessons: 16,
    lessons_completed: 14,
  },
]
