import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImhComponent } from './imh/imh.component';
import { WtdComponent } from './wtd/wtd.component';

const routes: Routes = [
  {
    path: 'imh',
    component: ImhComponent
  },
  {
    path: 'wtd',
    component: WtdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
