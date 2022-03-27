import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-think-ye',
  templateUrl: './new-think-ye.component.html',
  styleUrls: ['./new-think-ye.component.scss']
})
export class NewThinkYeComponent implements OnInit {
  inputForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<NewThinkYeComponent>) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      question: new FormControl('', [Validators.required]),
    });
  }

  submit = () => this.dialogRef.close(this.inputForm.get('question').value);

  cancel = () => this.dialogRef.close("###close###");

}
