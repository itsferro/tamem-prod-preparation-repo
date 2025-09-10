type RequestType = {
  name: string
  image: string
  skills: string
  date: string
  status: string
}

export const InstructorRequests: RequestType[] = [
  {
    name: 'Lori Stevens',
    image: 'assets/images/avatar/09.jpg',
    skills: 'HTML, CSS, Bootstrap',
    date: '22 Oct 2021',
    status: 'Pending',
  },
  {
    name: 'Carolyn Ortiz',
    image: 'assets/images/avatar/01.jpg',
    skills: 'Photoshop, Figma, Adobe XD',
    date: '06 Sep 2021',
    status: 'Pending',
  },
  {
    name: 'Dennis Barrett',
    image: 'assets/images/avatar/03.jpg',
    skills: 'JavaScript, Java',
    date: '21 Jan 2021',
    status: 'Accepted',
  },
  {
    name: 'Billy Vasquez',
    image: 'assets/images/avatar/04.jpg',
    skills: 'Maths, Chemistry',
    date: '25 Dec 2020',
    status: 'Rejected',
  },
  {
    name: 'Jacqueline Miller',
    image: 'assets/images/avatar/05.jpg',
    skills: 'Python, Angular, React Native',
    date: '05 June 2020',
    status: 'Accepted',
  },
  {
    name: 'Amanda Reed',
    image: 'assets/images/avatar/06.jpg',
    skills: 'After Effects, Premiere Pro',
    date: '14 Feb 2020',
    status: 'Accepted',
  },
  {
    name: 'Samuel Bishop',
    image: 'assets/images/avatar/07.jpg',
    skills: 'PHP, WordPress, Shopify',
    date: '06 Jan 2020',
    status: 'Rejected',
  },
]
