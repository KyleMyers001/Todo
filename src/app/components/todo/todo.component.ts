import { Component, OnInit } from '@angular/core';
import TodoService from '../../services/todo.service';
import Item from '../../classes/Item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  list: Item[];
  showForm: boolean;
  constructor(private todoService: TodoService) {
    this.list = new Array();
    todoService.getTodoList().subscribe((request) => {
      if(request.success) {
        this.list = request.data;
      }
    });
    this.showForm = false;
  }

  addItem(event, textbox): void {
    if(event.key.toLowerCase() === 'enter') {
      const name = textbox.value;
      const item = new Item(null, name);
      this.todoService.addTodoItem(item).subscribe((request) => {
        if (request.success) {
          this.list.push(request.data);
          textbox.value = '';
        } else {
          // Show error in data.message
        }
      });
    }
  }

  deleteItem(item): void {
    this.todoService.deleteTodoItem(item).subscribe((request) => {
      if(request.success) {
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i] === item) {
            this.list.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  updateItem(e, item) {
    if (e.key.toLowerCase() === 'enter') {
      const textbox = e.target;
      item.name = textbox.value;
      this.todoService.updateTodoItem(item).subscribe((data) => {});
      textbox.blur();
    }
  }
}