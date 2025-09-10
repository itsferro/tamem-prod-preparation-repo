export type MenuItemType = {
  key: string
  isTitle?: boolean
  title: string
  link?: string
  parentKey?: string
  subItems?: MenuItemType[]
  icon?: string
  logo?: string
  description?: string
  divider?: boolean
  badge?: string
  isCollapsed?: boolean
  role?:string
}

export const CATEGORY_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'development',
    title: 'Development',
    role:'admin',
    subItems: [
      {
        key: 'webDevelopment',
        title: 'Web Development',
        subItems: [
          { key: 'css', title: 'CSS' },
          { key: 'javascript', title: 'JavaScript' },
          { key: 'angular', title: 'Angular' },
          { key: 'php', title: 'PHP' },
          { key: 'html', title: 'HTML' },
          { key: 'react', title: 'React' },
        ],
      },
      { key: 'dataScience', title: 'Data Science' },
      { key: 'mobileDevelopment', title: 'Mobile Development' },
      { key: 'programming', title: 'Programming Language' },
      { key: 'testing', title: 'Software Testing' },
      { key: 'engineering', title: 'Software Engineering' },
      { key: 'softwareTools', title: 'Software Development Tools' },
    ],
  },
  { key: 'design', title: 'Design' },
  {
    key: 'marketing',
    title: 'Marketing',
    subItems: [
      {
        key: 'getStarted',
        title: 'Get started',
        subItems: [
          { key: 'marketResearch', title: 'Market Research' },
          { key: 'advertising', title: 'Advertising' },
          { key: 'consumerBehavior', title: 'Consumer Behavior' },
          { key: 'digitalMarketing', title: 'Digital Marketing' },
          { key: 'ethics', title: 'Marketing Ethics' },
          { key: 'mediaMarketing', title: 'Social Media Marketing' },
          { key: 'publicRelation', title: 'Public Relations' },
          { key: 'advertising', title: 'Advertising' },
          { key: 'decisionScience', title: 'Decision Science' },
          { key: 'seo', title: 'SEO' },
          { key: 'businessMarketing', title: 'Business Marketing' },
        ],
      },
      {
        key: 'degree',
        title: 'Degree',
        subItems: [
          {
            key: 'american',
            title: 'American Century University, New Mexico',
            description: 'Bachelor of computer science',
            logo: 'assets/images/client/uni-logo-01.svg',
          },
          {
            key: 'indiana',
            title: 'Indiana College of - Bloomington',
            description: 'Masters of computer science',
            logo: 'assets/images/client/uni-logo-02.svg',
          },
          {
            key: 'florida',
            title: 'College of South Florida',
            description: 'Medical science college',
            logo: 'assets/images/client/uni-logo-03.svg',
          },
          {
            key: 'andeerson',
            title: 'Andeerson Campus',
            description: 'Bachelor of computer science',
            logo: 'assets/images/client/uni-logo-01.svg',
          },
          {
            key: 'california',
            title: 'University of South California',
            description: 'Masters of business development',
            logo: 'assets/images/client/uni-logo-04.svg',
          },
        ],
      },
      {
        key: 'certificate',
        title: 'Certificate',
        subItems: [
          {
            key: 'googleSEO',
            title: 'Google SEO certificate',
            description: 'No prerequisites',
            icon: 'fab fa-fw fa-google text-google-icon',
            parentKey: 'certificate',
          },
          {
            key: 'businessDevelopment',
            title: 'Business Development Executive(BDE)',
            description: 'No prerequisites',
            icon: 'fab fa-fw fa-linkedin-in text-linkedin',
            parentKey: 'certificate',
          },
          {
            key: 'socialMedia',
            title: 'Facebook social media marketing',
            description: 'Expert advice',
            icon: 'fab fa-fw fa-facebook text-facebook',
            parentKey: 'certificate',
          },
          {
            key: 'graphicDesign',
            title: 'Creative graphics design',
            description: 'No prerequisites',
            icon: 'fas fa-fw fa-basketball-ball text-dribbble',
            parentKey: 'certificate',
          },
        ],
      },
    ],
  },
  { key: 'music', title: 'Music' },
  { key: 'lifestyle', title: 'Lifestyle' },
  { key: 'it', title: 'IT & software' },
  { key: 'personal', title: 'Personal development' },
  { key: 'health', title: 'Health & fitness' },
  { key: 'teaching', title: 'Teaching' },
  { key: 'socialScience', title: 'Social science' },
  { key: 'mathLogic', title: 'Math & logic' },
]


//    #ref_menu condition   

export const DEMO_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'demo',
    title: 'Demos',
    icon: 'bi bi-house',
    role: 'admin',
    subItems: [
      {
        key: 'Cataloge',
        title: 'Catalog',
        link: '../catalog',
        parentKey: 'course',
        role: 'admin',
      },
      {
        key: 'Development',
        title: 'Development',
        link: '../development',
        parentKey: 'course',
        role: 'admin',
      },
      {
        key: 'Key-Insights',
        title: 'Insights',
        link: '../insights',
        parentKey: 'development',
        role: 'admin',
      },
      // {
      //   key: 'defaultHome',
      //   title: 'Home Default',
      //   link: '/index-1',
      //   parentKey: 'demo',
      //   role: 'admin',
      // },
      {
        key: 'educationHome',
        title: 'Home Education',
        link: '/index-2',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'academyHome',
        title: 'Home Academy',
        link: '/index-3',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'courseHome',
        title: 'Home Course',
        link: '/index-4',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'universityHome',
        title: 'Home University',
        link: '/index-5',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'kindergartenHome',
        title: 'Home Kindergarten',
        link: '/index-6',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'landingHome',
        title: 'Home Landing',
        link: '/index-7',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'tutorHome',
        title: 'Home Tutor',
        link: '/index-8',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'schoolHome',
        title: 'Home School',
        link: '/index-9',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'abroadHome',
        title: 'Home Abroad',
        link: '/index-10',
        parentKey: 'demo',
        role: 'system',
      },
      {
        key: 'workshopHome',
        title: 'Home Workshop',
        link: '/index-11',
        parentKey: 'demo',
        role: 'system',
      },
    ],
  },
  {
    key: 'pages',
    title: 'Pages',
    icon: 'bi bi-journals',
    subItems: [
      {
        key: 'course',
        title: 'Course',
        parentKey: 'pages',
        subItems: [
          {
            key: 'categories',
            title: 'Course Categories',
            link: '/course/categories',
            parentKey: 'course',
            divider: true,
          },
          {
            key: 'gridClassic',
            title: 'Course Grid Classic',
            link: '/course/grid',
            parentKey: 'course',
          },
          {
            key: 'minimalClassic',
            title: 'Course Grid Minimal',
            link: '/course/grid-2',
            parentKey: 'course',
            divider: true,
          },
          {
            key: 'listClassic',
            title: 'Course List Classic',
            link: '/course/list',
            parentKey: 'course',
          },
          {
            key: 'listMinimalClassic',
            title: 'Course List Minimal',
            link: '/course/list-2',
            parentKey: 'course',
            divider: true,
          },
          {
            key: 'detailClassic',
            title: 'Course Detail Classic',
            link: '/course/detail',
            parentKey: 'course',
          },
          {
            key: 'minimalDetailClassic',
            title: 'Course Detail Minimal',
            link: '/course/detail-min',
            parentKey: 'course',
          },
          {
            key: 'detailAdvance',
            title: 'Course Detail Advance',
            link: '/course/detail-adv',
            parentKey: 'course',
          },
          {
            key: 'moduleDetail',
            title: 'Course Detail Module',
            link: '/course/detail-module',
            parentKey: 'course',
          },
          {
            key: 'fullVideo',
            title: 'Course Full Screen Video',
            link: '/course/video-player',
            parentKey: 'course',
          },
        ],
      },
      {
        key: 'about',
        title: 'About',
        parentKey: 'pages',
        subItems: [
          {
            key: 'aboutUs',
            title: 'About Us',
            link: '/about',
            parentKey: 'about',
          },
          {
            key: 'contactUs',
            title: 'Contact Us',
            link: '/contact-us',
            parentKey: 'about',
          },
          {
            key: 'blogGrid',
            title: 'Blog Grid',
            link: '/blog-grid',
            parentKey: 'about',
          },
          {
            key: 'blogMasonry',
            title: 'Blog Masonry',
            link: '/blog-masonry',
            parentKey: 'about',
          },
          {
            key: 'blogDetail',
            title: 'Blog Detail',
            link: '/blog-detail',
            parentKey: 'about',
          },
          {
            key: 'pricing',
            title: 'Pricing',
            link: '/pricing',
            parentKey: 'about',
          },
        ],
      },
      {
        key: 'heroBanner',
        title: 'Hero Banner',
        parentKey: 'pages',
        subItems: [
          {
            key: 'heroForm',
            title: 'Hero Form',
            link: '/hero/form',
            parentKey: 'heroBanner',
          },
          {
            key: 'heroVector',
            title: 'Hero Vector',
            link: '/hero/vector',
            parentKey: 'heroBanner',
          },
          {
            key: 'comingSoon',
            title: 'Coming soon....',
            parentKey: 'heroBanner',
          },
        ],
      },
      {
        key: 'instructorList',
        title: 'Instructor List',
        link: '/instructor-list',
        parentKey: 'pages',
      },
      {
        key: 'instructorSingle',
        title: 'Instructor Single',
        link: '/instructor-single',
        parentKey: 'pages',
      },
      {
        key: 'instructorBecome',
        title: 'Become an Instructor',
        link: '/become-instructor',
        parentKey: 'pages',
      },
      {
        key: 'abroadSingle',
        title: 'Abroad Single',
        link: '/abroad-single',
        parentKey: 'pages',
      },
      {
        key: 'workshopDetail',
        title: 'Workshop Detail',
        link: '/workshop-detail',
        parentKey: 'pages',
      },
      {
        key: 'eventDetail',
        title: 'Event Detail',
        link: '/event-detail',
        parentKey: 'pages',
      },
      {
        key: 'shop',
        title: 'Shop',
        parentKey: 'pages',
        subItems: [
          {
            key: 'shopGrid',
            title: 'Shop grid',
            link: '/shop',
            parentKey: 'shop',
          },
          {
            key: 'productDetail',
            title: 'Product detail',
            link: '/shop/product-detail',
            parentKey: 'shop',
          },
          { key: 'cart', title: 'Cart', link: '/shop/cart', parentKey: 'shop' },
          {
            key: 'checkout',
            title: 'Checkout',
            link: '/shop/checkout',
            parentKey: 'shop',
          },
          {
            key: 'emptyCart',
            title: 'Empty Cart',
            link: '/shop/empty-cart',
            parentKey: 'shop',
          },
          {
            key: 'wishlist',
            title: 'Wishlist',
            link: '/shop/wishlist',
            parentKey: 'shop',
          },
        ],
      },
      {
        key: 'help',
        title: 'Help',
        parentKey: 'pages',
        subItems: [
          {
            key: 'helpCenter',
            title: 'Help Center',
            link: '/help/center',
            parentKey: 'help',
          },
          {
            key: 'helpSingle',
            title: 'Help Center Single',
            link: '/help/center-detail',
            parentKey: 'help',
          },
          { key: 'faqs', title: 'FAQs', link: '/faq', parentKey: 'help' },
        ],
      },
      {
        key: 'authentication',
        title: 'Authentication',
        parentKey: 'pages',
        subItems: [
          {
            key: 'signIn',
            title: 'Sign In',
            link: '/sign-in',
            parentKey: 'authentication',
          },
          {
            key: 'signup',
            title: 'Sign Up',
            link: '/sign-up',
            parentKey: 'authentication',
          },
          {
            key: 'forgotPassword',
            title: 'Forgot Password',
            link: '/forgot-password',
            parentKey: 'authentication',
          },
        ],
      },
      {
        key: 'form',
        title: 'Form',
        parentKey: 'pages',
        subItems: [
          {
            key: 'demoRequest',
            title: 'Request a demo',
            link: '/request-demo',
            parentKey: 'form',
          },
          {
            key: 'book',
            title: 'Book a Class',
            link: '/book-class',
            parentKey: 'form',
          },
          {
            key: 'freeAccess',
            title: 'Free Access',
            link: '/request-access',
            parentKey: 'form',
          },
          {
            key: 'admissionForm',
            title: 'Admission Form',
            link: '/admission-form',
            parentKey: 'form',
          },
        ],
      },
      {
        key: 'speciality',
        title: 'Specialty',
        parentKey: 'pages',
        subItems: [
          {
            key: '404Error',
            title: 'Error 404',
            link: '/error-404',
            parentKey: 'speciality',
          },
          {
            key: 'comingSoon',
            title: 'Coming Soon',
            link: '/coming-soon',
            parentKey: 'speciality',
          },
        ],
      },
    ],
  },
  {
    key: 'accounts',
    title: 'Accounts',
    icon: 'bi bi-speedometer2',
    subItems: [
      {
        key: 'instructor',
        title: 'Instructor',
        icon: 'fas fa-user-tie',
        parentKey: 'accounts',
        subItems: [
          {
            key: 'dashboard',
            title: 'Dashboard',
            icon: 'bi bi-grid-fill',
            link: '/instructor/dashboard',
            parentKey: 'instructor',
          },
          {
            key: 'manageCourses',
            title: 'Courses',
            icon: 'bi bi-basket-fill',
            link: '/instructor/manage-course',
            parentKey: 'instructor',
          },
          {
            key: 'createCourse',
            title: 'Create Course',
            icon: 'bi bi-file-earmark-plus-fill',
            link: '/instructor/create-course',
            parentKey: 'instructor',
          },
          {
            key: 'addCourse',
            title: 'Course Added',
            icon: 'bi bi-file-check-fill',
            link: '/course-added',
            parentKey: 'instructor',
          },
          {
            key: 'quiz',
            title: 'Quiz',
            icon: 'bi bi-question-diamond',
            link: '/instructor/quiz',
            parentKey: 'instructor',
          },
          {
            key: 'earnings',
            title: 'Earnings',
            icon: 'fas fa-chart-line',
            link: '/instructor/earning',
            parentKey: 'instructor',
          },
          {
            key: 'studentList',
            title: 'Students',
            icon: 'fas fa-user-graduate',
            link: '/instructor/studentlist',
            parentKey: 'instructor',
          },
          {
            key: 'orders',
            title: 'Orders',
            icon: 'bi bi-cart-check-fill',
            link: '/instructor/order',
            parentKey: 'instructor',
          },
          {
            key: 'reviews',
            title: 'Reviews',
            icon: 'bi bi-star-fill',
            link: '/instructor/review',
            parentKey: 'instructor',
          },
          {
            key: 'payout',
            title: 'Payout',
            icon: 'fas fa-wallet',
            link: '/instructor/payout',
            parentKey: 'instructor',
          },
        ],
      },
      {
        key: 'student',
        title: 'Student',
        icon: 'fas fa-user-graduate',
        parentKey: 'accounts',
        subItems: [
          {
            key: 'studentDashboard',
            title: 'Dashboard',
            icon: 'bi bi-grid-fill',
            link: '/student/dashboard',
            parentKey: 'student',
          },
          {
            key: 'studentSubscriptions',
            title: 'My Subscriptions',
            icon: 'bi bi-card-checklist',
            link: '/student/subscription',
            parentKey: 'student',
          },
          {
            key: 'studentCourses',
            title: 'Courses',
            icon: 'bi bi-basket-fill',
            link: '/student/course-list',
            parentKey: 'student',
          },
          {
            key: 'studentResume',
            title: 'Course Resume',
            icon: 'far fa-fw fa-file-alt',
            link: '/student/course-resume',
            parentKey: 'student',
          },
          {
            key: 'studentQuiz',
            title: 'Quiz',
            icon: 'bi bi-question-diamond',
            link: '/student/quiz',
            parentKey: 'student',
          },
          {
            key: 'studentPaymentInfo',
            title: 'Payment Info',
            icon: 'bi bi-credit-card-2-front-fill',
            link: '/student/payment-info',
            parentKey: 'student',
          },
          {
            key: 'studentWishlist',
            title: 'Wishlist',
            icon: 'fas bi-cart-check-fill',
            link: '/student/bookmark',
            parentKey: 'student',
          },
        ],
      },
      {
        key: 'admin',
        title: 'Admin',
        icon: 'fas fa-user-cog',
        link: '/admin/dashboard',
        parentKey: 'accounts',
        divider: true,
      },
      {
        key: 'editProfile',
        title: 'Edit Profile',
        icon: 'fas fa-fw fa-edit',
        link: '/instructor/edit-profile',
        parentKey: 'accounts',
      },
      {
        key: 'setting',
        title: 'Settings',
        icon: 'fas fa-fw fa-cog',
        link: '/instructor/setting',
        parentKey: 'accounts',
      },
      {
        key: 'deleteProfile',
        title: 'Delete Profile',
        icon: 'fas fa-fw fa-trash-alt',
        link: '/instructor/delete-account',
        parentKey: 'accounts',
        divider: true,
      },
      {
        key: 'dropdown',
        title: 'Dropdown levels',
        icon: '',
        parentKey: 'accounts',
        subItems: [
          {
            key: 'dropdownEnd',
            title: 'Dropdown (end)',
            parentKey: 'dropdown',
            subItems: [
              {
                key: 'item-1',
                title: 'Dropdown item',
                parentKey: 'dropdownEnd',
              },
              {
                key: 'item-2',
                title: 'Dropdown item',
                parentKey: 'dropdownEnd',
              },
            ],
          },
          {
            key: 'dropdownItem',
            title: 'Dropdown item',
            parentKey: 'dropdown',
          },
          {
            key: 'dropdownStart',
            title: 'Dropdown (start)',
            parentKey: 'dropdown',
            subItems: [
              {
                key: 'item-1',
                title: 'Dropdown item',
                parentKey: 'dropdownStart',
              },
              {
                key: 'item-2',
                title: 'Dropdown item',
                parentKey: 'dropdownStart',
              },
            ],
          },
          {
            key: 'dropdownItem1',
            title: 'Dropdown item',
            parentKey: 'dropdown',
          },
        ],
      },
    ],
  },
]

export const MEGA_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'getStarted',
    title: 'Get started',
    parentKey: 'megaMenu',
    role:'system',
    subItems: [
      {
        key: 'marketResearch',
        title: 'Market research',
        link: '/index-7',
        parentKey: 'getStarted',
      },
      {
        key: 'advertising',
        title: 'Advertising',
        link: '/index-2',
        parentKey: 'getStarted',
      },
      {
        key: 'consumerBehavior',
        title: 'Consumer behavior',
        link: '/blog-detail',
        parentKey: 'getStarted',
      },
      {
        key: 'digitalMarketing',
        title: 'Digital marketing',
        link: '/blog-grid',
        parentKey: 'getStarted',
      },
      {
        key: 'marketingEthics',
        title: 'Marketing ethics',
        link: '/blog-masonry',
        parentKey: 'getStarted',
      },
      {
        key: 'socialMedia',
        title: 'Social media marketing',
        link: '/index-10',
        parentKey: 'getStarted',
      },
      {
        key: 'publicRelation',
        title: 'Public relations',
        link: '/contact-us',
        parentKey: 'getStarted',
      },
      {
        key: 'advertising',
        title: 'Advertising',
        link: '/event-detail',
        parentKey: 'getStarted',
      },
      {
        key: 'decisionScience',
        title: 'Decision science',
        link: '/course/categories',
        parentKey: 'getStarted',
      },
      { key: 'seo', title: 'SEO', link: '#', parentKey: 'getStarted' },
      {
        key: 'businessMarketing',
        title: 'Business marketing',
        link: '/course/detail-module',
        parentKey: 'getStarted',
      },
    ],
  },
  {
    key: 'degree',
    title: 'Degree',
    parentKey: 'megaMenu',
    subItems: [
      {
        key: 'contactManager',
        title: 'Contact management',
        link: '/course/detail',
        description:
          'Speedily say has suitable disposal add boy. On forth doubt miles of child.',
        parentKey: 'degree',
      },
      {
        key: 'salesPipeline',
        title: 'Sales pipeline',
        link: '/course/detail-min',
        description:
          'Speedily say has suitable disposal add boy. On forth doubt miles of child.',
        parentKey: 'degree',
      },
      {
        key: 'security',
        title: 'Security & Permission',
        link: '/course/detail-adv',
        description:
          'Speedily say has suitable disposal add boy. On forth doubt miles of child.',
        parentKey: 'degree',
      },
    ],
  },
  {
    key: 'certificate',
    title: 'Certificate',
    parentKey: 'megaMenu',
    subItems: [
      {
        key: 'googleSEO',
        title: 'Google SEO certificate',
        description: 'No prerequisites',
        icon: 'fab fa-fw fa-google text-google-icon',
        parentKey: 'certificate',
      },
      {
        key: 'businessDevelopment',
        title: 'Business Development Executive(BDE)',
        description: 'No prerequisites',
        icon: 'fab fa-fw fa-linkedin-in text-linkedin',
        parentKey: 'certificate',
      },
      {
        key: 'socialMedia',
        title: 'Facebook social media marketing',
        description: 'Expert advice',
        icon: 'fab fa-fw fa-facebook text-facebook',
        parentKey: 'certificate',
      },
      {
        key: 'graphicDesign',
        title: 'Creative graphics design',
        description: 'No prerequisites',
        icon: 'fas fa-fw fa-basketball-ball text-dribbble',
        parentKey: 'certificate',
      },
    ],
  },
]

export const INSTRUCTOR_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: 'bi bi-ui-checks-grid',
    link: '/instructor/dashboard',
    role:'system',
  },
  {
    key: 'courses',
    title: 'My Courses',
    icon: 'bi bi-basket',
    link: '/instructor/manage-course',
  },
  {
    key: 'quiz',
    title: 'Quiz',
    icon: 'bi bi-question-diamond',
    link: '/instructor/quiz',
  },
  {
    key: 'earnings',
    title: 'Earnings',
    icon: 'bi bi-graph-up',
    link: '/instructor/earning',
  },
  {
    key: 'students',
    title: 'Students',
    icon: 'bi bi-people',
    link: '/instructor/studentlist',
  },
  {
    key: 'orders',
    title: 'Orders',
    icon: 'bi bi-folder-check',
    link: '/instructor/order',
  },
  {
    key: 'reviews',
    title: 'Reviews',
    icon: 'bi bi-star',
    link: '/instructor/review',
  },
  {
    key: 'editProfile',
    title: 'Edit Profile',
    icon: 'bi bi-pencil-square',
    link: '/instructor/edit-profile',
  },
  {
    key: 'payouts',
    title: 'Payouts',
    icon: 'bi bi-wallet2',
    link: '/instructor/payout',
  },
  {
    key: 'settings',
    title: 'Settings',
    icon: 'bi bi-gear',
    link: '/instructor/setting',
  },
  {
    key: 'deleteprofile',
    title: 'Delete Profile',
    icon: 'bi bi-trash',
    link: '/instructor/delete-account',
  },
  {
    key: 'signout',
    title: 'Sign Out',
    icon: 'fas fa-sign-out-alt',
    link: '/sign-in',
  },
]

export const STUDENT_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: 'bi bi-ui-checks-grid',
    link: '/student/dashboard',
    role:'system',
  },
  {
    key: 'subscriptions',
    title: 'My Subscriptions',
    icon: 'bi bi-card-checklist',
    link: '/student/subscription',
  },
  {
    key: 'courses',
    title: 'My Courses',
    icon: 'bi bi-basket',
    link: '/student/course-list',
  },
  {
    key: 'resume',
    title: 'Course Resume',
    icon: 'far fa-fw fa-file-alt',
    link: '/student/course-resume',
  },
  {
    key: 'quiz',
    title: 'Quiz',
    icon: 'bi bi-question-diamond',
    link: '/student/quiz',
  },
  {
    key: 'paymentInfo',
    title: 'Payment Info',
    icon: 'bi bi-credit-card-2-front',
    link: '/student/payment-info',
  },
  {
    key: 'wishlist',
    title: 'Wishlist',
    icon: 'fas bi-cart-check',
    link: '/student/bookmark',
  },
  {
    key: 'editProfile',
    title: 'Edit Profile',
    icon: 'bi bi-pencil-square',
    link: '/instructor/edit-profile',
  },
  {
    key: 'settings',
    title: 'Settings',
    icon: 'bi bi-gear',
    link: '/instructor/setting',
  },
  {
    key: 'deleteprofile',
    title: 'Delete Profile',
    icon: 'bi bi-trash',
    link: '/instructor/delete-account',
  },
  {
    key: 'signout',
    title: 'Sign Out',
    icon: 'fas fa-sign-out-alt',
    link: '/sign-in',
  },
  {
    key: 'dropdown',
    title: 'Dropdown levels',
    icon: 'bi bi-lock',
    subItems: [
      {
        key: 'item-1',
        title: 'Dropdown item',
        parentKey: 'dropdownEnd',
      },
      {
        key: 'item-2',
        title: 'Dropdown item',
        parentKey: 'dropdownEnd',
      },
    ],
  },
]

export const ADMIN_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    link: '/admin/dashboard',
    icon: 'bi bi-house',
    role:'system',
  },
  {
    key: 'pages',
    title: 'Pages',
    isTitle: true,
  },
  {
    key: 'adminCourses',
    title: 'Courses',
    icon: 'bi bi-basket',
    isCollapsed: true,
    subItems: [
      {
        key: 'courseList',
        title: 'All Courses',
        link: '/admin/course/list',
        parentKey: 'adminCourses',
      },
      {
        key: 'courseCategory',
        title: 'Course Category',
        link: '/admin/course/category',
        parentKey: 'adminCourses',
      },
      {
        key: 'courseDetail',
        title: 'Course Detail',
        link: '/admin/course/detail',
        parentKey: 'adminCourses',
      },
    ],
  },
  {
    key: 'students',
    title: 'Students',
    link: '/admin/student-list',
    icon: 'fas fa-user-graduate',
  },
  {
    key: 'instructors',
    title: 'Instructors',
    icon: 'fas fa-user-tie',
    isCollapsed: true,
    subItems: [
      {
        key: 'instructorsList',
        title: 'Instructors',
        link: '/admin/instructor/list',
        parentKey: 'instructors',
      },
      {
        key: 'instructorsDetail',
        title: 'Instructor Detail',
        link: '/admin/instructor/detail',
        parentKey: 'instructors',
      },
      {
        key: 'instructorsRequest',
        title: 'Instructor requests',
        link: '/admin/instructor/request',
        badge: '2',
        parentKey: 'instructors',
      },
    ],
  },
  {
    key: 'reviews',
    title: 'Reviews',
    link: '/admin/review',
    icon: 'far fa-comment-dots',
  },
  {
    key: 'earnings',
    title: 'Earnings',
    link: '/admin/earning',
    icon: 'far fa-chart-bar',
  },
  {
    key: 'settings',
    title: 'Admin Settings',
    link: '/admin/setting',
    icon: 'fas fa-user-cog',
  },
  {
    key: 'authentication',
    title: 'Authentication',
    icon: 'bi bi-lock',
    isCollapsed: true,
    subItems: [
      { key: 'signUp', title: 'Sign Up', link: '/sign-up' },
      { key: 'signIn', title: 'Sign In', link: '/sign-in' },
      {
        key: 'forgotPassword',
        title: 'Forgot Password',
        link: '/forgot-password',
      },
      { key: 'error404', title: 'Error 404', link: '/admin/error-404' },
    ],
  },
]

export const DEVELOPE_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'development',
    title: 'Development',
    role:'system',
    subItems: [
      {
        key: 'webDevelopment',
        title: 'Web Development',
        parentKey: 'development',
      },
      {
        key: 'dataScience',
        title: 'Data Science',
        parentKey: 'development',
      },
      {
        key: 'mobileDevelopment',
        title: 'Mobile Development',
        parentKey: 'development',
      },
      {
        key: 'programmingLanguage',
        title: 'Programming Language',
        parentKey: 'development',
      },
      {
        key: 'softwareTesting',
        title: 'Software Testing',
        parentKey: 'development',
      },
      {
        key: 'softwareEngineering',
        title: 'Software Engineering',
        parentKey: 'development',
      },
      {
        key: 'softwareTools',
        title: 'Software Development Tools',
        parentKey: 'development',
      },
    ],
  },
  {
    key: 'finance',
    title: 'Finance & Accounting',
  },
  {
    key: 'personalDevelopment',
    title: 'Personal Development',
  },
  {
    key: 'it',
    title: 'IT & Software',
  },
  {
    key: 'personal',
    title: 'Personal Development',
  },
]
