import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/model/to-do';
import { ToDoAPIService } from 'src/app/Services/to-do-api.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  id!: number;
  task!: ToDo;
  submitted = false;

  constructor(
    private todoService: ToDoAPIService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.task = new ToDo();
    this.id = this.route.snapshot.params['id'];
    this.todoService.getTask(this.id).subscribe(
      (data) => {
        this.task = data;
        console.log(data);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.submitted = true;
    this.editTask();
  }

  checkCheckBoxvalue(event: { checked: any; }){
    console.log(event.checked)
  }


  editTask() {
    this.todoService.updateTask(this.id, this.task).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.task = new ToDo();
    this.taskList();
  }

  taskList() {
    this.router.navigate(['']);
  }
}
