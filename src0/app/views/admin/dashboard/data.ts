type InstructorType = {
  avatar: string
  name: string
  verified: boolean
  courses: number
  rating: number
}

export const InstructorsList: InstructorType[] = [
  {
    avatar: 'assets/images/avatar/09.jpg',
    name: 'Lori Stevens',
    verified: true,
    courses: 25,
    rating: 4.5,
  },
  {
    avatar: 'assets/images/avatar/03.jpg',
    name: 'Dennis Barrett',
    verified: false,
    courses: 18,
    rating: 4.5,
  },
  {
    avatar: 'assets/images/avatar/01.jpg',
    name: 'Jacqueline Miller',
    verified: true,
    courses: 21,
    rating: 4.8,
  },
  {
    avatar: 'assets/images/avatar/04.jpg',
    name: 'Billy Vasquez',
    verified: false,
    courses: 15,
    rating: 4.5,
  },
  {
    avatar: 'assets/images/avatar/05.jpg',
    name: 'Amanda Reed',
    verified: true,
    courses: 29,
    rating: 4.5,
  },
]

type NoticeType = {
  icon: string
  iconColor: string
  title: string
  description: string
  time: string
}

export const NoticeBoardList: NoticeType[] = [
  {
    icon: 'fas fa-user-tie',
    iconColor: 'purple',
    title: 'Join New Instructor',
    description: 'Amongst moments do in arrived Fat weddings believed prospect',
    time: '5 min ago',
  },
  {
    icon: 'fas fa-book-open',
    iconColor: 'orange',
    title: 'Update New Course',
    description: 'Arrived Fat weddings believed prospect',
    time: '4 hour ago',
  },
  {
    icon: 'fas fa-book',
    iconColor: 'info',
    title: 'Update Syllabus',
    description: 'Arrived Fat weddings believed prospect',
    time: '2 days ago',
  },
  {
    icon: 'fas fa-globe',
    iconColor: 'danger',
    title: 'Update New Feature',
    description: 'Arrived Fat weddings believed prospect',
    time: '3 days ago',
  },
]
