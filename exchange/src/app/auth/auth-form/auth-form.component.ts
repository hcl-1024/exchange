import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { User } from '../../user';
import { BehaviorSubject } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {

  constructor() {}

  @Output()
  submittedForm = new EventEmitter()

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  get form() { return this.profileForm.controls; }


  formSubmitted() {
    this.submittedForm.emit(this.profileForm.value)
  }

}