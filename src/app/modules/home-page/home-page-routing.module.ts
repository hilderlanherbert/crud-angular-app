import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "novo", component: UserFormComponent},
  {path: "editar/:id", component: UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
