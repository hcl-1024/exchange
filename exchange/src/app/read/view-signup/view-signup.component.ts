import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { User } from '../../user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-signup',
  standalone: true,
  imports: [],
  templateUrl: './view-signup.component.html',
  styleUrl: './view-signup.component.css'
})
export class ViewSignupComponent {

  constructor(
    private service: ReadItemService, 
    private route: ActivatedRoute
  ) {}

  public idList!: Array<string>
  public userList!: Array<any>

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.idList = await this.service.getSignedUsers(id!)

    this.idList.forEach(async (id) => {
      const user = await this.service.findUser(id)
      this.userList.push(user)
    })
  }
}