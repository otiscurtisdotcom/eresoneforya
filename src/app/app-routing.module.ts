import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImhComponent } from './imh/imh.component';

const routes: Routes = [
  {
    path: '',
    component: ImhComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
