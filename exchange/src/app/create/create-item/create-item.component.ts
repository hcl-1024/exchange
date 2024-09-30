import { Component } from '@angular/core'
import { noIDItem, Item } from '../../item'
import crypto from "crypto";
import { CreateItemService } from '../create-item.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { HeaderComponent } from '../../auth/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    ItemFormComponent, 
    HeaderComponent
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent { 

  constructor(
    private service: CreateItemService, 
    private router: Router
  ) { }

  async create(item: noIDItem) {
    const id: string = this.service.makeid(16)
    const poster = this.service.getUser()


    if(poster){
      const uploadItem: Item = {
        id: id, 
        title: item.title, 
        desc: item.desc, 
        content: item.content, 
        image_src: item.image_src, 
        posterUID: poster.uid, 
        posted: true, 
        likeUsers: []
      }
      await this.service.addItem(uploadItem)
        .catch((e) => {
          //something
        })
    } else {
      this.router.navigate(["auth/signin"])
    }
      
  }

  async save(item: noIDItem) {
    const id: string = this.service.makeid(16)
    const poster = this.service.getUser()

    if(poster) {
      const uploadItem: Item = {
        id: id, 
        title: item.title, 
        desc: item.desc, 
        content: item.content, 
        image_src: item.image_src, 
        posterUID: poster.uid, 
        likeUsers: [], 
        posted: false
      }
      
      await this.service.addItem(uploadItem)
    } else {
      this.router.navigate(["auth/signin"])
    }
  }
}
