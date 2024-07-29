import { Component, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { User } from '../../user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {

  constructor(
    private fb: FormBuilder
  ) {}

  @Output()
  submittedForm = new EventEmitter()

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  formSubmitted() {
    this.submittedForm.emit(this.profileForm.value)
  }

}