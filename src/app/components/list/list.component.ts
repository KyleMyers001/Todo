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
  deletedList: List;
  lists: List[];
  showTasksMobile: boolean;
  showUndo: boolean;
  user: User;
  // @Input() user: User;
  @Input() taskComponent;
  constructor(private listService: ListService) { 
    this.autoSave = new AutoSave(2000);
    this.lists = new Array();
    this.showTasksMobile = false;
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
        this.deletedList = list;
        this.showUndo = true;
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i] === list) {
            this.lists.splice(i, 1);
          }
        }

        if(this.taskComponent.activeList === list) {
          this.changeList(this.lists[0]);
        }
      }
    });
  }

  undoDeleteList(): void {
    this.addList(this.deletedList);
    this.showUndo = false;
  }

  changeList(list: List): void {
    this.taskComponent.activeList = list;
    this.taskComponent.activeList.tasks = new Array();
    this.taskComponent.getTasks();
    this.showTasksMobile = true;
  }

  createEmptyList(): void {
    const list = new List('Your List', this.user._id, new Array());
    this.addList(list);
  }

  addList(list: List): void {
    this.listService.addList(list).subscribe((request) => {
      if (request.success) {
        // this.taskComponent.activeList = request.data;
        list = request.data;
        this.lists.push(list);
        this.changeList(list);
        // this.taskComponent.activeList.tasks = new Array();
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
      this.updateList(textbox.value);
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
