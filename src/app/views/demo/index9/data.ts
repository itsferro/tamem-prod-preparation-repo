type SubjectType = {
  background: string
  grade_range: string
  title: string
  lessons: number
  image: string
}

type BlogType = {
  date: number
  month: string
  title: string
  author: string
}

export const SubjectList: SubjectType[] = [
  {
    background: 'warning',
    grade_range: '1st to 6th grades',
    title: 'Primary school',
    lessons: 35,
    image: 'assets/images/element/primary-school.svg',
  },
  {
    background: 'purple',
    grade_range: '7th to 10th grades',
    title: 'Middle school',
    lessons: 54,
    image: 'assets/images/element/middle-school.svg',
  },
  {
    background: 'orange',
    grade_range: '11th to 12th grades',
    title: 'High school',
    lessons: 70,
    image: 'assets/images/element/high-school.svg',
  },
  {
    background: 'info',
    grade_range: '11th to 12th grades',
    title: 'Exams',
    lessons: 120,
    image: 'assets/images/element/exam.svg',
  },
]

export const BlogList: BlogType[] = [
  {
    date: 15,
    month: 'Jan 2022',
    title: '12 worst types of business accounts you follow on Twitter',
    author: 'Jacqueline Miller',
  },
  {
    date: 12,
    month: 'Jan 2022',
    title: 'How 10 worst business fails of all time could have been prevented',
    author: 'Frances Guerrero',
  },
  {
    date: 9,
    month: 'Jan 2022',
    title: 'Never underestimate the influence of social media',
    author: 'Louis Ferguson',
  },
]
