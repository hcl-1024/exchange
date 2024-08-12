import { Component, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './name-form.component.html',
  styleUrl: './name-form.component.css'
})
export class NameFormComponent {

  @Output()
  submittedForm = new EventEmitter()

  nameForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get form() { return this.nameForm.controls; }

  formSubmitted() {
    this.submittedForm.emit(this.nameForm.value)
  }

}