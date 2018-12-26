import { Component } from '@angular/core';
import User from 'src/app/classes/User';
import UserService from '../../services/user.service';
import Error from '../../interfaces/Error';
import {Router} from '@angular/router';
import Cookie from '../../classes/Cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: Error;
  router: Router;
  userCookie: Cookie; 
  constructor(private userService: UserService, router: Router) { 
     this.router = router;
     this.error = {
       show: true,
       message: null
     }
  }

  loginUser(email, password): boolean {
    const user = new User(email.value, password.value, '', '');
    this.userService.loginUser(user).subscribe((request) => {
      if(request.success) {
        this.router.navigateByUrl('todo');
        // Store user information unencrypted in a cookie
        // Route to todo for now
        this.setUserCookie(request.data);
      } else {
        this.error = {
          show: true,
          message: request.message
        }
        // Display error message
      }
      console.log(request);
    });
    return false;
  }

  registerUser(email, password, firstName, lastName): boolean {
    const user = new User(email.value, password.value, firstName.value, lastName.value);
    this.userService.registerUser(user).subscribe((request) => {
      if(request.success) {
        this.router.navigateByUrl('todo');
        this.setUserCookie(request.data);
        // Store user information unencrypted in a cookie
      } else {
        this.error = {
          show: true,
          message: request.message
        }
        // Display error message
      }
    });
    return false;
  }

  setUserCookie(user) {
    var userData = JSON.stringify(user);
    this.userCookie = new Cookie('user', userData, 30);
  }
}
