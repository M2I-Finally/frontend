import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericButtonComponent } from './shared/components/generic-button/generic-button.component';
import { LoginComponent } from './features/user/login/login.component';
import { GenericHeaderComponent } from './shared/components/generic-header/generic-header.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
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
