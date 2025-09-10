type LinkType = {
  icon: string
  text: string
}

type contentType = {
  title?: string
  details?: LinkType[]
  videoLink?: string
  image?: string
  icon?: string
  text?: string
}

type CurriculumType = {
  icon?: string
  title: string
  video?: boolean
  text?: string
  links?: contentType[]
}

type TestimonialType = {
  avatar: string
  name: string
  quote: string
}

export const CurriculamList: CurriculumType[] = [
  {
    icon: 'bi bi-pc-display-horizontal',
    title: '2 Video Session',
    video: true,
    links: [
      {
        title: 'Watch demo video',
        details: [
          {
            icon: 'bi bi-calendar',
            text: '30 min video',
          },
          {
            icon: 'fas fa-globe-europe',
            text: 'USA timezone',
          },
        ],
        videoLink: 'https://www.youtube.com/embed/tXHviS-4ygo',
        image: 'assets/images/courses/4by3/01.jpg',
      },
      {
        title: 'Meet me in a live session',
        details: [
          {
            icon: 'bi bi-calendar',
            text: 'Jun 28, 6:30PM - 8:00PM',
          },
          {
            icon: 'fas fa-globe-europe',
            text: 'USA timezone',
          },
          {
            icon: 'fas fa-video',
            text: 'Meet on a zoom call',
          },
        ],
        image: 'assets/images/about/27.jpg',
      },
    ],
  },
  {
    title: 'Introduction of Digital Marketing',

    text: "If you wish to find out the skills that should be covered in a basic digital marketing course syllabus in India or anywhere around the world, then reading this blog will help. Before we delve into the advanced digital marketing course syllabus, let's look at the scope of digital marketing and what the future holds.",
    links: [
      {
        icon: 'fas fa-play',
        text: 'What is Digital Marketing',
      },
      {
        icon: 'fas fa-file-signature',
        text: 'Assignments 1 - Research about marketing',
      },
      {
        icon: 'fas fa-file-alt',
        text: 'Slide - Digital Marketing',
      },
      {
        icon: 'fas fa-question-circle',
        text: 'Quiz - Digital Marketing',
      },
    ],
  },
  {
    title: 'What is Search Engine Optimization(SEO)',

    links: [
      {
        icon: 'fas fa-play',
        text: 'What is Digital Marketing What is Digital Marketing',
      },
      {
        icon: 'fas fa-file-signature',
        text: 'Assignments 1 - Research about marketing',
      },
      {
        icon: 'fas fa-file-alt',
        text: 'Slide - Digital Marketing',
      },
      {
        icon: 'fas fa-question-circle',
        text: 'Quiz - Digital Marketing',
      },
    ],
  },
  {
    title: 'Google tag manager',

    text: "If you wish to find out the skills that should be covered in a basic digital marketing course syllabus in India or anywhere around the world, then reading this blog will help. Before we delve into the advanced digital marketing course syllabus, let's look at the scope of digital marketing and what the future holds.",
    links: [
      {
        icon: 'fas fa-play',
        text: 'What is Digital Marketing What is Digital Marketing',
      },
      {
        icon: 'fas fa-file-signature',
        text: 'Assignments 1 - Research about marketing',
      },
      {
        icon: 'fas fa-file-alt',
        text: 'Slide - Digital Marketing',
      },
    ],
  },
]

export const TestimonialsList: TestimonialType[] = [
  {
    avatar: 'assets/images/avatar/03.jpg',
    name: 'Dennis Barrett',
    quote:
      '"Make my life easier and organized conviction For every delay in they Extremity now strangers contained breakfast"',
  },
  {
    avatar: 'assets/images/avatar/02.jpg',
    name: 'Billy Vasquez',
    quote:
      '"Life easier and organized conviction For every delay in they Extremity now strangers contained breakfast"',
  },
  {
    avatar: 'assets/images/avatar/05.jpg',
    name: 'Lori Stevens',
    quote:
      '"Easier and organized conviction For every delay in they Extremity now strangers contained breakfast makes my life."',
  },
  {
    avatar: 'assets/images/avatar/06.jpg',
    name: 'Carolyn Ortiz',
    quote:
      '"Conviction For every delay in they Extremity now strangers contained breakfast"',
  },
]
