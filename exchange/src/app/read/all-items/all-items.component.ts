import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../auth/header/header.component';

@Component({
  selector: 'app-all-items',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    HeaderComponent
  ],
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.css'
})
export class AllItemsComponent {

  public allItems: Array<Item> = [];
  public uid!: string;

  constructor(
    private service: ReadItemService, 
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.service.getUser()
    if(user) {
      this.uid = user.uid
    } else {
      this.uid = "none"
    }

    this.service.getAllItems()
      .then((items) => {
        items.forEach((doc:any) => {
          const data = doc.data()
          data.id = doc.id
          this.allItems.push(data)
        });
        this.allItems.forEach(async (doc: Item) => {
          this.service.getImg(doc.image_src)
            .then((imgRef) => {
             doc.image_src = imgRef
            })
            .catch((e) => {
              console.log(e.message)
            })
        });
        
      })
      
  }

  async like(id: string) {
    if(this.uid == "none") {
      this.router.navigate(["auth/signin"]) // have some aesthetic changes with this
    }
    await this.service.like(id, this.uid)
  }

  navigate(i: number) {
    this.router.navigateByUrl(`item/${this.allItems[i].id}`);
  }

}