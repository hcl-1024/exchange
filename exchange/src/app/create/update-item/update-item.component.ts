import { Component } from '@angular/core';
import { ItemFormComponent } from '../item-form/item-form.component';
import { CreateItemService } from '../create-item.service';
import { Item, noIDItem } from '../../item';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../auth/header/header.component';
import { DocumentData } from 'firebase/firestore';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [
    ItemFormComponent, 
    HeaderComponent
  ],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css'
})
export class UpdateItemComponent {

  constructor(
    private service: CreateItemService, 
    private route: ActivatedRoute, 
    private router: Router
  ) { }

  private id = this.route.snapshot.paramMap.get('id')

  public currentForm = async() => {
    return await this.service.getItem(this.id!)
  }

  async ngOnInit() {
    const item = await this.service.getItem(this.id!)
    const user:any = this.service.getUser()
    if(item && user){
    const id1 = item.posterUID
    const uid = user.posterUID
    if(uid != id1) {
      this.router.navigate(["../../../signin"])
    }
    }

  }

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
        likeUsers: item.likeUsers, 
        posted: true
      }
      
    await this.service.updateItem(this.id!, uploadItem)
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
        likeUsers: item.likeUsers,
        posted: false
      }
      
    console.log(uploadItem)
    await this.service.updateItem(this.id!, uploadItem)
      .catch((e) => {
        //something
      })
  }

}
