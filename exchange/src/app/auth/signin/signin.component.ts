import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { Router } from '@angular/router';

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

  constructor(
    private service: AuthService, 
    private router: Router
  ) { }

  public async signin(user: User) {
    await this.service.emailSignin(user)
      .catch((e) => {
        //something
      })
    this.router.navigate(['all-items'])
  }

 
}
