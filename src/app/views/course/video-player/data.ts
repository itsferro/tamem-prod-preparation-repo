type NoteType = {
  time: string
  description: string
}
type SectionType = {
  title: string
  status: string
  duration: string
  notes?: NoteType[]
  isCollapsed?: boolean
}

type ContentType = {
  heading: string
  sections: SectionType[]
}
export const CourseContent: ContentType[] = [
  {
    heading: 'Introduction of Digital Marketing',
    sections: [
      {
        title: 'Introduction',
        duration: '2m 10s',
        status: 'not_completed',
        isCollapsed: true,
        notes: [
          {
            time: '5:20',
            description: 'Describe SEO Engine',
          },
          {
            time: '10:20',
            description: 'Know about all marketing',
          },
        ],
      },
      {
        title: 'What is Digital Marketing',
        duration: '15m 10s',
        status: 'not_completed',
        isCollapsed: true,
        notes: [
          {
            time: '5:20',
            description: 'Describe SEO Engine',
          },
          {
            time: '10:20',
            description: 'Know about all marketing',
          },
        ],
      },
      {
        title: 'Type of Digital Marketing',
        duration: '18m 10s',
        status: 'not_completed',
      },
    ],
  },
  {
    heading: 'Customer Life cycle',
    sections: [
      {
        title: 'Introduction',
        duration: '2m 10s',
        status: 'not_completed',
      },
      {
        title: 'What is Digital Marketing',
        duration: '15m 10s',
        status: 'not_completed',
      },
      {
        title: 'Type of Digital Marketing',
        duration: '18m 10s',
        status: 'locked',
      },
    ],
  },
  {
    heading: 'What is Search Engine Optimization(SEO)',
    sections: [
      {
        title: 'Introduction',
        duration: '2m 10s',
        status: 'not_completed',
      },
      {
        title: 'How to SEO Optimise Your Homepage',
        duration: '15m 00s',
        status: 'not_completed',
      },
      {
        title: 'How to Write Title Tags Search Engines Love',
        duration: '28m 10s',
        status: 'not_completed',
      },
      {
        title: 'SEO Keyword Planning',
        duration: '38m 22s',
        status: 'locked',
      },
      {
        title: 'Internal and External Links',
        duration: '12m 10s',
        status: 'locked',
      },
      {
        title: 'Measuring SEO Effectiveness',
        duration: '35m 10s',
        status: 'locked',
      },
    ],
  },
  {
    heading: 'YouTube Marketing',
    sections: [
      {
        title: 'Video Flow',
        duration: '25m 5s',
        status: 'not_completed',
      },
      {
        title: 'Webmaster Tool',
        duration: '15m 20s',
        status: 'not_completed',
      },
      {
        title: 'Featured Contents on Channel',
        duration: '32m 20s',
        status: 'not_completed',
      },
      {
        title: 'Managing Comments',
        duration: '20m 20s',
        status: 'locked',
      },
      {
        title: 'Channel Analytics',
        duration: '18m 20s',
        status: 'locked',
      },
    ],
  },
  {
    heading: 'Why SEO',
    sections: [
      {
        title: 'Understanding SEO',
        duration: '20m 20s',
        status: 'not_completed',
      },
      {
        title: 'On-Page SEO',
        duration: '5m 20s',
        status: 'not_completed',
      },
      {
        title: 'Local SEO',
        duration: '16m 20s',
        status: 'not_completed',
      },
      {
        title: 'Measuring SEO Effectiveness',
        duration: '12m 20s',
        status: 'locked',
      },
      {
        title: 'SEO Keyword Planning',
        duration: '36m 12s',
        status: 'locked',
      },
      {
        title: 'Keywords in Blog and Articles',
        duration: '15m 20s',
        status: 'locked',
      },
      {
        title: 'Mobile SEO',
        duration: '15m 00s',
        status: 'locked',
      },
    ],
  },
  {
    heading: 'Integration with Website',
    sections: [
      {
        title: 'Creating LinkedIn Account',
        duration: '13m 20s',
        status: 'not_completed',
      },
      {
        title: 'Advance Searching',
        duration: '31m 20s',
        status: 'not_completed',
      },
    ],
  },
]
