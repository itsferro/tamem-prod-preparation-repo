import { currentYear } from '@/app/common/constants'

type StudentType = {
  name: string
  image: string
  location: string
  progress: number
  tasks: number
  date: string
}

export const StudentList: StudentType[] = [
  {
    name: 'Lori Stevens',
    image: 'assets/images/avatar/01.jpg',
    location: 'Mumbai',
    progress: 85,
    tasks: 10,
    date: '4/1/' + currentYear,
  },
  {
    name: 'Dennis Barrett',
    image: 'assets/images/avatar/03.jpg',
    location: 'New york',
    progress: 40,
    tasks: 12,
    date: '9/1/' + currentYear,
  },
  {
    name: 'Billy Vasquez',
    image: 'assets/images/avatar/04.jpg',
    location: 'Paris',
    progress: 62,
    tasks: 8,
    date: '10/1/' + currentYear,
  },
  {
    name: 'Carolyn Ortiz',
    image: 'assets/images/avatar/09.jpg',
    location: 'Delhi',
    progress: 60,
    tasks: 6,
    date: '20/1/' + currentYear,
  },
  {
    name: 'Larry Lawson',
    image: 'assets/images/avatar/07.jpg',
    location: 'London',
    progress: 35,
    tasks: 4,
    date: '12/1/' + currentYear,
  },
  {
    name: 'Frances Guerrero',
    image: 'assets/images/avatar/06.jpg',
    location: 'Pune',
    progress: 42,
    tasks: 14,
    date: '8/1/' + currentYear,
  },
]
