import { Component, Output, Input } from '@angular/core';
import { storage } from '../../../../firebaseconfig';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {

  constructor(
    private service: AuthService
  ) {}

  @Input() 
  currentForm: Function = () => {}

  @Output()
  submittedForm = new EventEmitter()

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.email]), 
    displayName: new FormControl(''), 
    image: new FormControl(),
    image_src: new FormControl(''), 
  });

  ngOnInit() {
    const values = this.currentForm()
    this.profileForm.patchValue({
      email: values.email, 
      displayName: values.displayName, 
      image_src: values.image_src, 
    });

  }

  public currentRef = 
  typeof this.profileForm.controls['image_src'] == "string" ? this.profileForm.controls['image_src'] : "none"

  get form() { return this.profileForm.controls; }

  async onImagePicked(event: Event) {
    if(this.currentRef != "none") {
      try {
      this.service.deleteImage(this.currentRef)} catch (e) {
        //something
      }
    }
    let file = (event.target as HTMLInputElement).files![0];
    this.profileForm.patchValue({image: file});
    let blob = file.slice(0, file.size, 'image/png'); 
    let newFile = new File([blob], `${this.service.makeid(32)}.png`, {type: 'image/png'}); //maybe make a better id? 
    const src = await this.service.addImage(newFile)
      .catch((e) => {
        //something
      })
    const path = "gs://exchanges-5d935.appspot.com/" + src
    this.currentRef = path
    this.profileForm.controls['image_src'].setValue(path);

  }

  onSubmit() {
    this.submittedForm.emit(this.profileForm.value)
  }

}
