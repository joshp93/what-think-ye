import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThinkYe } from 'src/app/models/classes/think-ye';

@Component({
  selector: 'app-new-think-ye',
  templateUrl: './new-think-ye.component.html',
  styleUrls: ['./new-think-ye.component.scss']
})
export class NewThinkYeComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  
  inputForm: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder, private dialogRef: MatDialogRef<NewThinkYeComponent>, @Inject(MAT_DIALOG_DATA) private thinkYe: ThinkYe) {
  }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      question: new UntypedFormControl((this.thinkYe ? this.thinkYe.question : ''), [Validators.required]),
    });
  }

  submit = () => this.dialogRef.close(this.inputForm.get('question').value);

  cancel = () => this.dialogRef.close("###close###");

}
