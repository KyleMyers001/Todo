import { Component } from '@angular/core';
import User from 'src/app/classes/User';
import UserService from '../../services/user.service';
import Error from '../../interfaces/Error';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: FormControl;
  errors: any;
  firstName: FormControl;
  lastName: FormControl;
  password: FormControl;
  constructor(private userService: UserService, private router: Router) { 
    this.email = new FormControl('');
    this.password = new FormControl('');
    this.firstName = new FormControl('');
    this.lastName = new FormControl('');

    this.errors = {
      email: <Error>{
        message: '',
        show: false
      },
      password: <Error>{
        message: '',
        show: false
      },
      firstName: <Error>{
        message: '',
        show: false
      },
      lastName: <Error>{
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

    if(this.firstName.invalid) {
      this.errors.firstName = <Error>{
        message: 'This field is required.',
        show: true
      }
      valid = false;
    } else {
      this.errors.firstName.show = false;
    }

    if(this.lastName.invalid) {
      this.errors.lastName = <Error>{
        message: 'This field is required.',
        show: true
      }
      valid = false;
    } else {
      this.errors.lastName.show = false;
    }

    return valid;
  }

  registerUser(): void {
    var valid = this.validate();
    this.errors.main.show = false;
    if(!valid) {
      return;
    }
    const user = new User(null, this.email.value, this.password.value, this.firstName.value, this.lastName.value);
    this.userService.registerUser(user).subscribe((request) => {
      if(request.success) {
        this.router.navigateByUrl('todo');
        this.userService.setAuthenticationCookie(request.data);
      } else {
        this.errors.main = <Error>{
          message: request.message,
          show: true
        }
      }
    });
  }
}
