import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubjectsComponent } from './subjects/subjects.component';
import { PapersComponent } from './papers/papers.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'subjects', component: SubjectsComponent },
  { path: 'subjects/:level/:subject',  component: PapersComponent },
  { path: 'notFound',   component: NotFoundComponent },
  { path: '',   redirectTo: '/subjects', pathMatch: 'full' },
  { path: '**',   redirectTo: '/notFound' }
  
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}