// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

// Routing Module
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'src/interceptors/admin/interceptors.service';
import { ApiService, AuthInterceptorProvider } from 'src/service/api.service';
import { AuthGuard } from 'src/guard/authguard.guard';
import { StudentComponent } from './theme/layout/student/student.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { AcademicSessionComponent } from './pages/academic-session/academic-session.component';
// import { AcademicsComponent } from './pages/academics/academics.component';
// import { CourseUploadComponent } from './admin/course/course-upload/course-upload.component';
// import { AddSyllabusComponent } from './admin/course/add-syllabus/add-syllabus.component';
// import { PicturesComponent } from './pages/media/pictures/pictures.component';
// import { AdminPhotoComponent } from './admin/media/admin-photo/admin-photo.component';
// import { MediaComponent } from './pages/media/media/media.component';
// import { AdminMediaComponent } from './admin/media/admin-media/admin-media.component';
// import { VideosComponent } from './pages/media/videos/videos.component';
// import { PublicationComponent } from './pages/media/publication/publication.component';
// import { AdminVideosComponent } from './admin/media/admin-videos/admin-videos.component';
// import { AdminPublicationComponent } from './admin/media/admin-publication/admin-publication.component';
// import { AffiliationComponent } from './pages/affiliation/affiliation.component';
// import { AffilationComponent } from './admin/affilation/affilation.component';
// import { FileuploadComponent } from './admin/fileupload/fileupload.component';
// import { DocumentsComponent } from './pages/documents/documents.component';
// import { MetorComponent } from './admin/metor/metor.component';
// import { EventsComponent } from './admin/events/events.component';
// import { NoticeBoardComponent } from './admin/notice-board/notice-board.component';
// import { NoticeComponent } from './admin/notice/notice.component';

// import { AboutComponent } from './admin/about/about.component';
// import { ActComponent } from './pages/act/act.component';
// import { CircularComponent } from './pages/circular/circular.component';
// import { NotificationComponent } from './pages/notification/notification.component';
// import { LetterComponent } from './pages/letter/letter.component';
// import { ChancellorComponent } from './pages/organization/chancellor/chancellor.component';
// import { LoginComponent } from './admin/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    FriendComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    NotFoundComponent,
    // AcademicSessionComponent,
    // StudentComponent,
    // AcademicsComponent,
    // CourseUploadComponent,
    // AddSyllabusComponent,
    // PicturesComponent,
    // AdminPhotoComponent,
    // MediaComponent,
    // AdminMediaComponent,
    // VideosComponent,
    // PublicationComponent,
    // AdminVideosComponent,
    // AdminPublicationComponent,
    // AffiliationComponent,
    // AffilationComponent,
    // FileuploadComponent,
    // DocumentsComponent,
    // MetorComponent,
    // EventsComponent,
    // NoticeBoardComponent,
    // NoticeComponent,
    // AboutComponent,
    // ActComponent,
    // CircularComponent,
    // NotificationComponent,
    // LetterComponent,
    // ChancellorComponent,
    // LoginComponent,


  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, HttpClientModule,AngularEditorModule, NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthInterceptorProvider,
    AuthGuard,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
