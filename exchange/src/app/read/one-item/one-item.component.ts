import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../comment';
import { HeaderComponent } from '../../auth/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-item',
  standalone: true,
  imports: [
    HeaderComponent, 
    CommonModule
  ],
  templateUrl: './one-item.component.html',
  styleUrl: './one-item.component.css'
})
export class OneItemComponent {

  public item: any;
  public comment: any;
  public uid: any
  public posterUID: any;
  public showComments: any;

  constructor(
    private service: ReadItemService, 
    private route: ActivatedRoute, 
    private router: Router, 
  ) { }

  id = this.route.snapshot.paramMap.get('id')

  ngOnInit() {
    this.service.getItem(this.id!)
      .then((item) => {
        this.item = item.data()
        this.posterUID = this.item.posterUID
        this.service.getImg(this.item.image_src)
          .then((imgRef) => {
            this.item.image_src = imgRef
          })
          .catch()
      })
      .catch()

    const user = this.service.getUser()
    if(user) {
      this.uid = user.uid
    } else {
      this.uid = "none"
    }
  }

  like() {
    if(!this.uid) {
      this.router.navigate(["../signin"])
    }
    this.service.like(this.item.id, this.uid)
  }

  getComments() {
    this.showComments = true
    this.service.getComment(this.id!)
      .then((comment) => {
        comment.forEach((com) => {
          const data:any = com.data()
          this.comment = data
        })
      })
      .catch()
  }

  hideComments() {
    this.showComments = false
  }

  deleteItem(id: string) {
    this.service.deleteItem(id)
  }

}
