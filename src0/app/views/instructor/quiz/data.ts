import { currentYear } from '@/app/common/constants'

type CourseType = {
  id: string
  question: string
}

type StudentQuizType = {
  name: string
  avatar: string
  course: string
  date: string
  progress: number
}

export const Courses: CourseType[] = [
  {
    id: '01',
    question: 'How do you protect your business against cyber-crime?',
  },
  {
    id: '02',
    question: 'What is SEO?',
  },
  {
    id: '03',
    question: 'Who should join this course?',
  },
  {
    id: '04',
    question: 'What are the T&C for this program?',
  },
]

export const StudentQuiz: StudentQuizType[] = [
  {
    name: 'Lori Stevens',
    avatar: 'assets/images/avatar/01.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '7/1/' + currentYear,
    progress: 450,
  },
  {
    name: 'Dennis Barrett',
    avatar: 'assets/images/avatar/03.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '6/1/' + currentYear,
    progress: 425,
  },
  {
    name: 'Billy Vasquez',
    avatar: 'assets/images/avatar/04.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '5/1/' + currentYear,
    progress: 385,
  },
  {
    name: 'Carolyn Ortiz',
    avatar: 'assets/images/avatar/09.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '5/1/' + currentYear,
    progress: 398,
  },
  {
    name: 'Larry Lawson',
    avatar: 'assets/images/avatar/07.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '4/1/' + currentYear,
    progress: 428,
  },
  {
    name: 'Frances Guerrero',
    avatar: 'assets/images/avatar/06.jpg',
    course: 'The complete Digital Marketing Courses - 12 Course in 1',
    date: '4/1/' + currentYear,
    progress: 486,
  },
]
