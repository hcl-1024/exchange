import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    AuthFormComponent
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private service: AuthService) { }

  public signin(user: User) {
    this.service.emailSignin(user)
  }

 
}
