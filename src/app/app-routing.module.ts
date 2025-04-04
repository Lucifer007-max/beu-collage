// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from 'src/guard/authguard.guard';
import { StudentComponent } from './theme/layout/student/student.component';

const routes: Routes = [


  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'about/vision',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/mission',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/objective',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/university-act',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/regulations',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/noida-campus',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/university-logo',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/annual-report',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/history',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'about/data-privacy-policy',
        loadComponent: () => import('./pages/about/about.component'),
      },
      {
        path: 'organization/chancellor',
        // loadComponent: () => import('./pages/chancellor/chancellor.component'),
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),

      },
      {
        path: 'organization/pro-vice-chancellor',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/executive-council',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/academic-council',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/finance-committee',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/examination-committee',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/building-works-committee',
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),
      },
      {
        path: 'organization/vice-chancellor',
        // loadComponent: () => import('./pages/chancellor/chancellor.component'),
        loadComponent: () => import('./pages/chancellor/chancellor.component').then(m => m.ChancellorComponent),

      },
      {
        path: 'acts',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'circular',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'notification',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'downloads',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'minutes',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'letter',
        loadComponent: () => import('./pages/documents/documents.component')
      },
      {
        path: 'curriculum',
        loadComponent: () => import('./pages/documents/documents.component')
      },



      {
        path: 'Affiliation',
        loadComponent: () => import('./pages/affiliation/affiliation.component').then(c => c.AffiliationComponent)
      },

      {
        path: 'Act',
        loadComponent: () => import('./pages/act/act.component').then(m => m.ActComponent)
      },
      {
        path: 'Circular',
        loadComponent: () => import('./pages/circular/circular.component').then(m => m.CircularComponent)
      },
      {
        path: 'Notification',
        loadComponent: () => import('./pages/notification/notification.component').then(m => m.NotificationComponent)
      },
      {
        path: 'Letter',
        loadComponent: () => import('./pages/letter/letter.component').then(m => m.LetterComponent)
      },
      {
        path: 'maincourse/:id',
        loadComponent: () => import('./pages/course/course.component'),
      },
      {
        path: 'course/:id',
        loadComponent: () => import('./pages/course-details/course-details.component'),
      },
      {
        path: 'admin',
        loadComponent: () => import('./admin/authentication/sign-in/sign-in.component')
      },

    ]
  },


  {
    path: '',
    component: AdminComponent,
    children: [

      {
        path: 'admin/dashboard',
        loadComponent: () => import('./admin/dashboard/dash-analytics/dash-analytics.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-notice',
        loadComponent: () => import('./admin/notice/notice.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-banner',
        loadComponent: () => import('./admin/banner/banner.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-notice-board',
        loadComponent: () => import('./admin/notice-board/notice-board.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-events',
        loadComponent: () => import('./admin/events/events.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-mentor',
        loadComponent: () => import('./admin/mentor/mentor.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-acts',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-circular',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-notification',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-downloads',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-minutes',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-letter',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-curriculum',
        loadComponent: () => import('./admin/fileupload/fileupload.component'),
        // canActivate: [AuthGuard]
      },
      {
        path: 'admin/add-affiliation',
        loadComponent: () => import('./admin/affilation/affilation.component'),
        // canActivate: [AuthGuard]
      },
    ]
  },

  {
    path: 'student',
    component: StudentComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./admin/authentication/sign-up/sign-up.component'),

      },
      {
        path: 'student',
        loadComponent: () => import('./admin/authentication/sign-in/sign-in.component')
      }
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
