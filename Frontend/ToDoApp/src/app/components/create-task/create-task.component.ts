import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ToDo } from 'src/app/model/to-do';
import { ToDoAPIService } from 'src/app/Services/to-do-api.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    public todoService: ToDoAPIService,
    private router: Router,
    private http: HttpClient,
    private activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {}

  tasks: ToDo = new ToDo();
  submitted = false;
  closeResult = '';

  createTask() {
    this.todoService.addTask(this.tasks).subscribe((data) => {
      console.log(data), (error: any) => console.log(error);
    });
    this.tasks = new ToDo();
  }

  onSubmit() {
    this.submitted = true;
    this.createTask();
  }

  closeModal() {
    this.activeModal.close('Modal closed');
  }
}
