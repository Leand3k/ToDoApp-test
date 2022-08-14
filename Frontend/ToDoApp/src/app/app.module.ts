import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToDoAPIService } from './Services/to-do-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    EditTaskComponent,
    ListTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ToDoAPIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
