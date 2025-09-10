type UserType = {
  avatar: string
  name: string
}
type CourseType = {
  image: string
  title: string
  instructor: UserType
  date: string
  type: string
  price: number
  status: string
}
export const CoursesList: CourseType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    title: 'Building Scalable APIs with GraphQL',
    instructor: {
      avatar: 'assets/images/avatar/09.jpg',
      name: 'Lori Stevens',
    },
    date: '28 Oct 2021',
    type: 'Beginner',
    price: 350,
    status: 'Pending',
  },
  {
    image: 'assets/images/courses/4by3/10.jpg',
    title: 'Bootstrap 5 From Scratch',
    instructor: {
      avatar: 'assets/images/avatar/04.jpg',
      name: 'Billy Vasquez',
    },
    date: '16 Oct 2021',
    type: 'Intermediate',
    price: 256,
    status: 'Pending',
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    title: 'Graphic Design Masterclass',
    instructor: {
      avatar: 'assets/images/avatar/05.jpg',
      name: 'Carolyn Ortiz',
    },
    date: '28 Aug 2021',
    type: 'All level',
    price: 347,
    status: 'Live',
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    title: 'Learn Invision',
    instructor: {
      avatar: 'assets/images/avatar/06.jpg',
      name: 'Frances Guerrero',
    },
    date: '15 June 2021',
    type: 'All level',
    price: 445,
    status: 'Live',
  },
  {
    image: 'assets/images/courses/4by3/06.jpg',
    title: 'Angular – The Complete Guider',
    instructor: {
      avatar: 'assets/images/avatar/07.jpg',
      name: 'Louis Ferguson',
    },
    date: '10 Dec 2020',
    type: 'Intermediate',
    price: 165,
    status: 'Live',
  },
  {
    image: 'assets/images/courses/4by3/09.jpg',
    title: 'JavaScript: Full Understanding',
    instructor: {
      avatar: 'assets/images/avatar/08.jpg',
      name: 'Samuel Bishop',
    },
    date: '09 Nov 2020',
    type: 'Beginner',
    price: 575,
    status: 'Live',
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    title: 'Build Responsive Websites with HTML',
    instructor: {
      avatar: 'assets/images/avatar/02.jpg',
      name: 'Dennis Barrett',
    },
    date: '21 Aug 2020',
    type: 'Beginner',
    price: 268,
    status: 'Live',
  },
  {
    image: 'assets/images/courses/4by3/12.jpg',
    title: 'Build Websites with CSS',
    instructor: {
      avatar: 'assets/images/avatar/03.jpg',
      name: 'Joan Wallace',
    },
    date: '02 April 2020',
    type: 'All level',
    price: 370,
    status: 'Live',
  },
]
