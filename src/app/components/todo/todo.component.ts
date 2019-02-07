import { Component, ViewChild } from '@angular/core';
import UserService from '../../services/user.service';
import User from 'src/app/classes/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent {
  @ViewChild('listComponent') listComponent;
  @ViewChild('taskComponent') taskComponent;
  showSiteNav: boolean;
  showSiteNavBackBtn: boolean;
  user: User;
  constructor(private userService: UserService, private router: Router) {
    this.user = new User(null, null, null, null);
    this.showSiteNav = false;
    this.showSiteNavBackBtn = false;
    this.getUserInformation();
  }

  deleteActiveList(): void {
    this.listComponent.deleteList(this.taskComponent.activeList);
    // TODO: Change the current list too, and get the new tasks.
  }

  getUserInformation(): void {
    const session = this.userService.getSessionFromCookie();
    if(session === null) {
      this.routeToLogin();
      return;
    }

    this.userService.getUserInformation(session).subscribe((request) => {
      if(request.data.user) {
        this.user = request.data.user;
        this.listComponent.initializeLists(this.user);
        return;
      }
      this.routeToLogin();
    });
  }

  focusElement(element: HTMLElement): void {
    element.focus();
  }

  routeToLogin(): void {
    this.router.navigateByUrl('login');
  }
}