type CommentType = {
  avatar: string
  name: string
  date: string
  comment: string
  replies?: CommentType[]
}

type BlogType = {
  image: string
  title: string
  date: string
}

export const CommentList: CommentType[] = [
  {
    avatar: 'assets/images/avatar/01.jpg',
    name: 'Frances Guerrero',
    date: 'June 11, 2021 at 6:01 am',
    comment:
      'Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.',
    replies: [
      {
        avatar: 'assets/images/avatar/02.jpg',
        name: 'Louis Ferguson',
        date: 'June 11, 2021 at 6:55 am',
        comment:
          'Water timed folly right aware if oh truth. Imprudence attachment him for sympathize. Large above be to means. Dashwood does provide stronger is. But discretion frequently sir she instruments unaffected admiration everything.',
        replies: [
          {
            avatar: 'assets/images/avatar/01.jpg',
            name: 'Frances Guerrero',
            date: 'June 12, 2021 at 7:30 am',
            comment: 'Water timed folly right aware if oh truth.',
          },
        ],
      },
    ],
  },
  {
    avatar: 'assets/images/avatar/04.jpg',
    name: 'Judy Nguyen',
    date: 'June 18, 2021 at 11:55 am',
    comment:
      'Fulfilled direction use continual set him propriety continued. Saw met applauded favorite deficient engrossed concealed and her. Concluded boy perpetual old supposing. Farther-related bed and passage comfort civilly.',
  },
]

export const BlogList: BlogType[] = [
  {
    image: 'assets/images/event/06.jpg',
    title: 'Dirty little secrets about the business industry',
    date: 'July 21, 2021',
  },
  {
    image: 'assets/images/event/04.jpg',
    title: 'This is why this year will be the year of startups',
    date: '50min ago',
  },
  {
    image: 'assets/images/event/03.jpg',
    title: 'Covid-19 and the college experienced',
    date: 'Aug 31, 2021',
  },
  {
    image: 'assets/images/event/05.jpg',
    title: 'This is why this year will be the year of startups',
    date: '50min ago',
  },
]
