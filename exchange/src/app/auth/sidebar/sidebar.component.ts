import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor (
    private router: Router, 
    private service: AuthService
  ) {}

  ngOnInit() {
    if(!this.service.getUser) {
      this.router.navigate(['auth/signin'])
    }
  }

  profile() {
    const user = this.service.getUser()
    this.router.navigate([`profile/${user!.uid}`])
  }

  settings() {
    this.router.navigate(['provile/settings'])
  }

}
