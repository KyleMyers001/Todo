import { Component, OnInit } from '@angular/core';
import TodoService from '../../services/todo.service';
import Item from '../../classes/Item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  hasMoreItems: boolean;
  loadingItems: boolean;
  list: Item[];
  showForm: boolean;
  constructor(private todoService: TodoService) {
    this.hasMoreItems = true;
    this.list = new Array();
    this.showForm = false;
    this.getItems();

    window.onscroll = () => {
      const loadingIcon = document.querySelector('.loading');
      if (this.isElementInViewport(loadingIcon)) {
        this.getItems();
      }
    }
  }

  getItems(): void {
    if (this.hasMoreItems) {
      this.loadingItems = true;
      this.hasMoreItems = false; // Prevent simulataneous calls
      this.todoService.getTodoList(this.list.length).subscribe((request) => {
        if (request.success) {
          request.data.items.forEach((item) => {
            this.list.push(item);
          })
          this.hasMoreItems = request.data.hasMoreItems;
          console.log(request.data);
        }
        this.loadingItems = false;
      });
    }
  }

  addItem(event, textbox): void {
    if (event.key.toLowerCase() === 'enter') {
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
      if (request.success) {
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
      this.todoService.updateTodoItem(item).subscribe((data) => { });
      textbox.blur();
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
}