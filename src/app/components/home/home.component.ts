import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  inputForm: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      code: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")])
    });
  }

  submit = () => this.router.navigateByUrl(`${this.inputForm.get("code").value}`);

}
