import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import AutoSave from 'src/app/classes/AutoSave';
import UserService from '../../services/user.service';
import User from 'src/app/classes/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
  user: User;
  constructor(private userService: UserService, private router: Router) { 
    this.autoSave = new AutoSave(2000);
    this.user = new User(null, null, null, null, null);
    this.getUserInformation();
  }
  
  handleUserNameKeypress(e, input): void {
    const textbox = e.target;
    if (e.key.toLowerCase() === 'enter') {
      textbox.blur();
    }

    const callback = () => {
      this.updateUserName(textbox.value)
    }

    this.autoSave.addItemToQueue(textbox, callback);
  }

  updateUserName(name: string) {
    if(this.user.fullName() !== name) {
      // TODO: Separate the name string into two parts for the first and last name.
      // Then update the firstName and lastName below.
      const nameFragments = name.split(' ');
      const firstName = nameFragments[0];
      let lastName = '';
      nameFragments.forEach((nameFragment, index) => {
        if(index > 0) {
          lastName += `${nameFragment} `;
        }
      });

      this.user.firstName = firstName;
      this.user.lastName = lastName.trim();
      this.userService.updateUser(this.user).subscribe((data) => { });
    }
  }

  disableListNameInput(): void {
    this.enableListNameInput = false;
    this.menuComponent.hideMenu();
  }

  disableUserNameInput(): void {
    this.enableUserNameInput = false;
    this.menuComponent.hideMenu();
  }

  getUserInformation(): void {
    const session = this.userService.getSessionFromCookie();
    if(session === null) {
      this.routeToLogin();
      return;
    }

    this.userService.getUserInformation(session).subscribe((request) => {
      if(request.data.user) {
        const data = <User>request.data.user;
        this.user = new User(data._id, data.email, data.password, data.firstName, data.lastName);
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
      window.history.replaceState('todo', 'Todo', `/todo`);
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
