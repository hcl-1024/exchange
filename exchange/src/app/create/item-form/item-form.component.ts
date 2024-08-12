import { Component, Output, Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateItemService } from '../create-item.service';
import { Item } from '../../item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent {

  constructor(private service: CreateItemService) { }
  currentRef: any;

  @Input() 
  currentForm!: Function

  @Output()
  submittedForm = new EventEmitter()

  @Output()
  savedForm = new EventEmitter()

  itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl(''),
    content: new FormControl(''), 
    image: new FormControl(),
    image_src: new FormControl(''), 
    posted: new FormControl()
  });

  async ngOnInit() {
    const values = await this.currentForm()
    this.itemForm.patchValue({
      title: values.title, 
      desc: values.desc, 
      content: values.content, 
      image_src: values.image_src, 
    });

    if(this.itemForm.controls['image_src']) {
      this.currentRef = this.itemForm.controls['image_src']
    } else {
      this.currentRef = "none"
    }
  }

  get form() { return this.itemForm.controls; }

  async onImagePicked(event: Event) {
    if(this.currentRef[0] == "g") {
      this.service.deleteImage(this.currentRef)
    }
    let file = (event.target as HTMLInputElement).files![0]; // Here we use only the first file (single file)
    this.itemForm.patchValue({image: file});
    let blob = file.slice(0, file.size, 'image/png'); 
    let newFile = new File([blob], `${this.service.makeid(32)}.png`, {type: 'image/png'}); //maybe make a better id? 

    const src = await this.service.addImage(newFile)
    const path = "gs://exchanges-5d935.appspot.com/" + src
    this.currentRef = path
    this.itemForm.controls['image_src'].setValue(path);
  }

  onSubmit() {
    this.itemForm.controls['posted'].setValue(true);
    this.submittedForm.emit(this.itemForm.value)
  }

  save() {
    this.itemForm.controls['posted'].setValue(false);
  }

}
