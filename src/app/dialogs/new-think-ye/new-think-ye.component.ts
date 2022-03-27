import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { ThinkYe } from 'src/app/models/classes/think-ye';

@Component({
  selector: 'app-new-think-ye',
  templateUrl: './new-think-ye.component.html',
  styleUrls: ['./new-think-ye.component.scss']
})
export class NewThinkYeComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  
  inputForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewThinkYeComponent>, @Inject(MAT_DIALOG_DATA) private thinkYe: ThinkYe) {
  }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      question: new FormControl((this.thinkYe ? this.thinkYe.question : ''), [Validators.required]),
    });
  }

  submit = () => this.dialogRef.close(this.inputForm.get('question').value);

  cancel = () => this.dialogRef.close("###close###");

}
