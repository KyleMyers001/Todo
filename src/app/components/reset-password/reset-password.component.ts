import { Component } from '@angular/core';
import UserService from '../../services/user.service';
import Error from '../../interfaces/Error';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  errors: any;
  email: FormControl;
  newPassword: FormControl;
  oldPassword: FormControl;
  token: string;
  constructor(private userService: UserService, private router: Router) { 
    this.email = new FormControl('');
    this.oldPassword = new FormControl('');
    this.newPassword = new FormControl('');
    this.errors = {
      email: <Error>{
        message: '',
        show: false
      },
      main: <Error> {
        message: '',
        show: false
      },
      newPassword: <Error>{
        message: '',
        show: false
      },
      oldPassword: <Error>{
        message: '',
        show: false
      },
    }

    // var url = <string>window.location.href;
    // var queryString = url.substring( url.indexOf('?') + 1 );

    // this.token = queryString;
    this.token = this.getQueryVariable('token');
    console.log(this.token);
  }

  getQueryVariable(variable): string {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    const value = null;
    for (var i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return value;
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

    if(this.oldPassword.invalid) {
      this.errors.oldPassword = <Error>{
        message: 'This field is required.',
        show: true
      }
      valid = false;
    } else {
      this.errors.oldPassword.show = false;
    }

    if(this.newPassword.invalid) {
      this.errors.newPassword = <Error>{
        message: 'This field is required.',
        show: true
      }
      valid = false;
    } else {
      this.errors.newPassword.show = false;
    }

    return valid;
  }

  resetPassword(): void {
    var valid = this.validate();
    if(!valid) {
      return;
    }

    const data = {
      email: this.email.value,
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value,
      token: this.token
    }

    this.userService.resetPassword(data);
    
  }
}
