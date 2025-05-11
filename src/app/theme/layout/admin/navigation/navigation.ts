export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/admin/dashboard',
        icon: 'feather icon-home'
      },
      {
        id: 'affiliation',
        title: 'Affiliation',
        type: 'item',
        url: '/admin/add-affiliation',
        icon: 'feather icon-home'
      },
      // // {
      // //   id: 'student',
      // //   title: 'Add Student',
      // //   type: 'item',
      // //   url: '/admin/add-student',
      // //   icon: 'feather icon-user-plus'
      // // },
      // {
      //   id: 'course',
      //   title: 'Add Course',
      //   type: 'item',
      //   url: '/admin/add-course',
      //   icon: 'feather icon-book'
      // },

    ]
  },
  {
    id: 'banner',
    title: 'Master Mangement',
    type: 'collapse',
    icon: 'feather icon-menu',
    children: [
      {
        id: 'menu-level-2.1',
        title: 'Banner Mangement',
        type: 'item',
        url: '/admin/add-banner',
        external: false
      },
      {
        id: 'menu-level-2.2',
        title: 'Notice Management',
        type: 'item',
        url: '/admin/add-notice',
        external: false
      },
      {
        id: 'notice-borad',
        title: 'Notice Board Management',
        type: 'item',
        url: '/admin/add-notice-board',
        // icon: 'feather icon-cloth'
      },
      {
        id: 'event-data',
        title: 'Event Management',
        type: 'item',
        url: '/admin/add-events',
        // icon: 'feather icon-cloth'
      },
      {
        id: 'Mentor-data',
        title: 'Mentor Management',
        type: 'item',
        url: '/admin/add-mentor',
        // icon: 'feather icon-cloth'
      },
    ]
  },
  {
    id: 'banner',
    title: 'File Mangement',
    type: 'collapse',
    icon: 'feather icon-file',
    children: [
      {
        id: 'menu-level-2.1',
        title: 'Acts Mangement',
        type: 'item',
        url: '/admin/add-acts',
        external: false
      },
      {
        id: 'menu-level-2.2',
        title: 'Circular Mangement',
        type: 'item',
        url: '/admin/add-circular',
        external: false
      },
      {
        id: 'menu-level-2.3',
        title: 'Notification Mangement',
        type: 'item',
        url: '/admin/add-notification',
        external: false
      },
      {
        id: 'menu-level-2.4',
        title: 'Downloads Mangement',
        type: 'item',
        url: '/admin/add-downloads',
        external: false
      },
      {
        id: 'menu-level-2.5',
        title: 'Minutes Mangement',
        type: 'item',
        url: '/admin/add-minutes',
        external: false
      },
      {
        id: 'menu-level-2.6',
        title: 'Letter Mangement',
        type: 'item',
        url: '/admin/add-letter',
        external: false
      },
      {
        id: 'menu-level-2.7',
        title: 'Curriculum Mangement',
        type: 'item',
        url: '/admin/add-curriculum',
        external: false
      },
    ]
  },

  // {
  //   id: 'banner',
  //   title: 'Course Mangement',
  //   type: 'collapse',
  //   icon: 'feather icon-file',
  //   children: [
  //     {
  //       id: 'menu-level-2.1',
  //       title: 'Session Mangement',
  //       type: 'item',
  //       url: '/admin/add-session',
  //       external: false
  //     },
  //     {
  //       id: 'menu-level-2.1',
  //       title: 'Syllabus Mangement',
  //       type: 'item',
  //       url: '/admin/add-syllabus',
  //       external: false
  //     },
  //     {
  //       id: 'menu-level-2.1',
  //       title: 'Upload Course',
  //       type: 'item',
  //       url: '/admin/upload-course',
  //       external: false
  //     },
  //   ]
  // },

  {
    id: 'banner',
    title: 'Media Mangement',
    type: 'collapse',
    icon: 'feather icon-image',
    children: [
      {
        id: 'menu-level-2.1',
        title: 'Video Mangement',
        type: 'item',
        url: '/admin/add-videos',
        external: false
      },
      {
        id: 'menu-level-2.1',
        title: 'Publication Mangement',
        type: 'item',
        url: '/admin/add-publication',
        external: false
      },
      {
        id: 'menu-level-2.1',
        title: 'Media Mangement',
        type: 'item',
        url: '/admin/add-media',
        external: false
      },
      {
        id: 'menu-level-2.1',
        title: 'Photo Mangement',
        type: 'item',
        url: '/admin/add-photo',
        external: false
      },

    ]
  },
  {
    id: 'report',
    title: 'Report Mangement',
    type: 'collapse',
    icon: 'feather icon-file',
    children: [
      {
        id: 'report-2.1',
        title: 'Annual Report',
        type: 'item',
        url: '/admin/add-annual-report',
      },
      {
        id: 'report-2.2',
        title: 'Magazine Mangement',
        type: 'item',
        url: '/admin/add-magazine',
      },
      {
        id: 'report-2.3',
        title: 'Financial Mangement',
        type: 'item',
        url: '/admin/add-financial',
      }
    ]
  },
  {
    id: 'profile',
    title: 'Profile',
    type: 'item',
    url: '/admin/profile-update',
    icon: 'feather icon-user'
  },

  // {
  //   id: 'ui-component',
  //   title: 'Ui Component',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'basic',
  //       title: 'Component',
  //       type: 'collapse',
  //       icon: 'feather icon-box',
  //       children: [
  //         {
  //           id: 'button',
  //           title: 'Button',
  //           type: 'item',
  //           url: '/component/button'
  //         },
  //         {
  //           id: 'badges',
  //           title: 'Badges',
  //           type: 'item',
  //           url: '/component/badges'
  //         },
  //         {
  //           id: 'breadcrumb-pagination',
  //           title: 'Breadcrumb & Pagination',
  //           type: 'item',
  //           url: '/component/breadcrumb-paging'
  //         },
  //         {
  //           id: 'collapse',
  //           title: 'Collapse',
  //           type: 'item',
  //           url: '/component/collapse'
  //         },
  //         {
  //           id: 'tabs-pills',
  //           title: 'Tabs & Pills',
  //           type: 'item',
  //           url: '/component/tabs-pills'
  //         },
  //         {
  //           id: 'typography',
  //           title: 'Typography',
  //           type: 'item',
  //           url: '/component/typography'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: 'Authentication',
  //   title: 'Authentication',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'signup',
  //       title: 'Sign up',
  //       type: 'item',
  //       url: '/auth/signup',
  //       icon: 'feather icon-at-sign',
  //       target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'signin',
  //       title: 'Sign in',
  //       type: 'item',
  //       url: '/auth/signin',
  //       icon: 'feather icon-log-in',
  //       target: true,
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  // {
  //   id: 'chart',
  //   title: 'Chart',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'apexchart',
  //       title: 'ApexChart',
  //       type: 'item',
  //       url: '/chart',
  //       classes: 'nav-item',
  //       icon: 'feather icon-pie-chart'
  //     }
  //   ]
  // },
  // {
  //   id: 'forms & tables',
  //   title: 'Forms & Tables',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'forms',
  //       title: 'Basic Elements',
  //       type: 'item',
  //       url: '/forms',
  //       classes: 'nav-item',
  //       icon: 'feather icon-file-text'
  //     },
  //     {
  //       id: 'tables',
  //       title: 'tables',
  //       type: 'item',
  //       url: '/tables',
  //       classes: 'nav-item',
  //       icon: 'feather icon-server'
  //     }
  //   ]
  // },
  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-group',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'feather icon-sidebar'
  //     },
  //     {
  //       id: 'menu-level',
  //       title: 'Menu Levels',
  //       type: 'collapse',
  //       icon: 'feather icon-menu',
  //       children: [
  //         {
  //           id: 'menu-level-2.1',
  //           title: 'Menu Level 2.1',
  //           type: 'item',
  //           url: 'javascript:',
  //           external: true
  //         },
  //         {
  //           id: 'menu-level-2.2',
  //           title: 'Menu Level 2.2',
  //           type: 'collapse',
  //           children: [
  //             {
  //               id: 'menu-level-2.2.1',
  //               title: 'Menu Level 2.2.1',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             },
  //             {
  //               id: 'menu-level-2.2.2',
  //               title: 'Menu Level 2.2.2',
  //               type: 'item',
  //               url: 'javascript:',
  //               external: true
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
];
