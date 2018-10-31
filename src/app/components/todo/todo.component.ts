import { Component, OnInit } from '@angular/core';
import TodoService from '../../services/todo.service';
import Item from '../../classes/Item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  title = 'todo';
  list: Item[];
  showForm: boolean;
  constructor(private todoService: TodoService) {
    this.list = new Array();
    todoService.getTodoList().subscribe((data) => {
      data.forEach((item) => {
        this.list.push(item);
      });
    });
    window.onload = this.assignInputBehavior.bind(this, this);
    this.showForm = false;
  }

  assignInputBehavior(instance): void {
    const inputs = document.querySelectorAll('.list-group input[type="text"]');
  }

  updateTodoItem(e, item) {
    if (e.key.toLowerCase() === 'enter') {
      const textbox = e.target;
      textbox.toggleAttribute('disabled');
      item.name = textbox.value;
      this.todoService.updateTodoItem(item);
    }
  }

  deleteItem(item): void {
    this.todoService.deleteTodoItem(item);
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] === item) {
        this.list.splice(i, 1);
        return;
      }
    }
  }

  addTodoItem(name): boolean {
    const item = new Item(null, name);
    this.todoService.addTodoItem(item);
    this.list.push(item);

    var input = <HTMLInputElement>document.querySelector('#addItemInput');
    input.value = '';
    return false;
  }

  toggleTextBox(selector): void {
    document.querySelector(selector).toggleAttribute('disabled');
  }

  showAddForm(): void {
    this.showForm = !this.showForm;
  }
}