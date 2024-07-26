import { Component } from '@angular/core';
import { ReadItemService } from '../read-item.service';
import { Item } from '../../item';

@Component({
  selector: 'app-all-items',
  standalone: true,
  imports: [],
  templateUrl: './all-items.component.html',
  styleUrl: './all-items.component.css'
})
export class AllItemsComponent {

  public allItems: any;

  constructor(private service: ReadItemService) { }

  ngOnInit() {
    this.service.getAllItems()
      .then((items) => {
        this.allItems = items
        this.allItems.forEach(async (doc: Item) => {
          await this.service.getImg(doc.image_src)
            .then((imgRef) => [
              doc.image_src = imgRef
            ])
            .catch()
        });
        
      })
      .catch()
  }

}
