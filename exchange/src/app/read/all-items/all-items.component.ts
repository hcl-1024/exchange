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

  constructor(
    private service: ReadItemService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.service.getAllItems()
      .then((items) => {
        items.forEach((doc:any) => {
          const data = doc.data()
          data.id = doc.id
          this.allItems.push(data)
        });
        this.allItems.forEach(async (doc: Item) => {
          await this.service.getImg(doc.image_src)
            .then((imgRef) => [
              doc.image_src = imgRef
            ])
            .catch((e) => {
              console.log(e.message)
            })
        });
        
      })
      .catch()
  }

  navigate(i: number) {
    this.router.navigateByUrl(`item/${this.allItems[i].id}`);
  }

}