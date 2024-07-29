import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../comment';

@Component({
  selector: 'app-one-item',
  standalone: true,
  imports: [],
  templateUrl: './one-item.component.html',
  styleUrl: './one-item.component.css'
})
export class OneItemComponent {

  public item: any;
  public comment: any;

  constructor(
    private service: ReadItemService, 
    private route: ActivatedRoute
  ) { }

  id = this.route.snapshot.paramMap.get('id')

  ngOnInit() {

    console.log(this.id)

    this.service.getItem(this.id!)
      .then((item) => {
        this.item = item
        this.service.getImg(this.item.img_src)
          .then((imgRef) => {
            this.item.img_src = imgRef
          })
          .catch()
      })
      .catch()
  }

  getComments() {
    this.service.getComment(this.id!)
      .then((comment) => {
        comment.forEach((com) => {
          const data:any = com.data()
          data.item_id = com.id
          comment = data
        })
      })
      .catch()
  }

}
