type ItemsType = {
  type: string
  title: string
  duration?: string
  points?: number
  status?: string
  view?: boolean
  slides?: number
  resume?: boolean
  videoUrl?: string
  image?: string
}
type CourseType = {
  week: string
  dateRange: string
  items: ItemsType[]
}
export const Courses: CourseType[] = [
  {
    week: 'Week 1',
    dateRange: 'April 15 - 20',
    items: [
      {
        type: 'lecture',
        title: 'What is Digital Marketing',
        duration: '15m 10s',
        points: 20,
        status: 'Submitted',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        image: 'assets/images/courses/4by3/01.jpg',
      },
      {
        type: 'assignment',
        title: 'Assignments 1 - Research about marketing',
        points: 20,
        status: 'Submit',
      },
      {
        type: 'slide',
        title: 'Slide - Digital Marketing',
        view: true,
        slides: 5,
        resume: true,
      },
      {
        type: 'quiz',
        title: 'Quiz - Digital Marketing',
        duration: '12 April',
        points: 10,
      },
    ],
  },
  {
    week: 'Week 2',
    dateRange: 'April 22 - 24',
    items: [
      {
        type: 'assignment',
        title: 'Assignments 2 - Research about customer life cycle',
        points: 20,
        status: 'Submit',
      },
      {
        type: 'assignment',
        title: 'Assignments 3 - SEO Optimization',
        points: 20,
        status: 'Submit',
      },
      {
        type: 'slide',
        title: 'Slide - Type of Marketing',
        view: true,
        slides: 5,
      },
    ],
  },
  {
    week: 'Week 3',
    dateRange: 'April 28 - May 05',
    items: [
      {
        type: 'assignment',
        title: 'Assignments 2 - Research about customer life cycle',
        points: 20,
        status: 'Submit',
      },
      {
        type: 'assignment',
        title: 'Assignments 3 - SEO Optimization',
        points: 20,
        status: 'Submit',
      },
      {
        type: 'slide',
        title: 'Slide - Type of Marketing',
        view: true,
        slides: 5,
      },
    ],
  },
  {
    week: 'Week 4',
    dateRange: 'May 08 - 15',
    items: [
      {
        type: 'lecture',
        title: 'What is Digital Marketing',
        duration: '15m 10s',
        points: 20,
        status: 'Submit',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        image: 'assets/images/courses/4by3/01.jpg',
      },
      {
        type: 'lecture',
        title: 'Measuring SEO Effectiveness',
        duration: '30m 10s',
        points: 20,
        status: 'Submit',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        image: 'assets/images/courses/4by3/01.jpg',
      },
      {
        type: 'lecture',
        title: 'Keywords in Blog and Articles',
        duration: '30m 10s',
        points: 20,
        status: 'Submit',
        videoUrl: 'https://www.youtube.com/embed/tXHviS-4ygo',
        image: 'assets/images/courses/4by3/01.jpg',
      },
      {
        type: 'slide',
        title: 'Slide - Digital Marketing',
        view: true,
        slides: 5,
      },
      {
        type: 'quiz',
        title: 'Quiz - Digital Marketing',
        duration: '12 April',
        points: 10,
      },
    ],
  },
]
