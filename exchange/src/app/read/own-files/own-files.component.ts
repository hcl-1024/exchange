import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReadItemService } from '../read-item.service';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../auth/header/header.component';

@Component({
  selector: 'app-own-files',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderComponent
  ],
  templateUrl: './own-files.component.html',
  styleUrl: './own-files.component.css'
})
export class OwnFilesComponent {
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
      this.router.navigate(['../../signin'])
    }

    this.service.getOwnFiles(this.uid)
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

  navigate(i: number) {
    this.router.navigateByUrl(`item/${this.allItems[i].id}`);
  }
}
