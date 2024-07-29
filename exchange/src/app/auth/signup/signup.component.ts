import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { AuthFormComponent } from '../auth-form/auth-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    AuthFormComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private service: AuthService) { }

  signup(user: User) {
    this.service.emailSignup(user)
  }
}
