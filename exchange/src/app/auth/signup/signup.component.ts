import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormUser, User } from '../../user';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { Router } from '@angular/router';
import { FireUser } from '../../fire-user';

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

  constructor(
    private service: AuthService, 
    private router: Router
  ) { }

  async signup(user: User) {
    try {
    await this.service.emailSignup(user)
    await this.service.emailSignin(user)} catch (e) {
      //something
    }
    const currentUser = this.service.getUser()
    if(currentUser) {
      const uid = currentUser.uid
      this.router.navigate([`auth/new-name/${uid}`])
    }
  }
}