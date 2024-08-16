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
  public name: any;

  constructor(
    private service: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    const user: any = this.service.getUser()
    if(user) {
      this.name = user.displayName
      console.log(this.name)
    } else {
      this.name = "Guest"
    }
  }

  login() {
    this.router.navigate(['auth/signin'])
  }

  logout() {
    this.service.logout()
    this.router.navigateByUrl('/', {
      skipLocationChange: true
    }).then(() => {
      this.router.navigate(['all-items'])
    })
  }
}
