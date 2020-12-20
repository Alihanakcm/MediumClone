import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { NewPostComponent } from './components/new-post/new-post.component'
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './components/login-register/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'post/:postId', component: ContentComponent, canActivate: [LoginGuard] },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'new-post', component: NewPostComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
