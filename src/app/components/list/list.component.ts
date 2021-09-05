import { Component, Input, ViewChild } from '@angular/core';
import ListService from 'src/app/services/list.service';
import AutoSave from '../../classes/AutoSave';
import Fade from '../../classes/Fade';
import List from '../../classes/List';
import User from 'src/app/classes/User';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  activeList: List;
  allowRenaming: boolean;
  autoSave: AutoSave;
  deletedList: List;
  fade: Fade;
  lists: List[];
  showTasksMobile: boolean;
  shouldShowUndo: boolean;
  user: User;
  @ViewChild('undo') undo;
  @Input() taskComponent;
  ngAfterViewInit() {
    this.fade = new Fade(this.undo.nativeElement, 500);
  }

  constructor(private listService: ListService) { 
    this.activeList = new List('', '', true, new Array());
    this.autoSave = new AutoSave(2000);
    this.lists = new Array();
  }

  initializeLists(user: User):void {
    this.user = user;
    this.listService.getLists(this.user._id).subscribe((request) => {
      this.lists = request.data.lists;
      // this.lists = null; // TODO: Prevent error when data is null.
      this.setActiveList();
    });
  }

  setActiveList(): void {
    const listId = this.getListIdInQueryString();
    this.activeList = this.getListEqualToListId(listId);

    if(this.activeList === null) {
      this.activeList = this.lists[0];
    } else {
      this.showTasksMobile = true;
    }

    this.taskComponent.getTasks(this.activeList._id);
  }

  getListEqualToListId(listId: string): List {
    let theList = null;
    if(listId !== null) {
      for(let list of this.lists) {
        if(list._id === listId) {
          theList = list;
        }
      }
    }
    return theList;
  }

  getListIdInQueryString(): string {
    const params = new URLSearchParams(window.location.search);
    return params.get('listId');
  }

  deleteList(list: List): void {
    list.active = false;
    this.listService.updateList(list).subscribe((request) => {
      if (request.success) {
        this.deletedList = list;
        this.showUndo();
        for (let i = 0; i < this.lists.length; i++) {
          if (this.lists[i] === list) {
            this.lists.splice(i, 1);
          }
        }
        
        this.changeList(this.lists[0]);
        this.showTasksMobile = false;
      }
    });
  }

  enableRenamingOfList(list: List): void {
    this.allowRenaming = true;
    const input = <HTMLElement>document.querySelector('.list.active input');
    setTimeout(() => input.focus());
  }

  undoDeleteList(): void {
    this.deletedList.active = true;
    this.updateList(this.deletedList);
    this.lists.push(this.deletedList);
    this.changeList(this.deletedList);
    this.hideUndo();
  }
  
  showUndo(): void {
    this.shouldShowUndo = true;
    const callback = () => {
      setTimeout(() => {
        this.hideUndo();
      }, 20000);
    }
    this.fade.fadeIn(callback);
  }
  
  hideUndo(): void {
    const callback = () => {
      this.shouldShowUndo = false;
    }
    this.fade.fadeOut(callback);
  }

  changeList(list: List): void {
    this.activeList = list;
    this.taskComponent.getTasks(list._id);
    this.showTasksMobile = true;
    window.history.replaceState('todo', 'Todo', `/todo?listId=${list._id}`);
  }

  createEmptyList(): void {
    const list = new List('Your List', this.user._id, true, new Array());
    this.addList(list);
  }

  addList(list: List): void {
    this.listService.addList(list).subscribe((request) => {
      if (request.success) {
        list = request.data;
        this.lists.push(list);
        this.changeList(list);
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
      const name = textbox.value;
      if(this.activeList.name !== name) {
        this.activeList.name = name;
        this.updateList(this.activeList);
      }
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  disableListInput() {
    this.allowRenaming = false;
  }

  updateList(list: List) {
    this.listService.updateList(list).subscribe((data) => { });
  }
}
