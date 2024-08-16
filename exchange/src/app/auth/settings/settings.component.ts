import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    HeaderComponent, 
    SidebarComponent, 
    ProfileFormComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(
    private service: AuthService, 
    private router: Router
  ) {}

  async ngOnInit() {
    const user = this.service.getUser()
    if(user){
      const uid = user.uid
    } else {
      this.router.navigate(['auth/signin'])
    }
  }

  async update(user: User) {
    const id: string = this.service.makeid(16)
     const updateUser = {
        email: user.email, 
        displayName: user.displayName, 
        photo: id
      }
    await this.service.updateDisplayName(updateUser.displayName)
    await this.service.updateUserEmail(updateUser.email)
    await this.service.updatePhoto(updateUser.photo)
    
    console.log("done! ")
  }

}