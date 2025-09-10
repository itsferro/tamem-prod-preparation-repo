type SubjectType = {
  title: string
  courses: number
  image: string
}

type FeedbackType = {
  name: string
  avatar: string
  quote: string
}

export const SubjectList: SubjectType[] = [
  {
    title: 'Data Science',
    courses: 15,
    image: 'assets/images/element/data-science.svg',
  },
  {
    title: 'Computer Science',
    courses: 22,
    image: 'assets/images/element/online.svg',
  },
  {
    title: 'Engineering',
    courses: 53,
    image: 'assets/images/element/engineering.svg',
  },
  {
    title: 'Web Development',
    courses: 25,
    image: 'assets/images/element/coding.svg',
  },
  {
    title: 'Marketing',
    courses: 20,
    image: 'assets/images/element/profit.svg',
  },
  {
    title: 'Medical',
    courses: 10,
    image: 'assets/images/element/medical.svg',
  },
  {
    title: 'Architecture',
    courses: 30,
    image: 'assets/images/element/home.svg',
  },
  {
    title: 'Art & Design',
    courses: 35,
    image: 'assets/images/element/artist.svg',
  },
]

export const CustomerFeedback: FeedbackType[] = [
  {
    name: 'Lori Stevens',
    avatar: 'assets/images/avatar/05.jpg',
    quote:
      'Moonlight newspaper up its enjoyment agreeable depending. Timed voice share led him to widen. At weddings believed laughing',
  },
  {
    name: 'Billy Vasquez',
    avatar: 'assets/images/avatar/07.jpg',
    quote:
      'Its enjoyment Moonlight newspaper up agreeable depending. Timed voice share led him to widen. At weddings believed laughing',
  },
  {
    name: 'Carolyn Ortiz',
    avatar: 'assets/images/avatar/09.jpg',
    quote:
      'Newspaper up its enjoyment agreeable depending. Timed voice share led him to widen. At weddings believed laughing',
  },
  {
    name: 'Carolyn Ortiz',
    avatar: 'assets/images/avatar/01.jpg',
    quote:
      'Newspaper up its enjoyment agreeable depending. Timed voice share led him to widen. At weddings believed laughing',
  },
]
