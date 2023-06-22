import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericButtonComponent } from './shared/components/generic-button/generic-button.component';

const routes: Routes = [
  {
    path: 'button',
    component: GenericButtonComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
