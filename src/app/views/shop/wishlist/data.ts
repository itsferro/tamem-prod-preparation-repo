type WishlistType = {
  image: string
  badge: string
  badgeColor: string
  isFavourite: boolean
  title: string
  description: string
  rating: number
  duration: string
  lectures: number
}

export const WishList: WishlistType[] = [
  {
    image: 'assets/images/courses/4by3/02.jpg',
    badge: 'Beginner',
    badgeColor: 'bg-success bg-opacity-10 text-success',
    isFavourite: true,
    title: 'Graphic Design Masterclass',
    description:
      'Rooms oh fully taken by worse do Points afraid but may end Rooms Points afraid but may end Rooms',
    rating: 4.5,
    duration: '9h 56m',
    lectures: 65,
  },
  {
    image: 'assets/images/courses/4by3/07.jpg',
    badge: 'Beginner',
    badgeColor: 'bg-success bg-opacity-10 text-success',
    isFavourite: true,
    title: 'Deep Learning with React-Native',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.0,
    duration: '18h 56m',
    lectures: 99,
  },
  {
    image: 'assets/images/courses/4by3/04.jpg',
    badge: 'All level',
    badgeColor: 'bg-purple bg-opacity-10 text-purple',
    isFavourite: true,
    title: 'Learn Invision',
    description:
      'Arrived off she elderly beloved him Course regard to up he hardly.',
    rating: 3.5,
    duration: '6h 56m',
    lectures: 82,
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    badge: 'All level',
    badgeColor: 'bg-purple bg-opacity-10 text-purple',
    isFavourite: true,
    title: 'Build Responsive Websites with HTML',
    description:
      'Far advanced settling say finished raillery. Offered chiefly farther.',
    rating: 4.0,
    duration: '15h 30m',
    lectures: 68,
  },
]
