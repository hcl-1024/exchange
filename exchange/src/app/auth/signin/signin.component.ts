import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private service: AuthService) { }

  signin(user: User) {
    this.service.emailSignin(user)
  }

  useGoogle() {
    this.service.google()
  }

  useFacebook() {
    this.service.facebook()
  }
}
