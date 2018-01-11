import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectsComponent } from './subjects/subjects.component';
import { PapersComponent } from './papers/papers.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';

const appRoutes: Routes = [
  { path: 'subjects', component: SubjectsComponent },
  { path: 'subjects/:level/:subject/analysis',  component: AnalysisComponent },
  { path: 'subjects/:level/:subject/papers',  component: PapersComponent },
  { path: 'subjects/:level/:subject',  component: PapersComponent },
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'notFound',   component: NotFoundComponent },
  { path: 'about', component: AboutComponent},
  { path: '',   redirectTo: '/subjects', pathMatch: 'full' },
  { path: '**', redirectTo: '/notFound', pathMatch: 'full' }
  
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}