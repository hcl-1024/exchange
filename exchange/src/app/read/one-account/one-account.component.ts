// look for ways to get the username of other accounts from firebase
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../item';
import { ReadItemService } from '../read-item.service';
import { auth } from '../../../../firebaseconfig';

@Component({
  selector: 'app-one-account',
  standalone: true,
  imports: [],
  templateUrl: './one-account.component.html',
  styleUrl: './one-account.component.css'
})
export class OneAccountComponent {

  constructor(
    private route: ActivatedRoute, 
    private service: ReadItemService, 
    private router: Router
  ) {}

  userID: string = ''
  uid = this.route.snapshot.paramMap.get('id')
  public allItems: Array<Item> = []

  ngOnInit() {
    const user = auth.currentUser
    if(user) {
      this.userID = user.uid
    } else {
      this.userID = "none"
    }

    this.service.getOwnFiles(this.uid!)
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
        
      })}

      async like(id: string) {
        if(this.userID == "none") {
          this.router.navigate(["auth/signin"]) // have some aesthetic changes with this
        }
        await this.service.like(id, this.userID)
      }
    
      navigate(i: number) {
        this.router.navigateByUrl(`item/${this.allItems[i].id}`);
      }
}