import { Component, Input } from '@angular/core';
import TaskService from '../../services/task.service';
import AutoSave from '../../classes/AutoSave';
import Task from '../../classes/Task';
import List from 'src/app/classes/List';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() activeList: List;
  autoSave: AutoSave;
  hasMoreTasks: boolean;
  loadingTasks: boolean;
  constructor(private taskService: TaskService) { 
    this.activeList = new List('', '', new Array());
    this.autoSave = new AutoSave(2000);
    this.hasMoreTasks = true;
    this.loadingTasks = false;
    window.onscroll = () => {
      const loadingIcon = document.querySelector('.loading');
      if (this.isElementInViewport(loadingIcon)) {
        this.getTasks();
      }
    }
  }

  isElementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  }

  addTask(): void {
    // if (event.key.toLowerCase() === 'enter') {
    //   const name = textbox.value;
    const task = new Task(null, this.activeList._id, '');
    this.taskService.addTask(task).subscribe((request) => {
      if (request.success) {
        this.activeList.tasks.push(request.data);
        // textbox.value = '';
      } else {
        // Show error in data.message
      }
    });
    // }
  }

  deleteTask(task): void {
    this.taskService.deleteTask(task).subscribe((request) => {
      if (request.success) {
        for (let i = 0; i < this.activeList.tasks.length; i++) {
          if (this.activeList.tasks[i] === task) {
            this.activeList.tasks.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  handleTaskKeypress(e, task) {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      this.updateTask(task, textbox.value);
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  getTasks(): void {
    // if (this.hasMoreItems) {
    //   this.loadingItems = true;
    //   this.hasMoreItems = false; // Prevent simulataneous calls
    this.taskService.getTasks(this.activeList._id, this.activeList.tasks.length).subscribe((request) => {
      if (request.success) {
        request.data.tasks.forEach((task) => {
          this.activeList.tasks.push(task);
        })
        this.hasMoreTasks = request.data.hasMoreTasks;
      }
      this.loadingTasks = false;
    });
    // }
  }

  updateTask(task: Task, name: string) {
    if(task.name !== name) {
      task.name = name;
      this.taskService.updateTask(task).subscribe((data) => { });
    }
  }
}
