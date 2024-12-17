import { Component, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {

  @Output()
  submittedForm = new EventEmitter()

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.maxLength(100)]),
  });

  get form() { return this.commentForm.controls; }

  formSubmitted() {
    this.submittedForm.emit(this.commentForm.value)
  }

}