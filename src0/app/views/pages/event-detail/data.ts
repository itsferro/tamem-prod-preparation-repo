type SpeakersType = {
  name: string
  role: string
}

type EventType = {
  time: string
  title: string
  avatar?: string
  speakers?: SpeakersType[]
}

type ScheduleType = {
  day: string
  date: string
  events: EventType[]
}

export const ScheduleList: ScheduleType[] = [
  {
    day: 'Day-1',
    date: 'Wed, January 1',
    events: [
      {
        time: '8:00 am',
        title: 'Grad Opening',
        avatar: 'assets/images/avatar/01.jpg',
        speakers: [
          {
            name: 'Lori Stevens',
            role: 'Chairman of Eduport',
          },
        ],
      },
      {
        time: '9:00 am',
        title: 'The Modern Engineering Methods',
        avatar: 'assets/images/avatar/02.jpg',
        speakers: [
          {
            name: 'Billy Vasquez',
            role: 'Partner Startup',
          },
        ],
      },
      {
        time: '10:00 am',
        title: 'Coffee Break',
      },
      {
        time: '10:30 am',
        title: 'Evolution of User Experience',
        avatar: 'assets/images/avatar/04.jpg',
        speakers: [
          {
            name: 'Larry Lawson',
            role: 'Co-founder',
          },
          {
            name: 'Carolyn Ortiz',
            role: 'Eduport Director',
          },
        ],
      },
      {
        time: '2:00 pm',
        title: 'Responsive Web Applications',
        avatar: 'assets/images/avatar/06.jpg',
        speakers: [
          {
            name: 'Jacqueline Miller',
            role: 'Head Engineer',
          },
        ],
      },
    ],
  },
  {
    day: 'Day-2',
    date: 'Thu, January 2',
    events: [
      {
        time: '8:00 am',
        title: 'Autonomous Vehicles',
        avatar: 'assets/images/avatar/03.jpg',
        speakers: [
          {
            name: 'Billy Vasquez',
            role: 'Chairman of wizixo',
          },
        ],
      },
      {
        time: '9:30 am',
        title: 'Global Innovations in Media',
        avatar: 'assets/images/avatar/05.jpg',
        speakers: [
          {
            name: 'Lori Stevens',
            role: 'VP Design wizixo',
          },
        ],
      },
      {
        time: '10:00 am',
        title: 'Coffee Break',
      },
      {
        time: '10:30 am',
        title: 'Value and Building Blocks',
        avatar: 'assets/images/avatar/06.jpg',
        speakers: [
          {
            name: 'Frances Guerrero',
            role: 'Co-founder wizixo',
          },
        ],
      },
      {
        time: '1:00 pm',
        title: 'Lunch time',
      },
      {
        time: '2:00 pm',
        title: 'The Digital Economy',
        avatar: 'assets/images/avatar/08.jpg',
        speakers: [
          {
            name: 'Louis Ferguson',
            role: 'Web Technologist',
          },
        ],
      },
    ],
  },
  {
    day: 'Day-3',
    date: 'Fri, January 3',
    events: [
      {
        time: '8:00 am',
        title: 'Autonomous Vehicles',
        avatar: 'assets/images/avatar/03.jpg',
        speakers: [
          {
            name: 'Billy Vasquez',
            role: 'Chairman of wizixo',
          },
        ],
      },
      {
        time: '9:30 am',
        title: 'Global Innovations in Media',
        avatar: 'assets/images/avatar/05.jpg',
        speakers: [
          {
            name: 'Lori Stevens',
            role: 'VP Design wizixo',
          },
        ],
      },
      {
        time: '10:00 am',
        title: 'Coffee Break',
      },
      {
        time: '10:30 am',
        title: 'Value and Building Blocks',
        avatar: 'assets/images/avatar/06.jpg',
        speakers: [
          {
            name: 'Frances Guerrero',
            role: 'Co-founder wizixo',
          },
        ],
      },
      {
        time: '1:00 pm',
        title: 'Lunch time',
      },
      {
        time: '2:00 pm',
        title: 'The Digital Economy',
        avatar: 'assets/images/avatar/08.jpg',
        speakers: [
          {
            name: 'Louis Ferguson',
            role: 'Web Technologist',
          },
        ],
      },
    ],
  },
  {
    day: 'Day-4',
    date: 'Sat, January 4',
    events: [
      {
        time: '8:00 am',
        title: 'Grad Opening',
        avatar: 'assets/images/avatar/01.jpg',
        speakers: [
          {
            name: 'Lori Stevens',
            role: 'Chairman of Eduport',
          },
        ],
      },
      {
        time: '9:00 am',
        title: 'The Modern Engineering Methods',
        avatar: 'assets/images/avatar/02.jpg',
        speakers: [
          {
            name: 'Billy Vasquez',
            role: 'Partner Startup',
          },
        ],
      },
      {
        time: '10:00 am',
        title: 'Coffee Break',
      },
      {
        time: '10:30 am',
        title: 'Evolution of User Experience',
        avatar: 'assets/images/avatar/04.jpg',
        speakers: [
          {
            name: 'Larry Lawson',
            role: 'Co-founder',
          },
          {
            name: 'Carolyn Ortiz',
            role: 'Eduport Director',
          },
        ],
      },
      {
        time: '2:00 pm',
        title: 'Responsive Web Applications',
        avatar: 'assets/images/avatar/06.jpg',
        speakers: [
          {
            name: 'Jacqueline Miller',
            role: 'Head Engineer',
          },
        ],
      },
    ],
  },
]
