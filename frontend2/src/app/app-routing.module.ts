import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
    path: 'upload',
    loadChildren: () =>
      import('./project/upload-file/upload.module').then(
        (m) => m.UploadModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'upload'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
