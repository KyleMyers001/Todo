import { Component } from '@angular/core';
import Error from '../../interfaces/Error';
import { FormControl } from '@angular/forms';
import UserService from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: FormControl;
  errors: any;
  sentEmail: boolean;
  constructor(private userService: UserService) {
    this.email = new FormControl('');
    this.errors = {
      email: <Error>{
        show: false,
        message: ''
      },
      main: <Error>{
        show: false,
        message: ''
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

    return valid;
  }

  sendForgotPasswordEmail(): boolean {
    var valid = this.validate();
    if(!valid) {
      return;
    }

    this.userService.sendForgotPasswordEmail(this.email.value).subscribe((request) => {
      if(request.success) {
        this.sentEmail = true;
        // Show main message without error
      } else {
        this.errors.main = {
          show: true,
          message: request.message
        }
        // Display error message
      }
      console.log(request);
    });
    return false;

    // Perform ajax request;
  }
}
