type ProductType = {
  image: string
  rating: number
  wishlist: boolean
  title: string
  duration: string
  lectures: number
  level: string
}

export const ProductData: ProductType[] = [
  {
    title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    image: 'assets/images/courses/4by3/01.jpg',
    wishlist: true,
    duration: '6h 56m',
    lectures: 82,
    level: 'Beginner',
    rating: 4.5,
  },
  {
    title: 'Graphic Design Masterclass',
    image: 'assets/images/courses/4by3/02.jpg',
    wishlist: false,
    duration: '9h 56m',
    lectures: 65,
    level: 'All level',
    rating: 4.0,
  },
  {
    title: 'Create a Design System in Figma',
    image: 'assets/images/courses/4by3/03.jpg',
    wishlist: false,
    duration: '7h 16m',
    lectures: 32,
    level: 'Intermediate',
    rating: 4.0,
  },
  {
    title: 'The Complete Web Development in python',
    image: 'assets/images/courses/4by3/05.jpg',
    wishlist: true,
    duration: '7h 16m',
    lectures: 32,
    level: 'Intermediate',
    rating: 4.0,
  },
  {
    title: 'Angular – The Complete Guider',
    image: 'assets/images/courses/4by3/06.jpg',
    wishlist: false,
    duration: '21h 16m',
    lectures: 68,
    level: 'All level',
    rating: 4.5,
  },
  {
    title: 'Deep Learning with React-Native',
    image: 'assets/images/courses/4by3/07.jpg',
    wishlist: false,
    duration: '10h 16m',
    lectures: 21,
    level: 'Advance',
    rating: 3.5,
  },
  {
    title: 'JavaScript: Full Understanding',
    image: 'assets/images/courses/4by3/09.jpg',
    wishlist: true,
    duration: '7h 16m',
    lectures: 12,
    level: 'Beginner',
    rating: 4.0,
  },
  {
    title: 'Build Responsive Websites with HTML',
    image: 'assets/images/courses/4by3/11.jpg',
    wishlist: false,
    duration: '15h 16m',
    lectures: 38,
    level: 'All level',
    rating: 4.0,
  },
  {
    title: 'Build Websites with CSS',
    image: 'assets/images/courses/4by3/12.jpg',
    wishlist: false,
    duration: '22h 16m',
    lectures: 16,
    level: 'Advance',
    rating: 4.5,
  },
  {
    title: 'PHP with - CMS Project',
    image: 'assets/images/courses/4by3/13.jpg',
    wishlist: true,
    duration: '10h 16m',
    lectures: 9,
    level: 'Intermediate',
    rating: 4.5,
  },
]
