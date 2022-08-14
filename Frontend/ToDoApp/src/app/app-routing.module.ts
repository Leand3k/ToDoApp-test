import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';

const routes: Routes = [
  { path: 'create', component: CreateTaskComponent },
  {
    path: '',
    component: ListTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
