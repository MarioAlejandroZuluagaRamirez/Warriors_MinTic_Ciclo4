import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './template/content/content.component';
import { ErrorComponent } from './template/error/error.component';

const routes: Routes = [
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "/content"
  },
  {
    path: 'security',
    loadChildren: () => import("./modules/security/security.module").then(x => x.SecurityModule)
  },
  {
    path: 'management',
    loadChildren: () => import("./modules/management/management.module").then(x => x.ManagementModule)
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
