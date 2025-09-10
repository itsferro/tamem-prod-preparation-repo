type LectureType = {
  title: string
  duration: string
  premium?: boolean
}

export type CurriculumType = {
  title: string
  lectures: LectureType[]
}

type FaqType = {
  id: string
  question: string
  answer: string
}

type CourseType = {
  image: string
  info: string
  rating: number
  avatar: string
  title: string
  category: string
  price: number
}

export const CurriculumList: CurriculumType[] = [
  {
    title: 'Introduction of Digital Marketing',
    lectures: [
      {
        title: 'Introduction',
        duration: '2m 10s',
      },
      {
        title: 'What is Digital Marketing',
        duration: '15m 10s',
      },
      {
        title: 'Type of Digital Marketing',
        duration: '18m 10s',
      },
    ],
  },
  {
    title: 'Customer Life cycle',
    lectures: [
      {
        title: 'What is Digital Marketing',
        duration: '11m 20s',
      },
      {
        title: '15 Tips for Writing Magnetic Headlines',
        duration: '25m 20s',
      },
      {
        title: 'How to Write Like Your Customers Talk',
        duration: '11m 30s',
      },
      {
        title: 'How to Flip Features Into Benefits',
        duration: '35m 30s',
        premium: true,
      },
    ],
  },
  {
    title: 'What is Search Engine Optimization(SEO)',
    lectures: [
      {
        title: 'Introduction',
        duration: '1m 10s',
      },
      {
        title: 'Overview of SEO',
        duration: '11m 03s',
      },
      {
        title: 'How to SEO Optimise Your Homepage',
        duration: '15m 00s',
      },
      {
        title: 'How to SEO Optimise Your Homepage',
        duration: '15m 00s',
      },
      {
        title: 'How to Write Title Tags Search Engines Love',
        duration: '25m 30s',
      },
      {
        title: 'SEO Keyword Planning',
        duration: '18m 10s',
      },
      {
        title: 'eCommerce SEO',
        duration: '28m 10s',
      },
      {
        title: 'Internal and External Links',
        duration: '45m 10s',
      },
      {
        title: 'Mobile SEO',
        duration: '8m 10s',
      },
      {
        title: 'Off-page SEO',
        duration: '18m 10s',
      },
      {
        title: 'Measuring SEO Effectiveness',
        duration: '35m 10s',
      },
    ],
  },
  {
    title: 'Facebook ADS',
    lectures: [
      {
        title: 'Introduction',
        duration: '1m 20s',
      },
      {
        title: 'Creating Facebook Pages',
        duration: '25m 20s',
      },
      {
        title: 'Facebook Page Custom URL',
        duration: '11m 30s',
      },
    ],
  },
  {
    title: 'YouTube Marketing',
    lectures: [
      {
        title: 'Video Flow',
        duration: '25m 20s',
        premium: false,
      },
      {
        title: 'Webmaster Tool',
        duration: '15m 20s',
        premium: false,
      },
      {
        title: 'Featured Contents on Channel',
        duration: '32m 20s',
        premium: false,
      },
      {
        title: 'Managing Comments',
        duration: '20m 20s',
        premium: true,
      },
      {
        title: 'Channel Analytics',
        duration: '18m 20s',
        premium: true,
      },
    ],
  },
  {
    title: 'Why SEO',
    lectures: [
      {
        title: 'Understanding SEO',
        duration: '20m 20s',
        premium: false,
      },
      {
        title: 'On-Page SEO',
        duration: '15m 20s',
        premium: false,
      },
      {
        title: 'Local SEO',
        duration: '16m 20s',
        premium: false,
      },
      {
        title: 'Measuring SEO Effectiveness',
        duration: '12m 20s',
        premium: false,
      },
      {
        title: 'Keywords in Blog and Articles',
        duration: '15m 20s',
        premium: true,
      },
      {
        title: 'SEO Keyword Planning',
        duration: '36m 12s',
        premium: true,
      },
    ],
  },
  {
    title: 'Google Tag Manager',
    lectures: [
      {
        title: 'G+ Pages Ranks Higher',
        duration: '13m 20s',
        premium: false,
      },
      {
        title: 'Adding Contact Links',
        duration: '7m 20s',
        premium: false,
      },
      {
        title: 'Google Hangouts',
        duration: '12m 20s',
        premium: false,
      },
      {
        title: 'Google Local Business',
        duration: '7m 20s',
        premium: false,
      },
    ],
  },
  {
    title: 'Integration with Website',
    lectures: [
      {
        title: 'Creating LinkedIn Account',
        duration: '13m 20s',
        premium: false,
      },
      {
        title: 'Advance Searching',
        duration: '31m 20s',
        premium: false,
      },
      {
        title: 'LinkedIn Mobile App',
        duration: '25m 20s',
        premium: false,
      },
    ],
  },
]

export const FAQList: FaqType[] = [
  {
    id: '01',
    question: 'How Digital Marketing Work?',
    answer:
      'Comfort reached gay perhaps chamber his six detract besides add. Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen noisy young. At weddings believed laughing although the material does the exercise of. Up attempt offered ye civilly so sitting to. She new course gets living within Elinor joy. She rapturous suffering concealed.',
  },
  {
    id: '02',
    question: 'What is SEO?',
    answer:
      "Pleasure and so read the was hope entire first decided the so must have as on was want up of I will rival in came this touched got a physics to travelling so all especially refinement monstrous desk they was arrange the overall helplessly out of particularly ill are purer.\n\nPerson she control of to beginnings view looked eyes Than continues its and because and given and shown creating curiously to more in are man were smaller by we instead the these sighed Avoid in the sufficient me real man longer of his how her for countries to brains warned notch important Finds be to the of on the increased explain noise of power deep asking contribution this live of suppliers goals bit separated poured sort several the was organization the if relations go work after mechanic But we've area wasn't everything needs of and doctor where would.\n\nGo he prisoners And mountains in just switching city steps Might rung line what Mr Bulk; Was or between towards the have phase were its world my samples are the was royal he luxury the about trying And on he to my enough is was the remember a although lead in were through serving their assistant fame day have for its after would cheek dull have what in go feedback assignment Her of a any help if the a of semantics is rational overhauls following in from our hazardous and used more he themselves the parents up just regulatory.",
  },
  {
    id: '03',
    question: 'Who should join this course?',
    answer:
      'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on.',
  },
  {
    id: '04',
    question: 'What are the T&C for this program?',
    answer:
      "Night signs creeping yielding green Seasons together man green fruitful make fish behold earth unto you'll lights living moving sea open for fish day multiply tree good female god had fruitful of creature fill shall don't day fourth lesser he the isn't let multiply may Creeping earth under was You're without which image stars in Own creeping night of wherein Heaven years their he over doesn't whose won't kind seasons light Won't that fish him whose won't also it dominion heaven fruitful Whales created And likeness doesn't that Years without divided saying morning creeping hath you'll seas cattle in multiply under together in us said above dry tree herb saw living darkness without have won't for i behold meat brought winged Moving living second beast Over fish place beast image very him evening Thing they're fruit together forth day Seed lights Land creature together Multiply waters form brought.",
  },
  {
    id: '05',
    question: 'What certificates will I be received for this program?',
    answer:
      'Smile spoke total few great had never their too Amongst moments do in arrived at my replied Fat weddings servants but man believed prospect Companions understood is as especially pianoforte connection introduced Nay newspaper can sportsman are admitting gentleman belonging his Is oppose no he summer lovers twenty in Not his difficulty boisterous surrounded bed Seems folly if in given scale Sex contented dependent conveying advantage.',
  },
]

export const TopCourses: CourseType[] = [
  {
    image: 'assets/images/courses/4by3/17.jpg',
    info: '9.1k',
    rating: 4.5,
    avatar: 'assets/images/avatar/09.jpg',
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    category: 'Personal Development',
    price: 140,
  },
  {
    image: 'assets/images/courses/4by3/18.jpg',
    info: '2.5k',
    rating: 3.6,
    avatar: 'assets/images/avatar/07.jpg',
    title: 'Fundamentals of Business Analysis',
    category: 'Business Development',
    price: 160,
  },
  {
    image: 'assets/images/courses/4by3/21.jpg',
    info: '6k',
    rating: 3.8,
    avatar: 'assets/images/avatar/05.jpg',
    title: 'Google Ads Training: Become a PPC Expert',
    category: 'SEO',
    price: 226,
  },
  {
    image: 'assets/images/courses/4by3/20.jpg',
    info: '15k',
    rating: 4.8,
    avatar: 'assets/images/avatar/02.jpg',
    title: 'Behavior, Psychology and Care Training',
    category: 'Lifestyle',
    price: 342,
  },
]
