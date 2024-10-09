import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormUser, User } from '../../user';

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
    private router: Router, 
    private route: ActivatedRoute, 
  ) {}

  id = this.route.snapshot.paramMap.get('id')

  public currentForm() {
    //const user = this.service.getUser()
    let item = {
      email: '', 
      displayName: '', 
      image_src: ''
    }
    /*if(user) {
      if(user.email && user.displayName && user.photoURL){
        item.email = user.email
        item.displayName = user.displayName
        item.image_src = user.photoURL
      } else {
        this.router.navigate(['auth/signin'])
      }
    }*/
    return item
  }

  ngOnInit() {
    
  }

  async update(user: User) {
    const id: string = this.service.makeid(16)
     const updateUser = {
        email: user.email, 
        displayName: user.displayName, 
        photo: id
      }

    try {
    await this.service.updateDisplayName(updateUser.displayName)
    await this.service.updateUserEmail(updateUser.email)
    await this.service.updatePhoto(updateUser.photo)} catch (e) {
      //something
    }
    }

}