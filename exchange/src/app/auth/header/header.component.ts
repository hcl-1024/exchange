import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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
    private service: AuthService
  ) { }

  ngOnInit() {
    const uid = this.service.getUser()
    if(uid == "no user") {
      this.name = "Guest"
    }
    this.name = "placeholder"
  }

  logout() {
    this.service.logout()
  }
}
