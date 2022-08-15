import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/model/to-do';
import { ToDoAPIService } from 'src/app/Services/to-do-api.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export class ListTaskComponent implements OnInit {
  tasks: any;

  constructor(
    private modalService: NgbModal,
    private todoService: ToDoAPIService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoService.getTasks().subscribe((data) => {
      console.log(data);
      this.tasks = data;
    });
  }

  IsCompleted = true;

  addTask() {
    this.router.navigate(['create']);
  }

  closeResult = '';

  openAdd() {
    this.modalService.open(CreateTaskComponent);
  }

  openEdit(id: number) {
    this.router.navigate(['edit', id]);
    console.log(id);
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
      },
      (error) => console.log(error)
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
}
