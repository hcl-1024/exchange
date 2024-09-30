import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FireUser } from '../../fire-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private service: AuthService, 
    private router: Router
  ) { }

  private user = this.service.getUser()
  public name: string = 
    this.user?
    this.user.displayName?
    this.user.displayName:
    "User": 
    "Guest"



  login() {
    this.router.navigate(['auth/signin'])
  }

  logout() {
    try {
      this.service.logout()
    } catch(e: any) {
      console.error(e.message)
    } finally {
      this.router.navigateByUrl('/', {
        skipLocationChange: true
      }).then(() => {
        this.router.navigate(['all-items'])
      })
    }
  }
}
