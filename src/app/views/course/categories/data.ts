type CategoryType = {
  category: string
  courses: number
  image: string
  background_class: string
}

export const CategoryList: CategoryType[] = [
  {
    category: 'Data Science',
    courses: 15,
    image: 'assets/images/element/data-science.svg',
    background_class: 'bg-success bg-opacity-10',
  },
  {
    category: 'IT & Software',
    courses: 22,
    image: 'assets/images/element/online.svg',
    background_class: 'bg-orange bg-opacity-10',
  },
  {
    category: 'Engineering',
    courses: 53,
    image: 'assets/images/element/engineering.svg',
    background_class: 'bg-danger bg-opacity-10',
  },
  {
    category: 'Web Development',
    courses: 25,
    image: 'assets/images/element/coding.svg',
    background_class: 'bg-purple bg-opacity-10',
  },
  {
    category: 'Finance',
    courses: 20,
    image: 'assets/images/element/profit.svg',
    background_class: 'bg-info bg-opacity-10',
  },
  {
    category: 'Medical',
    courses: 10,
    image: 'assets/images/element/medical.svg',
    background_class: 'bg-blue bg-opacity-10',
  },
  {
    category: 'Architecture',
    courses: 30,
    image: 'assets/images/element/home.svg',
    background_class: 'bg-warning bg-opacity-15',
  },
  {
    category: 'Art & Design',
    courses: 35,
    image: 'assets/images/element/artist.svg',
    background_class: 'bg-dark bg-opacity-10',
  },
  {
    category: 'Photography',
    courses: 20,
    image: 'assets/images/element/photography.svg',
    background_class: 'bg-purple bg-opacity-10',
  },
  {
    category: 'Musics',
    courses: 10,
    image: 'assets/images/element/music.svg',
    background_class: 'bg-danger bg-opacity-10',
  },
  {
    category: 'Marketing',
    courses: 30,
    image: 'assets/images/element/marketing.svg',
    background_class: 'bg-success bg-opacity-10',
  },
  {
    category: 'Accounting',
    courses: 35,
    image: 'assets/images/element/account.svg',
    background_class: 'bg-primary bg-opacity-10',
  },
]
