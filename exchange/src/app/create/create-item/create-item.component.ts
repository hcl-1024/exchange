import { Component } from '@angular/core'
import { noIDItem, Item } from '../../item'
import crypto from "crypto";
import { CreateItemService } from '../create-item.service';
import { ItemFormComponent } from '../item-form/item-form.component';
import { HeaderComponent } from '../../auth/header/header.component';

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

  constructor(private service: CreateItemService) { }

  async create(item: noIDItem) {
    const id: string = this.service.makeid(16)
    const poster = this.service.getUser()

     const uploadItem: Item = {
        id: id, 
        title: item.title, 
        desc: item.desc, 
        content: item.content, 
        image_src: item.image_src, 
        posterUID: poster!.uid, 
        posted: true, 
        likeUsers: []
      }
      
    console.log(uploadItem)
    await this.service.addItem(uploadItem)
    console.log("done! ")
  }

  async save(item: noIDItem) {
    const id: string = this.service.makeid(16)
    const poster = this.service.getUser()

     const uploadItem: Item = {
        id: id, 
        title: item.title, 
        desc: item.desc, 
        content: item.content, 
        image_src: item.image_src, 
        posterUID: poster!.uid, 
        likeUsers: [], 
        posted: false
      }
      
    console.log(uploadItem)
    await this.service.addItem(uploadItem)
    console.log("done! ")
  }
}
