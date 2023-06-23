import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericButtonComponent } from './shared/components/generic-button/generic-button.component';
import { GenericHeaderComponent } from './shared/components/generic-header/generic-header.component';

const routes: Routes = [
  {
    path: 'button',
    component: GenericButtonComponent,
  },
  {
    path: 'header',
    component: GenericHeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
