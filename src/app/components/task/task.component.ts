import { Component, Input } from '@angular/core';
import TaskService from '../../services/task.service';
import AutoSave from '../../classes/AutoSave';
import Task from '../../classes/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  autoSave: AutoSave;
  hasMoreTasks: boolean;
  listId: string;
  loadingTasks: boolean;
  tasks: Task[];
  constructor(private taskService: TaskService) { 
    this.autoSave = new AutoSave(2000);
    this.hasMoreTasks = true;
    this.loadingTasks = false;
  }

  addTask(): void {
    const task = new Task(null, this.listId, '');
    this.taskService.addTask(task).subscribe((request) => {
      if (request.success) {
        this.tasks.push(request.data);
      } else {
        // Show error in data.message
      }
    });
  }

  deleteTask(task): void {
    this.taskService.deleteTask(task).subscribe((request) => {
      if (request.success) {
        for (let i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i] === task) {
            this.tasks.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  handleNameInputKeypress(e, task) {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      task.name = textbox.value;
      this.updateTask(task);
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  handleDateInputKeypress(e, task) {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      task.dueDate = textbox.value;
      this.updateTask(task);
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  getTasks(listId: string): void {
    this.tasks = new Array();
    this.listId = listId;
    this.taskService.getTasks(this.listId, this.tasks.length).subscribe((request) => {
      if (request.success) {
        request.data.tasks.forEach((task) => {
          task.name =  this.htmlDecode(task.name);
          this.tasks.push(task);
        })
        this.hasMoreTasks = request.data.hasMoreTasks;
      }
      this.loadingTasks = false;
    });
  }

  htmlDecode(input): string {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe((data) => { });
  }
}
