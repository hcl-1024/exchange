import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../../comment';
import { HeaderComponent } from '../../auth/header/header.component';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@Component({
  selector: 'app-one-item',
  standalone: true,
  imports: [
    HeaderComponent, 
    CommonModule, 
    CommentFormComponent
  ],
  templateUrl: './one-item.component.html',
  styleUrl: './one-item.component.css'
})
export class OneItemComponent {

  public item: any;
  public comment: any;
  public uid: any;
  public posterUID: any;
  public showComments = false;
  public uid_list: any;
  public combined: any;
  public liked: boolean = false;
  public signup: boolean = false;

  constructor(
    private service: ReadItemService, 
    private route: ActivatedRoute, 
    private router: Router, 
  ) { }

  id = this.route.snapshot.paramMap.get('id')

  async ngOnInit() {
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
      this.liked = await this.service.likeStatus(this.item.id, this.uid)
      this.signup = await this.service.signupStatus(this.item.id)

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

  signupEvent(){
    if(!this.uid) {
      this.router.navigate(["auth/signin"])
    } else {
      this.service.signUpUser(this.uid, this.item.id)
    }
  }

  giveComment(comment: any) {
    const content = comment.comment
    const itemid = this.item.id
    const user = this.service.getUser()
    let uid = ""
    if(user) {
      uid = user.uid
    } else {
      uid = "Guest"
    }
    this.service.giveComment(itemid, content, uid)
  }

  getComments() {
    this.showComments = true
    console.log(this.id!)
    this.service.getComment(this.id!)
      .then((comment) => {
        this.comment = comment.data().messages
        const userids = comment.data().commentors
        userids.array.forEach(async (i:string) => {
          const commentor = await this.service.findUser(i)
          if(!commentor) {
            throw new Error("Something strange has ocurred... ")
          }
          this.uid_list.push(commentor.displayName)
        });
        for(let i = 0; i < this.uid_list.length; i++) {
          this.combined.push([this.uid_list[i], this.comment[i]])
        }
      })
      .catch((e: Error) => {
        // error handling
      })
  }

  hideComments() {
    this.showComments = false
  }

  deleteItem(id: string) {
    this.service.deleteItem(id)
  }

}
