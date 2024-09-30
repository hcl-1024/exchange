import { Component } from '@angular/core';
import { PasswordFormComponent } from '../password-form/password-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { auth } from '../../../../firebaseconfig';
import { Password } from '../../password';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    PasswordFormComponent
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {

  constructor(
    private route: ActivatedRoute, 
    private service: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    const user = auth.currentUser
    if(!user) {
      this.router.navigate(['auth/signin'])
    }
  }

  updatePassword(password: Password) {
    this.service.updatePassword(password)
    this.router.navigate(['all-items'])
  }

}
