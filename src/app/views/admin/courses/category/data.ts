type UserType = {
  avatar: string
  name: string
}

type CategoryType = {
  image: string
  title: string
  instructor: UserType
  rating: number
  students: number
}
export const CategoryList: CategoryType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    title: 'Building Scalable APIs with GraphQL',
    instructor: {
      avatar: 'assets/images/avatar/09.jpg',
      name: 'Lori Stevens',
    },
    rating: 4.5,
    students: 15567,
  },
  {
    image: 'assets/images/courses/4by3/10.jpg',
    title: 'Bootstrap 5 From Scratch',
    instructor: {
      avatar: 'assets/images/avatar/04.jpg',
      name: 'Billy Vasquez',
    },
    rating: 4.5,
    students: 16584,
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    title: 'Graphic Design Masterclass',
    instructor: {
      avatar: 'assets/images/avatar/05.jpg',
      name: 'Carolyn Ortiz',
    },
    rating: 3.5,
    students: 6458,
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    title: 'Learn Invision',
    instructor: {
      avatar: 'assets/images/avatar/06.jpg',
      name: 'Frances Guerrero',
    },
    rating: 5,
    students: 20158,
  },
  {
    image: 'assets/images/courses/4by3/09.jpg',
    title: 'JavaScript: Full Understanding',
    instructor: {
      avatar: 'assets/images/avatar/08.jpg',
      name: 'Samuel Bishop',
    },
    rating: 4.5,
    students: 5325,
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    title: 'Build Responsive Websites with HTML',
    instructor: {
      avatar: 'assets/images/avatar/02.jpg',
      name: 'Dennis Barrett',
    },
    rating: 4.5,
    students: 8258,
  },
  {
    image: 'assets/images/courses/4by3/12.jpg',
    title: 'Build Websites with CSS',
    instructor: {
      avatar: 'assets/images/avatar/03.jpg',
      name: 'Joan Wallace',
    },
    rating: 5,
    students: 17654,
  },
]
