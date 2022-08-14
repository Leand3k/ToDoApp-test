import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
    private http: HttpClient
  ) {}
  ngOnInit(): void {}

  tasks: ToDo = new ToDo();
  submitted = false;

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

  //#region Modal code

  closeResult = '';

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  //#endregion
}
