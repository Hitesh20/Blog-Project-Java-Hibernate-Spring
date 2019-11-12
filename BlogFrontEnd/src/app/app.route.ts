import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HomeComponent} from './home/home.component';
import {FeedComponent} from './feed/feed.component';
import {AddPostComponent} from './add-post/add-post.component';
import {LogoutComponent} from './logout/logout.component';
import {MyAccountComponent} from './my-account/my-account.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AuthGuardService} from './auth-guard.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {EditPostComponent} from './edit-post/edit-post.component';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {ConnectionsComponent} from './connections/connections.component';
import {FollowersComponent} from './followers/followers.component';
import {FollowingComponent} from './following/following.component';
import {BlogComponent} from './blog/blog.component';

export const MAIN_ROUTES: Routes = [
  { path : '', redirectTo: '/home/login', pathMatch: 'full'},
  {
    path : 'home',
    component: HomeComponent,
    children: [
      { path : 'login', component: LoginComponent },
      { path : 'register', component: RegistrationComponent},
    ]
  },
  { path : 'feed', component: FeedComponent, canActivate: [AuthGuardService] },
  { path : 'addPost', component: AddPostComponent, canActivate: [AuthGuardService] },
  { path : 'viewPost/:id', component: BlogComponent, canActivate: [AuthGuardService] },
  { path : 'editPost/:id', component: EditPostComponent, canActivate: [AuthGuardService] },
  { path : 'myAccount', component: MyAccountComponent, canActivate: [AuthGuardService] },
  { path : 'editProfile', component: EditProfileComponent, canActivate: [AuthGuardService] },
  { path : 'viewProfile/:userId', component: ViewProfileComponent, canActivate: [AuthGuardService] },
  { path : 'connections',
    component: ConnectionsComponent,
    children: [
      { path: 'followers', component: FollowersComponent, canActivate: [AuthGuardService] },
      { path: 'following', component: FollowingComponent, canActivate: [AuthGuardService] }
    ],
    canActivate: [AuthGuardService]},
  { path : 'logout', component: LogoutComponent},
  { path : '**', component: PageNotFoundComponent}
];
