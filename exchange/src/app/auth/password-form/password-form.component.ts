import { Component, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css'
})
export class PasswordFormComponent {

  @Output()
  submittedForm = new EventEmitter()

  passwordForm = new FormGroup({
    old: new FormControl('', [Validators.required]),
    new: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
  });

  get form() { return this.passwordForm.controls; }

  formSubmitted() {
    this.submittedForm.emit(this.passwordForm.value)
  }

}
