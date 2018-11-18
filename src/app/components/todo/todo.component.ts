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
    todoService.getTodoList().subscribe((data) => {
      this.list = data;
    });
    this.showForm = false;
  }

  updateTodoItem(e, item) {
    if (e.key.toLowerCase() === 'enter') {
      const textbox = e.target;
      textbox.toggleAttribute('disabled');
      item.name = textbox.value;
      this.todoService.updateTodoItem(item).subscribe((data) => {});
    }
  }

  deleteItem(item): void {
    this.todoService.deleteTodoItem(item).subscribe((data) => {
      console.log('subcribed');
    });
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] === item) {
        this.list.splice(i, 1);
        return;
      }
    }
  }

  addTodoItem(input): boolean {
    const name = input.value;
    const item = new Item(null, name);
    this.todoService.addTodoItem(item).subscribe((data) => {
      this.list.push(data);
    });
    input.value = '';
    return false;
  }

  toggleTextBox(textbox): void {
    textbox.toggleAttribute('disabled');
  }

  toggleAddForm(): void {
    this.showForm = !this.showForm;
  }
}