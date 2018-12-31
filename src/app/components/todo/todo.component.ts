import { Component, OnInit } from '@angular/core';
import TodoService from '../../services/todo.service';
import UserService from '../../services/user.service';
import Item from '../../classes/Item';
import List from '../../classes/List';
import User from 'src/app/classes/User';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  activeList: List;
  currentListId: number;
  hasMoreItems: boolean;
  loadingItems: boolean;
  lists: List[];
  showForm: boolean;
  user: User;
  constructor(private todoService: TodoService, private userService: UserService) {
    this.currentListId = 1;
    this.hasMoreItems = true;
    this.lists = new Array();
    this.activeList = new List('', '', new Array());
    this.showForm = false;
    this.user = this.userService.getUserFromCookie();
    // if(this.user === null) {
    //   // route to login
    // }

    window.onscroll = () => {
      const loadingIcon = document.querySelector('.loading');
      if (this.isElementInViewport(loadingIcon)) {
        this.getItems();
      }
    }


    this.todoService.getLists(this.user._id).subscribe((request) => {
      console.log(request);
     // if(request.data.lists.length > 0) {
        this.activeList = request.data.lists[0];
      // } else {
      //   this.activeList = new List('Your list', this.user._id, new Array());
      // }
      this.activeList.items = new Array();
      this.lists = request.data.lists;
      this.getItems();
    });

  }

  deleteList(list: List): void {
    this.todoService.deleteList(list).subscribe((request) => {
      if (request.success) {
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i] === list) {
            this.lists.splice(i, 1);
            return;
          }
        }
      }
    });
  }

  changeList(list: List): void {
    this.activeList = list;
    this.activeList.items = new Array();
    this.getItems();
  }

  getItems(): void {
    if (this.hasMoreItems) {
      this.loadingItems = true;
      this.hasMoreItems = false; // Prevent simulataneous calls
      this.todoService.getItems(this.activeList._id, this.activeList.items.length).subscribe((request) => {
        if (request.success) {
          request.data.items.forEach((item) => {
            this.activeList.items.push(item);
          })
          this.hasMoreItems = request.data.hasMoreItems;
          console.log(request.data);
        }
        this.loadingItems = false;
      });
    }
  }

  addList(event, textbox): void {
    if (event.key.toLowerCase() === 'enter') {
      const name = textbox.value;
      console.log(name);
      const list = new List(name, this.user._id, new Array());
      this.todoService.addList(list).subscribe((request) => {
        if (request.success) {
          this.activeList = request.data;
          this.activeList.items = new Array();
          this.lists.push(this.activeList);
          textbox.value = '';
        } else {
          // Show error in data.message
        }
      });
    }
  }

  addItem(event, textbox): void {
    if (event.key.toLowerCase() === 'enter') {
      const name = textbox.value;
      const item = new Item(null, this.activeList._id, name);
      this.todoService.addItem(item).subscribe((request) => {
        if (request.success) {
          this.activeList.items.push(request.data);
          textbox.value = '';
        } else {
          // Show error in data.message
        }
      });
    }
  }

  deleteItem(item): void {
    this.todoService.deleteItem(item).subscribe((request) => {
      if (request.success) {
        for (let i = 0; i < this.activeList.items.length; i++) {
          if (this.activeList.items[i] === item) {
            this.activeList.items.splice(i, 1);
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
      this.todoService.updateItem(item).subscribe((data) => { });
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