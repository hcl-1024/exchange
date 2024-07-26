import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private service: AuthService) { }

  signup(user: User) {
    this.service.emailSignup(user)
  }

  useGoogle() {
    this.service.google()
  }

  useFacebook() {
    this.service.facebook()
  }
}
