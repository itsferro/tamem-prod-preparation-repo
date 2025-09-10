type AwardType = {
  year: number
  name: string
}

type TeamType = {
  name: string
  role: string
  image: string
  rating: number
}

export const AwardsList: AwardType[] = [
  {
    year: 2015,
    name: 'Heroes for Children award',
  },
  {
    year: 2016,
    name: 'Education Agency of the Year',
  },
  {
    year: 2017,
    name: 'National Teacher of the Year',
  },
  {
    year: 2018,
    name: 'Best education agency 2018',
  },
  {
    year: 2019,
    name: 'Teacher of the nation (2nd place)',
  },
  {
    year: 2020,
    name: 'Best Independent Education Agency',
  },
]

export const TeamList: TeamType[] = [
  {
    name: 'Carolyn Ortiz',
    role: 'Designer',
    image: 'assets/images/avatar/01.jpg',
    rating: 4.5,
  },
  {
    name: 'Dennis Barrett',
    role: 'IT professor',
    image: 'assets/images/avatar/02.jpg',
    rating: 4.5,
  },
  {
    name: 'Frances Guerrero',
    role: 'Developer',
    image: 'assets/images/avatar/09.jpg',
    rating: 5,
  },
  {
    name: 'Larry Lawson',
    role: 'Designer',
    image: 'assets/images/avatar/04.jpg',
    rating: 4.5,
  },
  {
    name: 'Louis Crawford',
    role: 'Medical Professor',
    image: 'assets/images/avatar/10.jpg',
    rating: 4.5,
  },
]
