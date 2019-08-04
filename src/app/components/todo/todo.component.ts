import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  @ViewChild('listComponent') listComponent;
  @ViewChild('menuComponent') menuComponent;
  @ViewChild('taskComponent') taskComponent;
  @ViewChild('headerComponent') headerComponent;
  constructor() {}

  // deleteActiveList(): void {
  //   this.listComponent.deleteList(this.taskComponent.activeList);
  //   this.headerComponent.showMenu = false;
  //   this.headerComponent.goBack();
  //   // TODO: Change the current list too, and get the new tasks.
  // }

  focusElement(element: HTMLElement): void {
    element.focus();
  }
}