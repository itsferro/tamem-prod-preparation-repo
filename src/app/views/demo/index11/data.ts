import { book, peoples, person, star, video } from '@/app/common/icon'

type FeatureType = {
  icon: string
  title: string
  content: string
}

type InstructorType = {
  image: string
  rating?: number
  title: string
  instructor: string
}

type FAQType = {
  question: string
  answer: string
}

export const FeatureList: FeatureType[] = [
  {
    icon: video,
    title: 'Occasional Video Update',
    content:
      'Mountains in just switching city steps Might rung line what Was or between towards the have phase.',
  },
  {
    icon: peoples,
    title: 'Online Course From Experts',
    content:
      'Prisoners And mountains in just switching city steps Might rung line Was or between the have phase.',
  },
  {
    icon: person,
    title: 'Class Program Options',
    content:
      'Switching city steps Might rung line what Mr Bulk; Was or between towards the have phase.',
  },
  {
    icon: book,
    title: 'Over 500+ High Quality Courses',
    content:
      'Go he prisoners And mountains in just switching city steps Might.',
  },
  {
    icon: star,
    title: 'Earn a Certificate of Achievement',
    content:
      'Go he prisoners And mountains in just switching city steps Might.',
  },
]

export const InstructorList: InstructorType[] = [
  {
    image: 'assets/images/instructor/01.jpg',
    rating: 4.3,
    title: 'Build your brand & business',
    instructor: 'Dennis Barrett',
  },
  {
    image: 'assets/images/instructor/02.jpg',
    rating: 4.5,
    title: 'Master in logo design',
    instructor: 'Jacqueline Miller',
  },
  {
    image: 'assets/images/instructor/03.jpg',
    rating: 4.8,
    title: 'Create brand using vector illustration',
    instructor: 'Louis Ferguson',
  },
  {
    image: 'assets/images/instructor/06.jpg',
    rating: 4.2,
    title: 'Develop your marketing skills style',
    instructor: 'Frances Guerrero',
  },
  {
    image: 'assets/images/instructor/07.jpg',
    rating: 4.8,
    title: 'Build your own responsive website',
    instructor: 'Amanda Reed',
  },
  {
    image: 'assets/images/instructor/08.jpg',
    rating: 4.7,
    title: 'Become a professional product photographer',
    instructor: 'Samuel Bishop',
  },
  {
    image: 'assets/images/instructor/10.jpg',
    rating: 4.9,
    title: 'Developed your photo editing skills',
    instructor: 'Lori Stevens',
  },
  {
    image: 'assets/images/instructor/11.jpg',
    rating: 4.0,
    title: 'Master logo design',
    instructor: 'Joan Wallace',
  },
]

export const TopList: InstructorType[] = [
  {
    image: 'assets/images/courses/4by3/08.jpg',
    title: 'Sketch from A to Z: for app designer',
    instructor: 'Billy Vasquez',
  },
  {
    image: 'assets/images/courses/4by3/02.jpg',
    title: 'Graphic Design Masterclass',
    instructor: 'Carolyn Ortiz',
  },
  {
    image: 'assets/images/courses/4by3/03.jpg',
    title: 'Create a Design System in Figma',
    instructor: 'Dennis Barrett',
  },
  {
    image: 'assets/images/courses/4by3/11.jpg',
    title: 'Build Responsive Websites with HTML',
    instructor: 'Larry Lawson',
  },
  {
    image: 'assets/images/courses/4by3/06.jpg',
    title: 'Build Responsive Websites with Angular',
    instructor: 'Larry Lawson',
  },
]

export const FaqList: FAQType[] = [
  {
    question: 'What is this theme layout for?',
    answer:
      'Yet remarkably appearance gets him his projection. Diverted endeavor bed peculiar men the not desirous. Acuteness abilities ask can offending furnished fulfilled sex. Warrant fifteen exposed ye at mistake. Blush since so in noisy still built up an again. As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mention perhaps attempt pointed suppose. Unknown ye chamber of warrant of Norland arrived',
  },
  {
    question: 'How can we help?',
    answer:
      'What deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be.',
  },
  {
    question: 'How to edit my Profile?',
    answer:
      'First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be.',
  },
  {
    question: 'How much should I offer the sellers? ',
    answer:
      'Post no so what deal evil rent by real in. But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.',
  },
  {
    question: 'Additional Options and Services ',
    answer:
      'But her ready least set lived spite solid. September how men saw tolerably two behavior arranging. She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. Frequently partiality possession resolution at or appearance unaffected me. Engaged its was the evident pleased husband. Ye goodness felicity do disposal dwelling no. First am plate jokes to began to cause a scale. Subjects he prospect elegance followed no overcame possible it on. Improved own provided blessing may peculiar domestic. Sight house has sex never. No visited raising gravity outward subject my cottage Mr be. Hold do at tore in park feet near my case. Invitation at understood occasional sentiments insipidity inhabiting in. Off melancholy alteration principles old. Is do speedily kindness properly oh. Respect article painted cottage he is offices parlors.',
  },
]
