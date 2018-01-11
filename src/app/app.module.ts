import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PapersService } from './papers.service';
import { SubjectService } from './subject.service';
import { AnalysisService } from './analysis.service';
import { FormComponent } from './form/form.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { PapersComponent } from './papers/papers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ExceptPipe } from './except.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CurrentUserService } from './current-user.service';
import { FlashService } from './flash.service';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SubjectsComponent,
    PapersComponent,
    NavbarComponent,
    ClickOutsideDirective,
    ExceptPipe,
    NotFoundComponent,
    AnalysisComponent,
    RegistrationComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
  	PapersService,
    SubjectService,
    AnalysisService,
    CurrentUserService,
    FlashService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
