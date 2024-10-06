import { Component } from '@angular/core';
import { NameFormComponent } from '../name-form/name-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { auth } from '../../../../firebaseconfig';
import { Name } from '../../user';

@Component({
  selector: 'app-create-name',
  standalone: true,
  imports: [
    NameFormComponent
  ],
  templateUrl: './create-name.component.html',
  styleUrl: './create-name.component.css'
})
export class CreateNameComponent {

  constructor(
    private route: ActivatedRoute, 
    private service: AuthService, 
    private router: Router
  ) { }

  id = this.route.snapshot.paramMap.get('id')

  /*ngOnInit() {
    const user = auth.currentUser
    if(!user || user.uid != this.id) {
      this.router.navigate([`auth/signin`])
    }
  }*/

  createName(displayName: Name) {
    const name = displayName.name
    this.service.updateDisplayName(name)
      .catch((e) => {
        console.error(e.message)
      })
    this.router.navigate(['all-items'])
  }

}
