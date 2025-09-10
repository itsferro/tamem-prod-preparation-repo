type StudentType = {
  name: string
  location: string
  avatar: string
  payments: number
  total_courses: number
  progress: number
  join_date: string
}

export const StudentList: StudentType[] = [
  {
    name: 'Carolyn Ortiz',
    location: 'Mumbai',
    avatar: 'assets/images/avatar/01.jpg',
    payments: 6205,
    total_courses: 21,
    progress: 85,
    join_date: '29 Aug 2021',
  },
  {
    name: 'Billy Vasquez',
    location: 'Delhi',
    avatar: 'assets/images/avatar/04.jpg',
    payments: 1256,
    total_courses: 16,
    progress: 60,
    join_date: '15 July 2021',
  },
  {
    name: 'Dennis Barrett',
    location: 'New York',
    avatar: 'assets/images/avatar/03.jpg',
    payments: 9256,
    total_courses: 38,
    progress: 74,
    join_date: '22 June 2021',
  },
  {
    name: 'Lori Stevens',
    location: 'California',
    avatar: 'assets/images/avatar/09.jpg',
    payments: 10688,
    total_courses: 7,
    progress: 45,
    join_date: '18 April 2021',
  },
  {
    name: 'Jacqueline Miller',
    location: 'Chennai',
    avatar: 'assets/images/avatar/05.jpg',
    payments: 856,
    total_courses: 5,
    progress: 90,
    join_date: '05 Aug 2021',
  },
  {
    name: 'Samuel Bishop',
    location: 'Canada',
    avatar: 'assets/images/avatar/02.jpg',
    payments: 3578,
    total_courses: 14,
    progress: 30,
    join_date: '18 Jan 2021',
  },
]
