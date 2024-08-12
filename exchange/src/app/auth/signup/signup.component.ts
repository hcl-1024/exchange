import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { Router } from '@angular/router';

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
    await this.service.emailSignup(user)
    await this.service.emailSignin(user)
    const currentUser: any = this.service.getUser()
    console.log(currentUser)
    const uid = currentUser.uid
    this.router.navigate([`auth/new-name/${uid}`])
  }
}