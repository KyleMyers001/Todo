import { Component, Input } from '@angular/core';
import ListService from 'src/app/services/list.service';
import AutoSave from '../../classes/AutoSave';
import List from '../../classes/List';
import User from 'src/app/classes/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  autoSave: AutoSave;
  currentListId: number;
  lists: List[];
  user: User;
  // @Input() user: User;
  @Input() taskComponent;
  constructor(private listService: ListService) { 
    this.autoSave = new AutoSave(2000);
    this.currentListId = 1;
    this.lists = new Array();
  }

  initializeLists(user: User):void {
    this.user = user;
    this.listService.getLists(this.user._id).subscribe((request) => {
      console.log(request);
     // if(request.data.lists.length > 0) {
        this.taskComponent.activeList = request.data.lists[0];
      // } else {
      //   this.activeList = new List('Your list', this.user._id, new Array());
      // }
      this.taskComponent.activeList.tasks = new Array();
      this.lists = request.data.lists;
      this.taskComponent.getTasks();
    });
  }

  deleteList(list: List): void {
    this.listService.deleteList(list).subscribe((request) => {
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
    this.taskComponent.activeList = list;
    this.taskComponent.activeList.tasks = new Array();
    this.taskComponent.getTasks();
  }

  addList(): void {
    const list = new List('New List', this.user._id, new Array());
    this.listService.addList(list).subscribe((request) => {
      if (request.success) {
        this.taskComponent.activeList = request.data;
        this.taskComponent.activeList.tasks = new Array();
        this.lists.push(this.taskComponent.activeList);
      } else {
        // Show error in data.message
      }
    });
  }

  handleListKeypress(e) {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      this.updateList(textbox.innerText);
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  handleListFocusOut(e) {
    const textbox = e.target;
    this.updateList(textbox.innerText);
  }

  updateList(name: string) {
    if(this.taskComponent.activeList.name !== name) {
      this.taskComponent.activeList.name = name;
      this.listService.updateList(this.taskComponent.activeList).subscribe((data) => { });
    }
  }
}
