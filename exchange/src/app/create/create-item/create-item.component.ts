import { Component } from '@angular/core'
import { noIDItem, Item } from '../../item'
import crypto from "crypto";
import { CreateItemService } from '../create-item.service';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [
    ItemFormComponent
  ],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {

  constructor(private service: CreateItemService) { }

  create(item: noIDItem) {
    const id: string = crypto.randomBytes(16).toString()
    const uploadItem: Item = {
      id: id, 
      title: item.title, 
      desc: item.desc, 
      content: item.content, 
      image_src: item.image_src
    }
    this.service.addItem(uploadItem)
  }
}
