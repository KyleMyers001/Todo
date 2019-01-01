import { Component } from '@angular/core';
import User from 'src/app/classes/User';
import UserService from '../../services/user.service';
import Error from '../../interfaces/Error';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: FormControl;
  password: FormControl;
  errors: any;
  constructor(private userService: UserService, private router: Router) { 
     this.router = router;
     this.email = new FormControl('');
     this.password = new FormControl('');
     this.errors = {
       email: <Error>{
         message: '',
         show: false
       },
       password: <Error>{
         message: '',
         show: false
       },
       main: <Error> {
         message: '',
         show: false
       }
     }
  }

  validate(): boolean {
    var valid = true;
    if(this.email.invalid) {
      if(this.email.errors.required) {
        this.errors.email = <Error>{
          message: 'This field is required.',
          show: true
        }
      } else if(this.email.errors.email) {
        this.errors.email = <Error>{
          message: 'Please enter a valid email.',
          show: true
        }
      }
      valid = false;
    } else {
      this.errors.email.show = false;
    }

    if(this.password.invalid) {
      this.errors.password = <Error>{
        message: 'This field is required.',
        show: true
      }
      valid = false;
    } else {
      this.errors.password.show = false;
    }

    return valid;
  }

  loginUser(): void {
    var valid = this.validate();
    this.errors.main.show = false;
    if(!valid) {
      return;
    }


    const user = new User(this.email.value, this.password.value, '', '');
    this.userService.loginUser(user).subscribe((request) => {
      if(request.success) {
        this.router.navigateByUrl('todo');
        // Store user information unencrypted in a cookie
        // Route to todo for now
        this.userService.setUserCookie(request.data);
      } else {
        this.errors.main = {
          show: true,
          message: request.message
        }
        // Display error message
      }
      console.log(request);
    });
  }
}