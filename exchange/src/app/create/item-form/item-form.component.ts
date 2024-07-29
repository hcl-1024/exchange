import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateItemService } from '../create-item.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  constructor(private service: CreateItemService) { }

  eventEmitter = new EventEmitter()

  itemForm = new FormGroup({
    title: new FormControl(''),
    desc: new FormControl(''),
    content: new FormControl(''), 
    image: new FormControl(),
    image_src: new FormControl('')
  });

  async onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]; // Here we use only the first file (single file)
    this.itemForm.patchValue({image: file});

    const src = await this.service.addImage(file)
    this.itemForm.controls['image_src'].setValue(src);
  }

  onSubmit() {
    this.eventEmitter.emit(this.itemForm.value)
  }

}
