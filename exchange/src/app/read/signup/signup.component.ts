import { Component } from '@angular/core';
import { auth } from '../../../../firebaseconfig';
import { ActivatedRoute } from '@angular/router';
import { ReadItemService } from '../read-item.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(
    private route: ActivatedRoute, 
    private service: ReadItemService
  ) {}

  signUpUser() {
    const uid = auth.currentUser!.uid
    const postId = this.route.snapshot.paramMap.get('id')
    this.service.signUpUser(uid, postId!)
  }

}
