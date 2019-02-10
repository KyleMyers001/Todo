import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import AutoSave from 'src/app/classes/AutoSave';
import UserService from '../../services/user.service';
import User from 'src/app/classes/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() menuComponent;
  @Input() listComponent;
  @Input() taskComponent;
  @ViewChild('listNameInput') listNameInput;
  @ViewChild('userNameInput') userNameInput;
  autoSave: AutoSave;
  enableListNameInput: boolean;
  enableUserNameInput: boolean;
  // showMenu: boolean;
  user: User;
  constructor(private userService: UserService, private router: Router) { 
    this.autoSave = new AutoSave(2000);
    this.user = new User(null, null, null, null);
    this.getUserInformation();
  }
  
  handleUserNameKeypress(e, input): void {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      console.log('Update user');
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  disableListNameInput(): void {
    this.enableListNameInput = false;
    this.menuComponent.hideMenu();
  }

  disableUserNameInput(): void {
    this.enableUserNameInput = false;
    this.menuComponent.hideMenu();
  }

  // toggleMenu(): void {
  //   this.showMenu = !this.showMenu;
  // }

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

  routeToLogin(): void {
    this.router.navigateByUrl('login');
  }
  

  goBack(): void {
    if(this.menuComponent.isMenuDisplayed) {
      this.menuComponent.hideMenu();
    } else {
      this.hideTasks();
    }
  }

  hideTasks(): void {
    this.listComponent.showTasksMobile = false;
  }

  enableRenamingOfList(): void {
    this.enableListNameInput = true;
    setTimeout(() => this.listNameInput.nativeElement.focus());
  }

  enableRenamingOfUser(): void {
    this.enableUserNameInput = true;
    setTimeout(() => this.userNameInput.nativeElement.focus());
  }
}
