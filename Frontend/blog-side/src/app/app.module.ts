import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContentComponent } from './components/content/content.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NewPostComponent } from './components/new-post/new-post.component'
import { CKEditorModule } from 'ckeditor4-angular';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user-service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomePageComponent,
    ContentComponent,
    LoginRegisterComponent,
    NewPostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
