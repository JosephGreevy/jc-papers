import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PapersService } from './papers.service';
import { SubjectService } from './subject.service';
import { FormComponent } from './form/form.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { PapersComponent } from './papers/papers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ExceptPipe } from './except.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnalysisComponent } from './analysis/analysis.component';

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
    AnalysisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
  	PapersService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
