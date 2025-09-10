export type ReviewType = {
  avatar: string
  name: string
  date: string
  rating: number
  title: string
  content: string
  isCollapse?: boolean
}

export const ReviewList: ReviewType[] = [
  {
    avatar: 'assets/images/avatar/01.jpg',
    name: 'Frances Guerrero',
    date: 'June 11, 2021 at 6:01 am',
    rating: 4.0,
    title: 'How to implement sitemap on sass',
    content:
      'Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
  },
  {
    avatar: 'assets/images/avatar/03.jpg',
    name: 'Louis Ferguson',
    date: 'June 18, 2021 at 11:55 am',
    rating: 3.5,
    title: 'How does an Angular application work?',
    content:
      'Far advanced settling say finished raillery. Offered chiefly farther Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
  },
  {
    avatar: 'assets/images/avatar/05.jpg',
    name: 'Carolyn Ortiz',
    date: 'August 28, 2021 at 3:08 pm',
    rating: 4.0,
    title:
      'What is Flexbox and describe any elaborate on its most used properties?',
    content:
      'Offered chiefly farther Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
  },
  {
    avatar: 'assets/images/avatar/08.jpg',
    name: 'Dennis Barrett',
    date: 'August 29, 2021 at 5:35 pm',
    rating: 4.0,
    title: 'What are the different data types present in javascript?',
    content:
      'Chiefly farther Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
  },
  {
    avatar: 'assets/images/avatar/09.jpg',
    name: 'Carolyn Ortiz',
    date: 'September 15, 2021 at 8:28 am',
    rating: 4.0,
    title: 'What are object prototypes?',
    content:
      'Chiefly farther Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
  },
]
